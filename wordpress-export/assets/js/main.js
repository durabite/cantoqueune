document.addEventListener("DOMContentLoaded", () => {
    /* =========================================
       HEADER SCROLL & MOBILE MENU
       ========================================= */
    const header = document.getElementById("main-header");
    const mobileBtn = document.getElementById("mobile-menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    // Scroll Effect
    const handleScroll = () => {
        if (!header) return;
        if (window.scrollY > 100) {
            header.classList.remove("-translate-y-full");
            header.classList.add("translate-y-0");
        } else {
            header.classList.add("-translate-y-full");
            header.classList.remove("translate-y-0");
            // Close mobile menu if scrolling back to top
            if (mobileMenu) {
                mobileMenu.classList.add("hidden");
                mobileMenu.classList.remove("flex");
            }
        }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Init

    // Mobile Menu Toggle
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener("click", () => {
            const isHidden = mobileMenu.classList.contains("hidden");
            if (isHidden) {
                mobileMenu.classList.remove("hidden");
                mobileMenu.classList.add("flex");
            } else {
                mobileMenu.classList.add("hidden");
                mobileMenu.classList.remove("flex");
            }
        });

        // Close when clicking a link
        mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.add("hidden");
                mobileMenu.classList.remove("flex");
            });
        });
    }


    /* =========================================
       AUDIO PLAYER LOGIC
       ========================================= */
    const audio = document.getElementById("hero-audio");
    const btn = document.getElementById("audio-control");
    const playIcon = document.getElementById("icon-play");
    const pauseIcon = document.getElementById("icon-pause");
    const playText = document.getElementById("text-play");
    const pauseText = document.getElementById("text-pause");

    if (audio && btn && playIcon && pauseIcon && playText && pauseText) {
        const updateUI = (isPlaying) => {
            if (isPlaying) {
                // Show Pause
                playIcon.classList.add("hidden");
                playText.classList.add("hidden");
                pauseIcon.classList.remove("hidden");
                pauseText.classList.remove("hidden");
                btn.classList.add("ring-2", "ring-primary/50");
            } else {
                // Show Play
                playIcon.classList.remove("hidden");
                playText.classList.remove("hidden");
                pauseIcon.classList.add("hidden");
                pauseText.classList.add("hidden");
                btn.classList.remove("ring-2", "ring-primary/50");
            }
        };

        const tryPlayAudio = () => {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => updateUI(true)).catch((e) => {
                    console.log("Autoplay blocked:", e);
                    updateUI(false);
                    const unlock = () => {
                        audio.play().then(() => updateUI(true));
                        document.removeEventListener("click", unlock);
                        document.removeEventListener("keydown", unlock);
                    };
                    document.addEventListener("click", unlock);
                    document.addEventListener("keydown", unlock);
                });
            }
        };
        tryPlayAudio();

        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (audio.paused) {
                audio.play();
                updateUI(true);
            } else {
                audio.pause();
                updateUI(false);
            }
        });
    }

    /* =========================================
       COUNTDOWN LOGIC
       ========================================= */
    const countdownDate = new Date("April 10, 2026 20:00:00").getTime();
    const daysEl = document.getElementById("days");

    if (daysEl) {
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const dEl = document.getElementById("days");
            const hEl = document.getElementById("hours");
            const mEl = document.getElementById("minutes");
            const sEl = document.getElementById("seconds");

            if (distance < 0) {
                if (dEl) dEl.innerText = "00";
                if (hEl) hEl.innerText = "00";
                if (mEl) mEl.innerText = "00";
                if (sEl) sEl.innerText = "00";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (dEl) dEl.innerText = days < 10 ? `0${days}` : days;
            if (hEl) hEl.innerText = hours < 10 ? `0${hours}` : hours;
            if (mEl) mEl.innerText = minutes < 10 ? `0${minutes}` : minutes;
            if (sEl) sEl.innerText = seconds < 10 ? `0${seconds}` : seconds;
        };
        setInterval(updateCountdown, 1000);
        updateCountdown();
    }

    /* =========================================
       GALLERY LIGHTBOX LOGIC
       ========================================= */
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('gallery-image');
    const closeBtn = document.getElementById('gallery-close');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');

    let currentIndex = 0;
    const galleryImages = []; // Stores src

    if (galleryItems.length > 0 && modal) {
        // Collect all images
        galleryItems.forEach((item, index) => {
            const src = item.getAttribute('data-src');
            galleryImages.push(src);
            item.addEventListener('click', () => openGallery(index));
        });

        const openGallery = (index) => {
            currentIndex = index;
            updateModalImage();
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        };

        const closeGallery = () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
        };

        const updateModalImage = () => {
            modalImg.src = galleryImages[currentIndex];
        };

        const nextImage = (e) => {
            if (e) e.stopPropagation();
            currentIndex = (currentIndex + 1) % galleryImages.length;
            updateModalImage();
        };

        const prevImage = (e) => {
            if (e) e.stopPropagation();
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            updateModalImage();
        };

        // Event Listeners
        if (closeBtn) closeBtn.addEventListener('click', closeGallery);
        if (nextBtn) nextBtn.addEventListener('click', nextImage);
        if (prevBtn) prevBtn.addEventListener('click', prevImage);

        // Mobile controls
        const nextBtnMobile = document.getElementById('gallery-next-mobile');
        const prevBtnMobile = document.getElementById('gallery-prev-mobile');
        if (nextBtnMobile) nextBtnMobile.addEventListener('click', nextImage);
        if (prevBtnMobile) prevBtnMobile.addEventListener('click', prevImage);

        // Click outside to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeGallery();
        });

        // Keyboard nav
        document.addEventListener('keydown', (e) => {
            if (modal.classList.contains('hidden')) return;
            if (e.key === 'Escape') closeGallery();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        });
    }
});
