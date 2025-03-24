document.addEventListener("DOMContentLoaded", function() {

    // Event Card Hover Animation
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
            card.style.transition = 'transform 0.3s ease-in-out';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });

    // Scroll to Top Button Animation
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.textContent = '↑';
    scrollToTopButton.classList.add('scroll-to-top');
    document.body.appendChild(scrollToTopButton);

    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });

    // Fade-in effect on page load for event cards
    const fadeInElements = document.querySelectorAll('.card');
    fadeInElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = 1;
            element.style.transition = 'opacity 0.6s ease-out';
        }, index * 200); // Stagger the fade-in effect
    });

    // Slide-in from the left animation for the header
    const header = document.querySelector('header');
    header.style.transform = 'translateX(-100%)';
    header.style.transition = 'transform 0.5s ease-out';

    setTimeout(() => {
        header.style.transform = 'translateX(0)';
    }, 500);

    // Smooth Scrolling Effect for Internal Navigation (if applicable)
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            window.scrollTo({
                top: targetElement.offsetTop - 50,
                behavior: 'smooth'
            });
        });
    });

    // Dynamic Background Animation on Scroll (Floating Effect)
    window.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY;
        let bgEffect = document.querySelector('body');
        bgEffect.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    });

});

// Add scroll-to-top button styling
const style = document.createElement('style');
style.innerHTML = `
    .scroll-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: var(--white);
        font-size: 20px;
        padding: 10px;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        display: none;
        transition: transform 0.3s ease-in-out;
    }
    .scroll-to-top:hover {
        transform: scale(1.1);
    }
`;
document.head.appendChild(style);
