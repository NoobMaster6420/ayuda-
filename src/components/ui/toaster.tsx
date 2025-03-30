import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

// Toast types
type ToastType = 'success' | 'error' | 'info' | 'warning';

// Toast interface
interface Toast {
  id: string;
  title: string;
  description?: string;
  variant: ToastType;
  duration?: number; // in milliseconds
}

// Toast context for global state
type ToastContextType = {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
};

// Generate unique ID
function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

// Context and provider setup
const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = generateId();
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    // Auto-dismiss toast after duration
    if (toast.duration !== Infinity) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 5000); // Default 5 seconds if not specified
    }
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
}

// Hook to use toast
export function useToast() {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// Simplified toast function for direct use
export function toast(props: Omit<Toast, 'id'>) {
  // This is a workaround for direct usage outside of a component
  const toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    const div = document.createElement('div');
    div.id = 'toast-container';
    document.body.appendChild(div);
    
    // Create a temporary React root to render a toast provider
    const tempToast = { ...props, id: generateId() };
    
    // Wait for the next tick to ensure DOM is ready
    setTimeout(() => {
      // Directly render a toast into the container
      const toastElement = document.createElement('div');
      toastElement.className = `toast toast-${props.variant}`;
      toastElement.setAttribute('role', 'alert');
      
      const title = document.createElement('div');
      title.className = 'toast-title';
      title.textContent = props.title;
      
      toastElement.appendChild(title);
      
      if (props.description) {
        const desc = document.createElement('div');
        desc.className = 'toast-description';
        desc.textContent = props.description;
        toastElement.appendChild(desc);
      }
      
      document.getElementById('toast-container')?.appendChild(toastElement);
      
      // Auto-remove after duration
      setTimeout(() => {
        toastElement.classList.add('toast-hide');
        setTimeout(() => {
          toastElement.remove();
        }, 300);
      }, props.duration || 5000);
    }, 0);
    
    return {
      id: 'direct-toast',
      update: () => {}, // Mock update function
    };
  }
  
  // If using inside a component with context, this will work properly
  const { addToast } = useToast();
  const id = generateId();
  addToast(props);
  
  return {
    id,
    update: (newProps: Partial<Omit<Toast, 'id'>>) => {
      // This wouldn't work for direct usage, but works within components
    },
  };
}

// Main Toaster component
export function Toaster() {
  const { toasts, removeToast } = useToast();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  // Create toast container in the DOM if it doesn't exist
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  return createPortal(
    <div className="fixed top-0 right-0 z-50 flex max-h-screen w-full flex-col items-end gap-2 p-4 sm:max-w-sm">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>,
    toastContainer
  );
}

// Individual Toast Item
function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  return (
    <div
      className={`transform rounded-lg border p-4 shadow-lg transition-all duration-300 ease-in-out animate-enter ${getToastStyles(
        toast.variant
      )}`}
      role="alert"
    >
      <div className="flex items-start">
        <div className="flex-1">
          {toast.title && <div className="font-medium">{toast.title}</div>}
          {toast.description && <div className="mt-1 text-sm">{toast.description}</div>}
        </div>
        <button
          onClick={onClose}
          className="ml-4 inline-flex h-4 w-4 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Close</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Helper to get toast styles based on variant
function getToastStyles(variant: ToastType): string {
  switch (variant) {
    case 'success':
      return 'bg-green-50 border-green-200 text-green-800';
    case 'error':
      return 'bg-red-50 border-red-200 text-red-800';
    case 'warning':
      return 'bg-yellow-50 border-yellow-200 text-yellow-800';
    case 'info':
    default:
      return 'bg-blue-50 border-blue-200 text-blue-800';
  }
}

// Add animation styles to global CSS
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes enter {
      from { transform: translateY(100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    @keyframes leave {
      from { transform: translateY(0); opacity: 1; }
      to { transform: translateY(100%); opacity: 0; }
    }
    .animate-enter {
      animation: enter 0.3s ease forwards;
    }
    .animate-leave {
      animation: leave 0.3s ease forwards;
    }
  `;
  document.head.appendChild(style);
}

export default Toaster;