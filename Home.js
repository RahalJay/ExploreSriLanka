document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links with fade-in effect
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            // Smooth scroll animation
            targetSection.scrollIntoView({ behavior: 'smooth' });

            // Add fade-in animation to the section
            targetSection.classList.add('fade-in-animation');
            setTimeout(() => {
                targetSection.classList.remove('fade-in-animation');
            }, 1000); // Remove animation class after 1 second
        });
    });

    // Image gallery hover effects with bounce animation
    const galleryImages = document.querySelectorAll('.image-gallery img, .card-img-top');
    galleryImages.forEach(img => {
        img.addEventListener('mouseenter', (e) => {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.transition = 'transform 0.3s ease-in-out';
        });
        img.addEventListener('mouseleave', (e) => {
            e.target.style.transform = 'scale(1)';
        });
    });

    // Dynamic content loading animation for sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transition = 'opacity 1s ease-in-out';
    });

    window.addEventListener('scroll', () => {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                section.style.opacity = '1';
            }
        });
    });

    // Newsletter signup with slide-in animation
    const newsletterForm = document.createElement('div');
    newsletterForm.innerHTML = `
        <form id="newsletter-signup" class="newsletter-slide-in">
            <input type="email" placeholder="Enter your email" required class="form-control">
            <button type="submit" class="btn btn-primary mt-2">Subscribe</button>
        </form>
    `;
    document.querySelector('footer').insertBefore(newsletterForm, document.querySelector('.copyright'));

    document.getElementById('newsletter-signup')?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for subscribing to our newsletter!');
    });

    // Add animation classes
    document.head.insertAdjacentHTML(
        'beforeend',
        `<style>
            .fade-in-animation {
                animation: fadeIn 1s ease-in-out;
            }
    
            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
    
            .newsletter-slide-in {
                position: relative;
                animation: slideIn 0.8s ease-in-out;
            }
    
            @keyframes slideIn {
                from {
                    transform: translateY(100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        </style>`
    );    