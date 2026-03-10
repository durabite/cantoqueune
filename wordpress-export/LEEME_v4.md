# Explicación de la V4

Como la V1 ya te daba la estructura correcta (tamaños, espacios, grillas), he usado **esa misma V1** como base, sin reinventar la rueda.

Solo he modificado 2 líneas quirúrgicamente:

1.  **En el bloque `<header>`**:
    *   **Antes**: `class="fixed ... -translate-y-full ..."`
    *   **Ahora**: `class="fixed ... ..."` (Le quité `-translate-y-full`).
    *   **Resultado**: El menú ya no intenta ocultarse al principio, así que no se verá cortado.

2.  **En el bloque `<section id="inicio">`**:
    *   **Antes**: `<video src="...">...</video>`
    *   **Ahora**: `<img src="/image/principal/bg-supp/BG-Hero.gif" ...>`
    *   **Resultado**: Cargará tu GIF animado de fondo en lugar del video que no cargaba.

Copia el código de `bloque-completo-v4-FINAL.html` y pégalo. Debería ser la solución definitiva.
