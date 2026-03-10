<?php
/**
 * Template Name: Canto Page
 * 
 * Default template for Pages, matching the style of Single Posts.
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="h-full">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
    <style>
        html, body { height: 100%; margin: 0; padding: 0; }
        .wp-site-blocks > header, 
        .wp-site-blocks > footer { display: none !important; }
        body { background-color: #050510 !important; color: white; display: flex; flex-direction: column; }
        
        /* Garantizar altura del hero */
        .hero-bg { 
            background-size: cover; 
            background-position: center; 
            background-repeat: no-repeat;
            width: 100%;
            height: 60vh;
            min-height: 500px;
        }
        
        /* Contenedor principal que empuja el footer */
        .main-content-wrapper {
            flex: 1 0 auto;
        }
        
        /* Footer se queda abajo */
        footer.main-footer {
            flex-shrink: 0;
            margin-top: auto;
        }
    </style>
</head>

<body <?php body_class( 'bg-[#050510] text-white' ); ?>>
<?php wp_body_open(); ?>

<!-- 1. HEADER (Shortcode) -->
<?php echo do_shortcode('[canto_header]'); ?>

<div class="main-content-wrapper">
    <?php while ( have_posts() ) : the_post(); 
        $img_url = get_the_post_thumbnail_url(get_the_ID(), 'full');
        // Si no hay imagen destacada en la página, usar fallback o nada
        // En single.php se usaba un fallback. Mantendremos la lógica.
        if(!$img_url) {
            $img_url = get_stylesheet_directory_uri() . '/assets/images/hero-fallback.jpg'; 
        }
    ?>

        <!-- HERO SECTION (Solo Imagen) -->
        <?php if($img_url): ?>
        <section class="relative w-full bg-black">
            <div class="hero-bg relative z-0" style="background-image: url('<?php echo esc_url($img_url); ?>');">
                <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050510]"></div>
            </div>
        </section>
        <?php endif; ?>

        <!-- CONTENT SECTION -->
        <section class="bg-[#050510] relative z-20">
            <!-- Wrapper Full Width para permitir secciones expandidas -->
            <div class="w-full">
                
                <div class="entry-content text-gray-300 text-lg leading-relaxed">
                    <?php the_content(); ?>
                </div>
                
                <!-- (Sin navegación de posts para páginas) -->

            </div>
        </section>

    <?php endwhile; ?>
</div>

<!-- 3. FOOTER (Shortcode) -->
<?php echo do_shortcode('[canto_footer]'); ?>

<style>
    /* Estilos base para el artículo/página */
    .entry-content { width: 100%; }
    
    /* Elementos de texto estándar centrados y acotados */
    .entry-content > p, 
    .entry-content > h1, 
    .entry-content > h2, 
    .entry-content > h3, 
    .entry-content > h4, 
    .entry-content > h5, 
    .entry-content > h6, 
    .entry-content > ul, 
    .entry-content > ol, 
    .entry-content > blockquote { 
        max-width: 800px; 
        margin-left: auto; 
        margin-right: auto; 
        padding-left: 1.25rem; /* px-5 equiv */
        padding-right: 1.25rem; 
    }

    /* Títulos */
    .entry-content h1, .entry-content h2, .entry-content h3 { color: white; margin-top: 2rem; margin-bottom: 1rem; font-weight: 700; line-height: 1.2; }
    .entry-content h1 { font-size: 2.5rem; }
    .entry-content h2 { font-size: 2rem; }
    .entry-content h3 { font-size: 1.75rem; }
    
    /* Párrafos y Listas */
    .entry-content p { margin-bottom: 1.5rem; }
    .entry-content a { color: #b000b0; text-decoration: underline; }
    .entry-content ul { list-style: disc; }
    
    /* Imágenes y Secciones Full Width */
    .entry-content > section,
    .entry-content > div {
        width: 100%;
        max-width: 100%;
    }
    
    .entry-content img { border-radius: 0.5rem; max-width: 100%; height: auto; }
</style>

<?php wp_footer(); ?>
</body>
</html>
