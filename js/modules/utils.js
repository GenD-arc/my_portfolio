// 3D hover effects for project cards (performance optimized)
export function initialize3DHoverEffects() {
    document.querySelectorAll('.project-card').forEach(card => {
        let rafId;
        
        card.addEventListener('mousemove', (e) => {
            if (rafId) return;
            
            rafId = requestAnimationFrame(() => {
                const cardRect = card.getBoundingClientRect();
                const x = e.clientX - cardRect.left;
                const y = e.clientY - cardRect.top;
                
                const centerX = cardRect.width / 2;
                const centerY = cardRect.height / 2;
                
                const angleY = (x - centerX) / 25;
                const angleX = (centerY - y) / 25;
                
                card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
                rafId = null;
            });
        });
        
        card.addEventListener('mouseleave', () => {
            if (rafId) cancelAnimationFrame(rafId);
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px)';
        });
    });
}

// Skill items hover effect
export function initializeSkillHoverEffects() {
    document.querySelectorAll('.skill-item').forEach(skill => {
        skill.addEventListener('mouseenter', () => {
            skill.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        skill.addEventListener('mouseleave', () => {
            skill.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Easter egg - Cosmic Konami code
export function initializeEasterEgg() {
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join('') === konamiSequence.join('')) {
            // Trigger cosmic easter egg
            document.body.style.animation = 'cosmicRainbow 5s infinite';
            createSupernovaEffect();
            
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
            
            konamiCode = [];
        }
    });
}

function createSupernovaEffect() {
    const supernova = document.createElement('div');
    supernova.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: radial-gradient(circle, #ff0000, #ffff00, #ffffff);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: supernova 2s ease-out forwards;
        z-index: 9999;
        pointer-events: none;
    `;
    
    document.body.appendChild(supernova);
    
    setTimeout(() => {
        supernova.remove();
    }, 2000);
}