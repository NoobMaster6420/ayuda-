# Instrucciones para Desplegar CyberCalc en GitHub Pages

Este documento proporciona las instrucciones paso a paso para desplegar la versión estática de CyberCalc utilizando GitHub Pages.

## Prerrequisitos

- Una cuenta de GitHub
- Git instalado en tu máquina local
- Node.js y npm instalados

## Pasos para el Despliegue

### 1. Crea un repositorio en GitHub

1. Inicia sesión en tu cuenta de GitHub
2. Crea un nuevo repositorio llamado `cybercalc` (o el nombre que prefieras)
3. Mantén el repositorio público para usar GitHub Pages de forma gratuita

### 2. Configura el proyecto localmente

1. Clona el repositorio que acabas de crear:
   ```
   git clone https://github.com/tu-usuario/cybercalc.git
   cd cybercalc
   ```

2. Copia todos los archivos de esta carpeta (`github_pages_version`) al repositorio local.

3. Actualiza el archivo `package.json` y `vite.config.ts` con el nombre correcto del repositorio:
   - En `package.json`, cambia `homepage` por tu URL de GitHub Pages:
     ```json
     "homepage": "https://tu-usuario.github.io/cybercalc"
     ```
   - En `vite.config.ts`, ajusta `base` al nombre de tu repositorio:
     ```typescript
     base: '/cybercalc/',  // Reemplazar con el nombre de tu repositorio
     ```

### 3. Preparación inicial del proyecto

1. Instala las dependencias:
   ```
   npm install
   ```

2. Prueba el proyecto localmente:
   ```
   npm run dev
   ```

3. Construye el proyecto para verificar que no hay errores:
   ```
   npm run build
   ```

### 4. Configuración de despliegue automático

Esta versión ya incluye la configuración necesaria en `.github/workflows/deploy.yml` para desplegar automáticamente a GitHub Pages cada vez que se realice un push a la rama principal.

### 5. Sube el código a GitHub

1. Añade todos los archivos al repositorio:
   ```
   git add .
   ```

2. Realiza un commit con los cambios:
   ```
   git commit -m "Configuración inicial para GitHub Pages"
   ```

3. Sube los cambios a GitHub:
   ```
   git push origin main
   ```

### 6. Configura GitHub Pages

1. Ve a la configuración de tu repositorio en GitHub
2. Navega a la sección "Pages"
3. En "Source", selecciona la rama `gh-pages` y guarda los cambios
4. El sitio se desplegará automáticamente desde la rama `gh-pages` que el workflow se encargará de crear

### 7. Verifica el despliegue

1. GitHub te proporcionará una URL en la forma `https://tu-usuario.github.io/cybercalc`
2. Visita la URL para verificar que tu aplicación se ha desplegado correctamente
3. Prueba la navegación por diferentes rutas para asegurarte de que el enrutamiento funciona correctamente

## Solución de problemas comunes

- **Error 404 al navegar entre páginas**: Asegúrate de que el archivo `404.html` esté correctamente configurado y que el script de redirección en `index.html` esté funcionando.
  
- **Estilos o assets no cargados**: Verifica que todas las rutas en los archivos de configuración (`vite.config.ts`, `package.json`) sean correctas.

- **El workflow falla**: Revisa los logs de error en la pestaña "Actions" de GitHub para identificar y solucionar el problema.

## Actualizaciones futuras

Para realizar actualizaciones en el futuro:

1. Realiza los cambios en tu repositorio local
2. Prueba localmente con `npm run dev`
3. Haz commit y push de los cambios
4. El workflow se encargará automáticamente de construir y desplegar los cambios en GitHub Pages

¡Listo! Ahora CyberCalc debería estar funcionando correctamente en GitHub Pages.