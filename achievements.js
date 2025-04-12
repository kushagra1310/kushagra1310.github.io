document.addEventListener("DOMContentLoaded", function() {
    // Achievement cards animation
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, entry.target.dataset.delay || 0);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    achievementCards.forEach((card, index) => {
        // Set custom delay for each card for staggered animation
        const delay = index * 150;
        card.style.transitionDelay = `${delay}ms`;
        card.dataset.delay = delay;
        observer.observe(card);
    });

    // Mobile menu toggle (copied from script.js for consistency)
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

    // Add hover effects for achievement cards
    achievementCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelectorAll('p').forEach((p, index) => {
                p.style.transform = 'translateX(8px)';
                p.style.transition = `transform 0.3s ease ${index * 0.05}s`;
            });
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelectorAll('p').forEach(p => {
                p.style.transform = 'translateX(0)';
            });
        });
    });
});