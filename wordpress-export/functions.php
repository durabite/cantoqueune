<?php
/**
 * Canto Que Une Child Theme functions and definitions
 */

function canto_child_enqueue_styles() {
    // 1. Google Fonts
    wp_enqueue_style( 'canto-google-fonts', 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Golos+Text:wght@400;500;600&display=swap', array(), null );
    // 2. FontAwesome
    wp_enqueue_style( 'canto-fontawesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', array(), '6.4.0' );
    // 3. Main Styles
    wp_enqueue_style( 'canto-child-style', get_stylesheet_directory_uri() . '/style.css', array(), wp_get_theme()->get('Version') );
    // 4. Custom Scripts
    wp_enqueue_script( 'canto-child-script', get_stylesheet_directory_uri() . '/assets/js/main.js', array(), '1.0.1', true );
}
add_action( 'wp_enqueue_scripts', 'canto_child_enqueue_styles' );

// REGISTRAR MENÚ WOPRDRESS
function canto_register_nav_menu(){
    register_nav_menus( array(
        'primary_menu' => __( 'Menú Principal (Canto)', 'text_domain' ),
    ) );
}
add_action( 'after_setup_theme', 'canto_register_nav_menu', 0 );

// SHORTCODE PARA HEADER PERSONALIZADO
function canto_custom_header_shortcode() {
    ob_start();
    ?>
    <!-- AÑADIDO: -translate-y-full para ocultarlo inicialmente -->
    <header class="fixed top-0 left-0 w-full z-[1000] transition-transform duration-300 ease-in-out border-b border-white/5 bg-[#050510]/75 backdrop-blur-md py-6 md:py-10 shadow-lg -translate-y-full" id="main-header">
        <div class="container mx-auto px-8 md:px-12 flex justify-between items-center max-w-[1200px]">
            <!-- LOGO DINÁMICO -->
            <a href="<?php echo home_url(); ?>" class="block my-8">
                <img src="/image/logo-cantoqueuneS.svg" alt="Canto Que Une" width="250" height="100" class="block h-10 md:h-12 w-auto p-0" />
            </a>

            <!-- MENÚ DE ESCRITORIO (WP MENU) -->
            <nav class="hidden md:flex gap-8 items-center">
                <?php
                wp_nav_menu( array(
                    'theme_location' => 'primary_menu',
                    'container'      => false, // Sin div contenedor
                    'items_wrap'     => '%3$s', // Sin ul wrapper
                    'depth'          => 1,
                    'walker'         => new Canto_Walker_Nav_Menu() // Clase para estilos custom
                ) );
                ?>
            </nav>

            <!-- BOTÓN MÓVIL -->
            <button id="mobile-menu-toggle" class="md:hidden text-white hover:bg-white/10 hover:text-white border border-white/30 bg-transparent p-2 rounded-md cursor-pointer">
                <i class="fas fa-bars fa-lg"></i>
            </button>
        </div>

        <!-- MENÚ MÓVIL -->
        <div id="mobile-menu" class="hidden absolute top-full left-0 w-full bg-[#050510]/95 p-5 flex flex-col gap-4 text-center border-b border-white/10 shadow-xl">
             <?php
                wp_nav_menu( array(
                    'theme_location' => 'primary_menu',
                    'container'      => false,
                    'items_wrap'     => '%3$s',
                    'depth'          => 1,
                    'walker'         => new Canto_Mobile_Walker() 
                ) );
            ?>
        </div>
    </header>
    <?php
    return ob_get_clean();
}
add_shortcode( 'canto_header', 'canto_custom_header_shortcode' );

// CLASSES WALKERS
class Canto_Walker_Nav_Menu extends Walker_Nav_Menu {
    function start_el(&$output, $item, $depth=0, $args=array(), $id=0) {
        $title = $item->title;
        $permalink = $item->url;
        // Lógica de iconos
        $icon = '';
        if(stripos($title, 'Concierto') !== false) $icon = '<i class="fas fa-guitar text-sm mr-2"></i>';
        if(stripos($title, 'Ceremonia') !== false) $icon = '<i class="fas fa-fire text-sm mr-2"></i>';
        if(stripos($title, 'Producto') !== false) $icon = '<i class="fas fa-compact-disc text-sm mr-2"></i>';
        if(stripos($title, 'Galer') !== false) $icon = '<i class="fas fa-camera text-sm mr-2"></i>';

        $output .= "<a href='$permalink' class='nav-link text-sm uppercase tracking-widest opacity-80 transition-all flex items-center gap-2 text-white no-underline'>$icon $title</a>";
    }
    function end_el(&$output, $item, $depth=0, $args=array()) { $output .= ""; }
}

class Canto_Mobile_Walker extends Walker_Nav_Menu {
    function start_el(&$output, $item, $depth=0, $args=array(), $id=0) {
        $output .= "<a href='{$item->url}' class='nav-link text-sm uppercase tracking-widest py-2 text-white no-underline'>{$item->title}</a>";
    }
    function end_el(&$output, $item, $depth=0, $args=array()) { $output .= ""; }
}

// SHORTCODE PARA FOOTER PERSONALIZADO
function canto_custom_footer_shortcode() {
    ob_start();
    ?>
    <footer class="main-footer py-12 text-center bg-black border-t border-white/10">
        <div class="container mx-auto px-5">
            <div class="footer-icons flex justify-center gap-8 mb-5 text-2xl text-[#b3b3b3]">
                <a href="https://www.instagram.com/cantoqueune/" target="_blank" class="hover:text-[#E1306C] transition-colors">
                    <i class="fab fa-instagram"></i>
                </a>
            </div>
            <p class="text-[#b3b3b3] text-sm">&copy; 2026 Canto Que Une. Todos los derechos reservados.</p>
        </div>
    </footer>
    <?php
    return ob_get_clean();
}
add_shortcode( 'canto_footer', 'canto_custom_footer_shortcode' );


