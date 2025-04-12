document.addEventListener("DOMContentLoaded", function() {
    // Animate skill dots on scroll
    const skillItems = document.querySelectorAll('.skill-item');
    
    const animateDots = (dots) => {
        dots.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    dot.style.transform = 'scale(1)';
                }, 200);
            }, index * 100);
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const dots = entry.target.querySelectorAll('.dot.filled');
                animateDots(dots);
                
                // Pulse animation for the category icon
                const icon = entry.target.querySelector('.icon');
                if (icon) {
                    icon.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        icon.style.transform = 'scale(1)';
                    }, 300);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    skillItems.forEach(item => {
        observer.observe(item);
    });

    // CV icon animation
    const cvIcon = document.querySelector('.document-icon');
    if (cvIcon) {
        const cvLink = document.querySelector('.cv-icon-link');
        
        cvLink.addEventListener('mouseenter', () => {
            cvIcon.style.transform = 'translateY(-5px) rotate(-5deg)';
            cvIcon.style.transition = 'all 0.3s ease';
        });
        
        cvLink.addEventListener('mouseleave', () => {
            cvIcon.style.transform = 'translateY(0) rotate(0)';
        });
        
        // Handle click to open CV in new tab
        cvLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(cvLink.href, '_blank');
        });
    }
    
    // Mobile menu toggle (copied from gallery.js for consistency)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                
                // Reset hamburger icon
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
});