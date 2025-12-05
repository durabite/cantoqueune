document.addEventListener('DOMContentLoaded', () => {


    // Countdown Timer
    const countdownDate = new Date("April 10, 2026 20:00:00").getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById("days").innerText = "00";
            document.getElementById("hours").innerText = "00";
            document.getElementById("minutes").innerText = "00";
            document.getElementById("seconds").innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days < 10 ? `0${days}` : days;
        document.getElementById("hours").innerText = hours < 10 ? `0${hours}` : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? `0${minutes}` : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? `0${seconds}` : seconds;
    };

    const timerInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            const isVisible = navLinks.style.display === 'flex';

            if (isVisible) {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(5, 5, 16, 0.95)';
                navLinks.style.padding = '20px';
                navLinks.style.textAlign = 'center';
            }
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('visible');
            navbar.style.padding = '10px 0';
            navbar.style.background = 'rgba(5, 5, 16, 0.95)';
        } else {
            navbar.classList.remove('visible');
            navbar.style.padding = '20px 0';
            navbar.style.background = 'rgba(5, 5, 16, 0.8)';
        }
    });
});
