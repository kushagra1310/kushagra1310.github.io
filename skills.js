document.addEventListener("DOMContentLoaded", function() {
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
        
        cvLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(cvLink.href, '_blank');
        });
    }
});
