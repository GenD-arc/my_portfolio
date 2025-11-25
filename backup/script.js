// Enhanced galactic background with universal coverage

// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        initializeUniversalGalacticBackground();
    }, 2000);
});

// Initialize universal galactic background
function initializeUniversalGalacticBackground() {
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

const animationObserver = new IntersectionObserver((entries) => {
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

// Create sparkle effect for elements
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

// 3D hover effects for project cards (performance optimized)
function initialize3DHoverEffects() {
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
function initializeSkillHoverEffects() {
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
function initializeEasterEgg() {
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

// Theme Toggle
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    }
}

// Mobile menu toggle
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
}

// Smooth scrolling
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                const navLinks = document.getElementById('navLinks');
                const mobileMenuBtn = document.getElementById('mobileMenuBtn');
                if (navLinks && mobileMenuBtn) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
}

// Active nav link on scroll
function initializeActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        let current = '';
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    return updateActiveNav;
}

// Throttled scroll handler
function initializeScrollHandlers() {
    const updateActiveNav = initializeActiveNav();
    let scrollTimeout;

    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                updateActiveNav();
                updateProgressBar();
                scrollTimeout = null;
            }, 10);
        }

        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    });
}

// Back to top functionality
function initializeBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Progress bar
function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    }
}

// Typing effect
function initializeTypingEffect() {
    const typingText = document.getElementById('typingText');
    if (!typingText) return;

    const texts = [
        "BACKEND DEVELOPER",
        "FRONTEND DEVELOPER",
        "WEB DEVELOPER",
        "MOBILE DEVELOPER",
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

// Add all CSS animations at once
function initializeGlobalStyles() {
    const globalStyles = document.createElement('style');
    globalStyles.textContent = `
        @keyframes starTwinkle {
            0%, 100% { 
                opacity: 0.3; 
                transform: scale(1);
            }
            50% { 
                opacity: 1; 
                transform: scale(1.2);
            }
        }
        
        @keyframes shootingStar {
            0% {
                transform: translateX(-100vw) translateY(-100vh) rotate(45deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            20% {
                transform: translateX(100vw) translateY(100vh) rotate(45deg);
                opacity: 0;
            }
            100% {
                opacity: 0;
            }
        }
        
        @keyframes cosmicFloat {
            0%, 100% { 
                transform: translate(0, 0) rotate(0deg) scale(1);
                opacity: 0.1;
            }
            25% { 
                transform: translate(20px, -15px) rotate(90deg) scale(1.1);
                opacity: 0.3;
            }
            50% { 
                transform: translate(-10px, -25px) rotate(180deg) scale(0.9);
                opacity: 0.2;
            }
            75% { 
                transform: translate(-20px, -10px) rotate(270deg) scale(1.05);
                opacity: 0.25;
            }
        }
        
        @keyframes sparkleTwinkle {
            0% { 
                opacity: 0; 
                transform: scale(0); 
            }
            50% { 
                opacity: 1; 
                transform: scale(1.5); 
            }
            100% { 
                opacity: 0; 
                transform: scale(0); 
            }
        }
        
        @keyframes cosmicRainbow {
            0% { 
                filter: hue-rotate(0deg) brightness(1.2);
            }
            100% { 
                filter: hue-rotate(360deg) brightness(1.2);
            }
        }
        
        @keyframes supernova {
            0% {
                width: 0;
                height: 0;
                opacity: 1;
            }
            100% {
                width: 200vmax;
                height: 200vmax;
                opacity: 0;
            }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    document.head.appendChild(globalStyles);
}

// Force animation reset on scroll
function initializeScrollAnimations() {
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

// Credentials Data
const credentialsData = {
    education: [
        {
            id: 1,
            title: "Bachelor of Science in Computer Science",
            institution: "Manuel S. Enverga University Foundation - Candelaria Inc.",
            duration: "2021 - 2026 (Expected)",
            description: "Gaining comprehensive knowledge in software development, algorithms, and web technologies. Completed various projects in web and mobile development. Participated in National IT Competitions.",
            tags: ["Web Development", "Database Systems", "Software Engineering", "Software Testing", "Mobile Development"],
            type: "education",
            icon: "fas fa-graduation-cap"
        },
        {
            id: 2,
            title: "High School Diploma",
            institution: "Sta. Catalina National High School",
            duration: "2012 - 2019",
            description: "Developed foundational skills in mathematics and science, and participated in various academic competitions.",
            tags: ["Mathematics", "Science", "Communication Skills"],
            type: "education",
            icon: "fas fa-school"
        }
    ],
    certifications: [
        {
            id: 3,
            title: "AWS Certified Cloud Practitioner",
            institution: "Amazon Web Services",
            duration: "2024",
            description: "Fundamental understanding of AWS Cloud concepts, services, and pricing.",
            tags: ["Cloud Computing", "AWS", "Infrastructure"],
            type: "certification",
            icon: "fas fa-cloud"
        },
        {
            id: 4,
            title: "Google IT Support Professional Certificate",
            institution: "Google",
            duration: "2023",
            description: "Comprehensive training in IT support fundamentals including troubleshooting, customer service, and system administration.",
            tags: ["IT Support", "Troubleshooting", "Networking"],
            type: "certification",
            icon: "fas fa-laptop-code"
        },
        {
            id: 5,
            title: "React Developer Certification",
            institution: "Meta",
            duration: "2023",
            description: "Advanced React concepts including hooks, context API, and modern frontend development practices.",
            tags: ["React", "Frontend", "JavaScript"],
            type: "certification",
            icon: "fab fa-react"
        }
    ],
    achievements: [
        {
            id: 6,
            title: "National IT Competition Finalist",
            institution: "Philippine IT Association",
            duration: "2024",
            description: "Top 10 finalist in national web development competition showcasing innovative solutions.",
            tags: ["Competition", "Web Development", "Innovation"],
            type: "achievement",
            icon: "fas fa-trophy"
        },
        {
            id: 7,
            title: "Best Capstone Project",
            institution: "University Awards",
            duration: "2023",
            description: "Recognition for outstanding capstone project in software engineering.",
            tags: ["Capstone", "Software Engineering", "Recognition"],
            type: "achievement",
            icon: "fas fa-award"
        }
    ]
};

function renderCredentials() {
    const timeline = document.querySelector('.education-timeline');
    if (!timeline) {
        console.error('Timeline element not found in renderCredentials');
        return;
    }

    timeline.innerHTML = '';

    const allCredentials = [
        ...credentialsData.education,
        ...credentialsData.certifications,
        ...credentialsData.achievements
    ];

    allCredentials.forEach((credential, index) => {
    const timelineItem = createTimelineItem(credential, index);
    timeline.appendChild(timelineItem);
    
    // Observe the timeline item itself
    animationObserver.observe(timelineItem);
});
}

function createTimelineItem(credential, index) {
    const timelineItem = document.createElement('div');
    timelineItem.className = 'timeline-item animate-on-scroll';
    timelineItem.setAttribute('data-animation', index % 2 === 0 ? 'slide-right' : 'slide-left');
    
    // Determine badge color based on type
    const badgeColors = {
        education: '#8b5cf6',
        certification: '#06d6a0',
        achievement: '#f59e0b'
    };

    timelineItem.innerHTML = `
        <div class="timeline-dot" style="background: ${badgeColors[credential.type]}"></div>
        <div class="timeline-content">
            <div class="credential-header">
                <div class="credential-type-badge" style="background: ${badgeColors[credential.type]}">
                    <i class="${credential.icon}"></i>
                    ${credential.type.charAt(0).toUpperCase() + credential.type.slice(1)}
                </div>
                <h3>${credential.title}</h3>
                <span class="institution">${credential.institution}</span>
                <span class="duration">${credential.duration}</span>
            </div>
            <p>${credential.description}</p>
            <div class="tech-tags">
                ${credential.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    return timelineItem;
}

// Add filter buttons
function addFilterButtons() {
    const sectionContainer = document.querySelector('#education .section-container');
    if (!sectionContainer) {
        console.error('Section container not found');
        return;
    }

    const filterHTML = `
        <div class="credential-filters">
            <button class="filter-btn active" data-filter="all">All Credentials</button>
            <button class="filter-btn" data-filter="education">Education</button>
            <button class="filter-btn" data-filter="certification">Certifications</button>
            <button class="filter-btn" data-filter="achievement">Achievements</button>
        </div>
    `;
    
    const sectionHeader = sectionContainer.querySelector('.section-header');
    if (sectionHeader) {
        sectionHeader.insertAdjacentHTML('afterend', filterHTML);
        initializeFilterButtons();
    } else {
        console.error('Section header not found');
    }
}

function initializeFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter credentials
            const filter = button.getAttribute('data-filter');
            filterCredentials(filter);
        });
    });
}

function filterCredentials(filterType) {
    const allCredentials = [
        ...credentialsData.education,
        ...credentialsData.certifications,
        ...credentialsData.achievements
    ];
    
    const filteredCredentials = filterType === 'all' 
        ? allCredentials 
        : allCredentials.filter(cred => cred.type === filterType);
    
    // Re-render with filtered data
    renderFilteredCredentials(filteredCredentials);
}

function renderFilteredCredentials(credentials) {
    const timeline = document.querySelector('.education-timeline');
    if (!timeline) return;

    timeline.innerHTML = '';
    
    if (credentials.length === 0) {
        timeline.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>No credentials found</h3>
                <p>Try adjusting your search terms or filters</p>
            </div>
        `;
        return;
    }
    
    credentials.forEach((credential, index) => {
        const timelineItem = createTimelineItem(credential, index);
        timeline.appendChild(timelineItem);
        
        // Observe the timeline item itself for animations
        animationObserver.observe(timelineItem);
        
        // Force immediate animation trigger since items are already in viewport
        setTimeout(() => {
            timelineItem.classList.add('animated');
        }, 50 * index); // Stagger the animations
    });
}

function addSearchFunctionality() {
    const sectionContainer = document.querySelector('#education .section-container');
    if (!sectionContainer) {
        console.error('Section container not found for search');
        return;
    }

    const searchHTML = `
        <div class="credential-search animate-on-scroll" data-animation="fade-in-up">
            <input type="text" class="search-input" placeholder="Search credentials...">
        </div>
    `;
    
    const filters = sectionContainer.querySelector('.credential-filters');
    if (filters) {
        filters.insertAdjacentHTML('afterend', searchHTML);
        initializeSearch();
    } else {
        console.error('Filter buttons not found for search insertion');
    }
}

function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;

    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const searchTerm = e.target.value.toLowerCase().trim();
            searchCredentials(searchTerm);
        }, 300);
    });
}

function searchCredentials(searchTerm) {
    const allCredentials = [
        ...credentialsData.education,
        ...credentialsData.certifications,
        ...credentialsData.achievements
    ];
    
    const filteredCredentials = searchTerm === '' 
        ? allCredentials 
        : allCredentials.filter(cred => 
            cred.title.toLowerCase().includes(searchTerm) ||
            cred.institution.toLowerCase().includes(searchTerm) ||
            cred.description.toLowerCase().includes(searchTerm) ||
            cred.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    
    renderFilteredCredentials(filteredCredentials);
}

function initializeDynamicCredentials() {
    // Wait for DOM to be ready with longer delay
    setTimeout(() => {
        const timeline = document.querySelector('.education-timeline');
        if (!timeline) {
            console.error('Timeline not found!');
            console.log('Available sections:', document.querySelectorAll('section'));
            return;
        }
        
        console.log('Timeline found, initializing credentials...');
        
        // Add the actual credentials
        addFilterButtons();
        addSearchFunctionality();
        renderCredentials();
        
        // Force immediate visibility for debugging
        setTimeout(() => {
            const items = document.querySelectorAll('.timeline-item');
            console.log(`Found ${items.length} timeline items`);  // ✅ Fixed
            items.forEach(item => {
                item.classList.add('animated');
            });
        }, 500);
    }, 500);
}

// Projects Data (keep your existing data or use this)
const projectsData = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "Full-stack online shopping platform with real-time inventory management and payment integration",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
        tags: ["React", "Node.js", "MongoDB", "Stripe"],
        github: "#",
        demo: "#",
        category: "fullstack"
    },
    {
        id: 2,
        title: "Task Management App",
        description: "Collaborative project management tool with drag-and-drop interface and team collaboration features",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
        tags: ["Vue.js", "Sass", "JavaScript", "Firebase"],
        github: "#",
        demo: "#",
        category: "frontend"
    },
    {
        id: 3,
        title: "Portfolio Website",
        description: "Responsive personal portfolio website with smooth animations and modern design",
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80",
        tags: ["HTML5", "CSS3", "JavaScript", "Responsive"],
        github: "#",
        demo: "#",
        category: "frontend"
    },
    {
        id: 4,
        title: "Weather Dashboard",
        description: "Real-time weather application with location-based forecasts and interactive maps",
        image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80",
        tags: ["React", "API Integration", "Chart.js", "Geolocation"],
        github: "#",
        demo: "#",
        category: "frontend"
    },
    {
        id: 5,
        title: "Blog CMS",
        description: "Content management system with markdown support, user authentication, and admin dashboard",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
        tags: ["Node.js", "Express", "MongoDB", "JWT"],
        github: "#",
        demo: "#",
        category: "backend"
    },
    {
        id: 6,
        title: "Fitness Tracker Mobile App",
        description: "Cross-platform mobile app for tracking workouts, calories, and fitness goals",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80",
        tags: ["Flutter", "Dart", "Firebase", "Mobile"],
        github: "#",
        demo: "#",
        category: "mobile"
    }
];

// Carousel state
let currentSlide = 0;
let filteredProjectsData = [...projectsData];
let autoPlayInterval = null;

// Function to create individual project cards
function createProjectCard(project) {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    
    const tagIcons = {
        'React': 'fab fa-react',
        'Node.js': 'fab fa-node-js',
        'MongoDB': 'fas fa-database',
        'Stripe': 'fas fa-credit-card',
        'Vue.js': 'fab fa-vuejs',
        'Sass': 'fab fa-sass',
        'JavaScript': 'fab fa-js',
        'Firebase': 'fas fa-fire',
        'HTML5': 'fab fa-html5',
        'CSS3': 'fab fa-css3-alt',
        'Responsive': 'fas fa-mobile-alt',
        'API Integration': 'fas fa-plug',
        'Chart.js': 'fas fa-chart-line',
        'Geolocation': 'fas fa-map-marker-alt',
        'Express': 'fas fa-server',
        'JWT': 'fas fa-key',
        'Flutter': 'fab fa-flutter',
        'Dart': 'fas fa-code',
        'Mobile': 'fas fa-mobile-alt'
    };

    projectCard.innerHTML = `
        <div class="project-image-container">
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-overlay">
                <div class="project-links">
                    <a href="${project.github}" class="project-link" aria-label="GitHub"><i class="fab fa-github"></i></a>
                    <a href="${project.demo}" class="project-link" aria-label="Live Demo"><i class="fas fa-external-link-alt"></i></a>
                </div>
            </div>
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tech-tags">
                ${project.tags.map(tag => `
                    <span class="tech-tag">
                        <i class="${tagIcons[tag] || 'fas fa-code'}"></i> ${tag}
                    </span>
                `).join('')}
            </div>
        </div>
    `;
    
    return projectCard;
}

// Render carousel
function renderCarousel(projects = filteredProjectsData) {
    const carousel = document.querySelector('.projects-carousel');
    if (!carousel) return;

    carousel.innerHTML = '';
    
    if (projects.length === 0) {
        carousel.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-folder-open"></i>
                <h3>No projects found</h3>
                <p>Try selecting a different category</p>
            </div>
        `;
        return;
    }

    // Create carousel track
    const track = document.createElement('div');
    track.className = 'carousel-track';
    
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        track.appendChild(projectCard);
    });
    
    carousel.appendChild(track);
    
    // Create dots
    createCarouselDots(projects.length);
    
    // Reset to first slide
    currentSlide = 0;
    updateCarousel();
}

// Create carousel dots
function createCarouselDots(count) {
    const dotsContainer = document.querySelector('.carousel-dots');
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        if (i === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
            currentSlide = i;
            updateCarousel();
            resetAutoPlay();
        });
        
        dotsContainer.appendChild(dot);
    }
}

// Update carousel position
function updateCarousel() {
    const track = document.querySelector('.carousel-track');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (!track) return;
    
    const slideWidth = 100;
    track.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Next slide
function nextSlide() {
    const projectCards = document.querySelectorAll('.carousel-track .project-card');
    if (currentSlide < projectCards.length - 1) {
        currentSlide++;
    } else {
        currentSlide = 0; // Loop back to start
    }
    updateCarousel();
}

// Previous slide
function prevSlide() {
    const projectCards = document.querySelectorAll('.carousel-track .project-card');
    if (currentSlide > 0) {
        currentSlide--;
    } else {
        currentSlide = projectCards.length - 1; // Loop to end
    }
    updateCarousel();
}

// Initialize carousel controls
function initializeCarouselControls() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoPlay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoPlay();
        }
    });
    
    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    const carousel = document.querySelector('.projects-carousel');
    if (carousel) {
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
            resetAutoPlay();
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide();
            resetAutoPlay();
        }
    }
}

// Auto-play carousel
function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        nextSlide();
    }, 5000); // Change slide every 5 seconds
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
}

// Add project filters
function addProjectFilters() {
    const sectionContainer = document.querySelector('#projects .section-container');
    if (!sectionContainer) return;

    const filterHTML = `
        <div class="project-filters">
            <button class="filter-btn active" data-filter="all">All Projects</button>
            <button class="filter-btn" data-filter="fullstack">Full Stack</button>
            <button class="filter-btn" data-filter="frontend">Frontend</button>
            <button class="filter-btn" data-filter="backend">Backend</button>
            <button class="filter-btn" data-filter="mobile">Mobile</button>
        </div>
    `;
    
    const sectionHeader = sectionContainer.querySelector('.section-header');
    if (sectionHeader) {
        sectionHeader.insertAdjacentHTML('afterend', filterHTML);
        initializeProjectFilters();
    }
}

// Initialize project filters
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.project-filters .filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            filterProjects(filter);
        });
    });
}

// Filter projects
function filterProjects(filterType) {
    filteredProjectsData = filterType === 'all' 
        ? [...projectsData] 
        : projectsData.filter(project => project.category === filterType);
    
    renderCarousel(filteredProjectsData);
    resetAutoPlay();
}

// Initialize projects carousel
function initializeDynamicProjects() {
    setTimeout(() => {
        const carousel = document.querySelector('.projects-carousel');
        if (!carousel) {
            console.error('Projects carousel not found!');
            return;
        }
        
        console.log('Projects carousel found, initializing...');
        
        addProjectFilters();
        renderCarousel();
        initializeCarouselControls();
        startAutoPlay();
        
        // Pause auto-play when user hovers over carousel
        const carouselContainer = document.querySelector('.projects-carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoPlay);
            carouselContainer.addEventListener('mouseleave', startAutoPlay);
        }
    }, 100);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize global styles first
    initializeGlobalStyles();
    
    // Initialize core functionality
    initializeThemeToggle();
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeScrollHandlers();
    initializeBackToTop();
    initializeTypingEffect();
    initialize3DHoverEffects();
    initializeSkillHoverEffects();
    initializeEasterEgg();
    initializeScrollAnimations();
    
    // Initialize active nav
    const updateActiveNav = initializeActiveNav();
    updateActiveNav();
    
    // Observe all animated elements
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        animationObserver.observe(el);
    });
    
    // Initialize galactic background
    initializeUniversalGalacticBackground();
    
    // Initialize credentials section - this is the key fix
    initializeDynamicCredentials();

    initializeDynamicProjects();
});