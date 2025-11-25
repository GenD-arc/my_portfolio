import { initializeThemeToggle } from './modules/themeManager.js';
import { initializeMobileMenu, initializeSmoothScrolling, initializeScrollHandlers, initializeBackToTop } from './modules/navigation.js';
import { initializeTypingEffect, initializeScrollAnimations, initializeAnimationObserver } from './modules/animations.js';
import { initializeUniversalGalacticBackground } from './modules/galacticBackground.js';
import { initializeDynamicCredentials } from './modules/credentialsManager.js';
import { initialize3DHoverEffects, initializeSkillHoverEffects, initializeEasterEgg } from './modules/utils.js';
import { initializeCosmicProjects, initialize3DProjectEffects } from './modules/cosmic-projects.js';

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize core functionality
    initializeThemeToggle();
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeScrollHandlers();
    initializeBackToTop();
    initializeTypingEffect();
    initializeScrollAnimations();
    initializeAnimationObserver();
    
    // Initialize effects
    initialize3DHoverEffects();
    initializeSkillHoverEffects();
    initializeEasterEgg();
    
    // Initialize galactic background
    initializeUniversalGalacticBackground();
    
    // Initialize dynamic content
    initializeDynamicCredentials();

    // Initialize cosmic projects (NEW - replaces the carousel)
    initializeCosmicProjects();
    initialize3DProjectEffects();
    
    // Loading screen
    window.addEventListener('load', () => {
        const loadingScreen = document.getElementById('loadingScreen');
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 2000);
    });
});