document.addEventListener("DOMContentLoaded", function() {
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
        const delay = index * 150;
        card.style.transitionDelay = `${delay}ms`;
        card.dataset.delay = delay;
        observer.observe(card);
    });

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
