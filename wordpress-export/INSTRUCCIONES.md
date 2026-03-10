# Instrucciones de Migración a WordPress

Has generado exitosamente los archivos necesarios para crear un **Tema Hijo (Child Theme)** de Twenty Twenty-Three.

La carpeta `wordpress-export` contiene:
1.  `style.css`: Tus estilos de Astro (incluyendo Tailwind compilado).
2.  `functions.php`: El archivo que carga tus estilos y scripts.
3.  `assets/js/main.js`: La lógica de tu cuenta regresiva y reproductor de audio.

## Pasos para Implementar

### 1. Subir el Tema Hijo
1.  Accede a tu instalación de WordPress vía FTP o Administrador de Archivos.
2.  Navega a la carpeta `/wp-content/themes/`.
3.  Crea una nueva carpeta llamada `canto-que-une-child`.
4.  Sube dentro de esa carpeta los archivos que hemos generado (`style.css`, `functions.php`) y la carpeta `assets` completa.
    *   Ruta final ejemplo: `/wp-content/themes/canto-que-une-child/style.css`

### 2. Activar el Tema
1.  Entra al panel de administración de WordPress.
2.  Ve a **Apariencia > Temas**.
3.  Verás "Canto Que Une Child".
4.  Haz clic en **Activar**.

### 3. Verificar Archivos Multimedia
Tus estilos CSS hacen referencia a imágenes como `/image/principal/ceremonias/ceremonias.png`.
*   Asegúrate de subir tu carpeta `public/image` de Astro a la raíz de tu WordPress, o actualiza las rutas en el CSS para que apunten a donde subas las imágenes en la biblioteca de medios.
*   *Recomendación rápida:* Sube la carpeta `image` a la raíz de tu sitio publico (`public_html/image`) para que las rutas relativas funcionen tal cual.

### 4. Recrear el Contenido (Editor del Sitio)
Este es el paso manual. Como Twenty Twenty-Three usa bloques:
1.  Ve a **Apariencia > Editor**.
2.  Edita la plantilla "Página de Inicio".
3.  Inserta un bloque **HTML Personalizado** para cada sección de tu web.
4.  Copia el código HTML de tus archivos `.astro` (Hero, Countdown, etc.) y pégalos en esos bloques.
    *   *Nota:* No copies la parte de `--- frontmatter ---` ni `<script>`, solo el HTML puro (`<section>...</section>`).
5.  Tu CSS y JS ya están cargados automáticamente, por lo que el diseño debería aparecer mágicamente al guardar.

¡Listo! Tu diseño Astro ahora vive en WordPress.
