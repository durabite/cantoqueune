# Últimos Pasos (Importante)

He actualizado la carpeta `wordpress-export` con todo lo necesario.

1.  **Actualizar Archivos del Tema**:
    *   Sube el nuevo `functions.php` y `assets/js/main.js` a tu servidor, sobrescribiendo los anteriores en `/wp-content/themes/canto-que-une-child/`.
    *   Estos nuevos archivos incluyen la lógica para el **Menú Móvil**, **Reproductor de Audio**, **Cuenta Regresiva** y la **Galería de Imágenes** (Lightbox).

2.  **Copiar y Pegar el HTML**:
    *   He creado el archivo `bloque-completo.html` en la carpeta `wordpress-export`.
    *   Abre ese archivo con un editor de texto (Bloc de notas o VS Code).
    *   Copia **TODO** el contenido.
    *   Ve al editor de WordPress (donde estabas en la captura, en la plantilla "Página de inicio").
    *   Asegúrate de borrar todo lo que haya.
    *   Inserta un bloque **HTML Personalizado**.
    *   **Pega** el código dentro.
    *   Dale a **Guardar**.

3.  **Comprobar**:
    *   Visita tu página de inicio. Debería verse idéntico a tu diseño Astro, incluyendo la galería interactiva y el menú.

**Nota sobre Iconos**: He reemplazado los iconos de React por iconos de FontAwesome. Se cargarán automáticamente gracias al nuevo `functions.php`.
