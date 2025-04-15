document.addEventListener("DOMContentLoaded", function() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
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
  
  galleryItems.forEach((item, index) => {
    const delay = index * 150;
    item.style.transitionDelay = `${delay}ms`;
    item.dataset.delay = delay;
    observer.observe(item);
  });

  if ('ontouchstart' in window) {
    galleryItems.forEach(item => {
      item.addEventListener('click', function() {
        galleryItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });
        
        this.classList.toggle('active');
      });
    });
  }
});
