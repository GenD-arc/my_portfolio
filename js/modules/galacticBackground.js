export function initializeUniversalGalacticBackground() {
    createEnhancedStars();
    createShootingStars();
    createFloatingElements();
    initializeCosmicParallax();
}

// Enhanced star field with better performance
function createEnhancedStars() {
    const starsBg = document.getElementById('starsBg');
    if (!starsBg) return;

    // Clear any existing content
    starsBg.innerHTML = '';

    // Create multiple layers of stars for depth
    const starLayers = [
        { count: 80, size: 1, speed: 0.2, opacity: 0.8 },
        { count: 40, size: 2, speed: 0.5, opacity: 0.6 },
        { count: 20, size: 3, speed: 1, opacity: 0.4 }
    ];

    starLayers.forEach((layer, layerIndex) => {
        const layerElement = document.createElement('div');
        layerElement.className = `star-layer layer-${layerIndex}`;
        layerElement.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        `;

        for (let i = 0; i < layer.count; i++) {
            const star = document.createElement('div');
            const size = layer.size;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const animationDuration = 3 + Math.random() * 2 + layer.speed;
            const animationDelay = Math.random() * 5;

            star.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: white;
                border-radius: 50%;
                left: ${left}%;
                top: ${top}%;
                opacity: ${layer.opacity};
                animation: starTwinkle ${animationDuration}s ease-in-out infinite ${animationDelay}s;
                box-shadow: 0 0 ${size * 2}px white;
            `;

            layerElement.appendChild(star);
        }

        starsBg.appendChild(layerElement);
    });
}

// Optimized shooting stars
function createShootingStars() {
    const container = document.querySelector('.shooting-stars');
    if (!container) return;

    // Clear existing shooting stars
    container.innerHTML = '';

    // Create limited number of shooting stars for performance
    for (let i = 0; i < 3; i++) {
        const star = document.createElement('div');
        const size = 2 + Math.random() * 2;
        const duration = 3 + Math.random() * 2;
        const delay = Math.random() * 10;

        star.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(45deg, transparent, white, transparent);
            border-radius: 50%;
            box-shadow: 0 0 ${size * 3}px white;
            animation: shootingStar ${duration}s linear infinite ${delay}s;
            opacity: 0;
        `;

        // Random start position
        const startX = Math.random() * 100;
        const startY = Math.random() * 50;
        star.style.left = `${startX}%`;
        star.style.top = `${startY}%`;

        container.appendChild(star);
    }
}

// Floating cosmic elements
function createFloatingElements() {
    const universe = document.querySelector('.galactic-universe');
    if (!universe) return;

    // Remove existing floating elements to avoid duplicates
    const existingElements = universe.querySelectorAll('.floating-cosmic-element');
    existingElements.forEach(el => el.remove());

    const elements = ['✦', '✧', '❉', '✵', '✶'];
    const colors = ['#8b5cf6', '#06d6a0', '#f59e0b', '#3b82f6', '#ec4899'];
    
    // Create floating elements
    elements.forEach((element, index) => {
        const floatElement = document.createElement('div');
        floatElement.className = 'floating-cosmic-element';
        const size = 1 + Math.random() * 1.5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const duration = 20 + Math.random() * 20;
        const delay = Math.random() * 10;
        const left = Math.random() * 100;
        const top = Math.random() * 100;

        floatElement.textContent = element;
        floatElement.style.cssText = `
            position: absolute;
            font-size: ${size}rem;
            color: ${color};
            opacity: ${0.1 + Math.random() * 0.2};
            left: ${left}%;
            top: ${top}%;
            animation: cosmicFloat ${duration}s ease-in-out infinite ${delay}s;
            text-shadow: 0 0 10px ${color};
            z-index: -1;
            pointer-events: none;
        `;

        universe.appendChild(floatElement);
    });
}

// Cosmic parallax effect
function initializeCosmicParallax() {
    const layers = document.querySelectorAll('.cosmic-bg, .nebula-overlay, .galaxy-clusters, .cosmic-dust');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        layers.forEach((layer, index) => {
            const speed = 0.3 * (index + 1);
            const yPos = -(scrolled * speed);
            layer.style.transform = `translateY(${yPos}px)`;
        });
    }, { passive: true });
}