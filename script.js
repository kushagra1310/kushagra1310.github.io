document.addEventListener("DOMContentLoaded", function () {
    const text = `I'm a fresher at the International Institute of Information Technology, Hyderabad, originally from Nashik, Maharashtra. My passions include playing musical instruments like the keyboard and guitar, following football, and continuously learning new things. I particularly enjoy problem-solving and finding optimized, elegant solutions to complex challenges.`;

    const typedText = document.getElementById("typed-text");
    const introPara = document.getElementById("intro-para");
    
    let cursor = document.querySelector(".cursor");
    if (!cursor) {
        cursor = document.createElement("span");
        cursor.className = "cursor";
        cursor.innerHTML = "|";
        introPara.appendChild(cursor);
    }

    let i = 0;
    const speed = 30;

    function typeWriter() {
        if (i < text.length) {
            typedText.innerHTML += text.charAt(i);
            i++;
            
            if (introPara.scrollHeight > introPara.clientHeight) {
                introPara.scrollTop = introPara.scrollHeight;
            }
            setTimeout(typeWriter, speed);
        }
    }

    setTimeout(typeWriter, 800);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, 
                    behavior: 'smooth'
                });
            }
        });
    });

    window.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});