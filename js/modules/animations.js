export const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Add cosmic sparkle effect for credentials
            if (entry.target.classList.contains('timeline-content')) {
                createSparkleEffect(entry.target);
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

export function initializeAnimationObserver() {
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        animationObserver.observe(el);
    });
}

export function initializeTypingEffect() {
    const typingText = document.getElementById('typingText');
    if (!typingText) return;

    const texts = [
        "BACKEND DEVELOPER",
        "FRONTEND DEVELOPER",
        "WEB DEVELOPER",
        "MOBILE APP DEVELOPER",
        "SOFTWARE ENGINEER"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 2000);
}

export function initializeScrollAnimations() {
    let ticking = false;
    
    function resetAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll.animated');
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (!isInViewport) {
                el.classList.remove('animated');
            }
        });
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(resetAnimations);
            ticking = true;
        }
    });
}

function createSparkleEffect(element) {
    const sparkles = document.createElement('div');
    sparkles.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;

    for (let i = 0; i < 3; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: white;
            border-radius: 50%;
            animation: sparkleTwinkle 2s ease-out;
            box-shadow: 0 0 8px white;
        `;

        // Random position
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;

        sparkles.appendChild(sparkle);
    }

    element.appendChild(sparkles);

    // Remove sparkles after animation
    setTimeout(() => {
        sparkles.remove();
    }, 2000);
}