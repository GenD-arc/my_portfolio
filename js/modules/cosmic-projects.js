// js/modules/cosmic-projects.js
import { projectsData } from '../config/projectsData.js';

let currentProjects = [];
let isMobile = false;

export function initializeCosmicProjects() {
    console.log('🔄 Initializing cosmic projects...');
    
    // Check device type
    isMobile = window.innerWidth <= 768;
    
    // Wait for DOM to be fully ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        renderCosmicProjects();
        initializeCosmicFilters();
        initializeProjectInteractions();
        if (!isMobile) {
            initialize3DProjectEffects();
        }
        
        // Add resize listener for responsive behavior
        window.addEventListener('resize', handleResize);
        
        console.log('✅ Cosmic projects initialized');
    }
}

function handleResize() {
    const mobile = window.innerWidth <= 768;
    if (mobile !== isMobile) {
        isMobile = mobile;
        // Re-initialize 3D effects if switching between mobile/desktop
        if (!isMobile) {
            initialize3DProjectEffects();
        }
    }
}

function renderCosmicProjects(projects = projectsData) {
    const grid = document.getElementById('cosmicProjectsGrid');
    
    if (!grid) {
        console.error('❌ Projects grid element not found!');
        return;
    }

    console.log(`🎨 Rendering ${projects.length} projects...`);
    
    // Add loading state
    grid.innerHTML = '<div class="project-loading"><div class="loading-pulsar"></div></div>';
    
    setTimeout(() => {
        grid.innerHTML = '';

        if (projects.length === 0) {
            grid.innerHTML = `
                <div class="projects-empty-state">
                    <div class="empty-state-icon">🚀</div>
                    <h3>No Projects Found</h3>
                    <p>Try selecting a different category or check back later for new cosmic creations!</p>
                </div>
            `;
            return;
        }

        currentProjects = projects;

        projects.forEach((project, index) => {
            const projectCard = createCosmicProjectCard(project, index);
            grid.appendChild(projectCard);
            
            // Add staggered animation
            setTimeout(() => {
                projectCard.style.opacity = '1';
                projectCard.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 300);
}

function createCosmicProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'cosmic-project-card';
    card.setAttribute('data-category', project.category);
    card.setAttribute('data-project-id', project.id);
    
    // Initial state for animation
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;

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

    card.innerHTML = `
        <div class="project-card-header">
            <img src="${project.image}" alt="${project.title}" class="project-card-image" loading="lazy">
            <div class="project-card-overlay">
                <div class="project-card-actions">
                    <a href="${project.github}" class="project-action-btn" target="_blank" aria-label="View Code on GitHub">
                        <i class="fab fa-github"></i>
                    </a>
                    <a href="${project.demo}" class="project-action-btn" target="_blank" aria-label="View Live Demo">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                    <button class="project-action-btn view-details" data-project="${project.id}" aria-label="View Project Details">
                        <i class="fas fa-expand"></i>
                    </button>
                </div>
            </div>
        </div>
        
        <div class="project-card-content">
            <div class="project-card-badge">
                <i class="fas ${getCategoryIcon(project.category)}"></i>
                ${getCategoryName(project.category)}
            </div>
            
            <h3 class="project-card-title">${project.title}</h3>
            
            <p class="project-card-description">${project.description}</p>
            
            <div class="cosmic-tech-tags">
                ${project.tags.slice(0, 3).map(tag => `
                    <span class="cosmic-tech-tag">
                        <i class="${tagIcons[tag] || 'fas fa-code'}"></i>
                        ${tag}
                    </span>
                `).join('')}
                ${project.tags.length > 3 ? `
                    <span class="cosmic-tech-tag">
                        <i class="fas fa-plus"></i>
                        +${project.tags.length - 3}
                    </span>
                ` : ''}
            </div>
            
            <div class="project-card-footer">
                <div class="project-stats">
                    <span class="project-stat">
                        <i class="fas fa-code"></i>
                        ${project.tags.length} Tech
                    </span>
                    <span class="project-stat">
                        <i class="fas ${project.category === 'mobile' ? 'fa-mobile-alt' : 'fa-desktop'}"></i>
                        ${getPlatformName(project.category)}
                    </span>
                </div>
                <button class="project-explore-btn view-project" data-project="${project.id}">
                    Explore <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `;

    return card;
}

function getCategoryIcon(category) {
    const icons = {
        'fullstack': 'fa-layer-group',
        'frontend': 'fa-palette',
        'backend': 'fa-server',
        'mobile': 'fa-mobile-alt'
    };
    return icons[category] || 'fa-star';
}

function getCategoryName(category) {
    const names = {
        'fullstack': 'Full Stack',
        'frontend': 'Frontend',
        'backend': 'Backend',
        'mobile': 'Mobile'
    };
    return names[category] || 'Project';
}

function getPlatformName(category) {
    return category === 'mobile' ? 'Mobile' : 'Web';
}

function initializeCosmicFilters() {
    const filters = document.querySelectorAll('.cosmic-filter');
    
    console.log(`🎯 Found ${filters.length} filter buttons`);
    
    filters.forEach(filter => {
        filter.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active state
            filters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            
            // Filter projects
            const category = filter.getAttribute('data-filter');
            console.log(`🔍 Filtering by: ${category}`);
            filterCosmicProjects(category);
        });
    });
}

function filterCosmicProjects(category) {
    const filteredProjects = category === 'all' 
        ? projectsData 
        : projectsData.filter(project => project.category === category);
    
    console.log(`📊 Showing ${filteredProjects.length} projects for category: ${category}`);
    
    // Add loading transition
    const grid = document.getElementById('cosmicProjectsGrid');
    grid.style.opacity = '0.5';
    grid.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        renderCosmicProjects(filteredProjects);
        grid.style.opacity = '1';
    }, 300);
}

function initializeProjectInteractions() {
    console.log('🖱️ Initializing project interactions...');
    
    // Use event delegation for dynamic content
    document.addEventListener('click', (e) => {
        // View details button
        if (e.target.closest('.view-details') || e.target.closest('.view-project')) {
            const button = e.target.closest('.view-details, .view-project');
            const projectId = button.getAttribute('data-project');
            const project = projectsData.find(p => p.id == projectId);
            
            if (project) {
                console.log(`🔍 Opening details for: ${project.title}`);
                // redirect the user to the website demo
            }
        }
    });

    // Close constellation view
    const closeBtn = document.getElementById('closeConstellation');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeProjectDetails);
    }

    // Close on backdrop click
    const constellationView = document.getElementById('constellationView');
    if (constellationView) {
        constellationView.addEventListener('click', (e) => {
            if (e.target === constellationView) {
                closeProjectDetails();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectDetails();
        }
    });
    
    // Touch event for mobile
    if (isMobile) {
        document.addEventListener('touchstart', handleTouchStart, { passive: true });
    }
}

function handleTouchStart(e) {
    // Add touch-specific interactions here if needed
}

function getTagIcon(tag) {
    const icons = {
        'React': 'fab fa-react',
        'Node.js': 'fab fa-node-js',
        'MongoDB': 'fas fa-database',
        'JavaScript': 'fab fa-js',
        'Vue.js': 'fab fa-vuejs',
        'Flutter': 'fab fa-flutter',
        'Firebase': 'fas fa-fire',
        'HTML5': 'fab fa-html5',
        'CSS3': 'fab fa-css3-alt',
        'Express': 'fas fa-server',
    };
    return icons[tag] || 'fas fa-code';
}

function closeProjectDetails() {
    const constellationView = document.getElementById('constellationView');
    if (constellationView) {
        constellationView.classList.remove('active');
        document.body.style.overflow = '';
    }
}

export function initialize3DProjectEffects() {
    if (isMobile) return; // Skip 3D effects on mobile
    
    const cards = document.querySelectorAll('.cosmic-project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-15px) scale(1.02)';
            // Reset transition for smooth return
            card.style.transition = 'transform 0.5s ease';
        });
    });
}

// Enhanced debug function
export function debugProjects() {
    console.log('🔍 Projects Debug Info:');
    console.log('Projects Data:', projectsData);
    console.log('Grid Element:', document.getElementById('cosmicProjectsGrid'));
    console.log('Filter Buttons:', document.querySelectorAll('.cosmic-filter').length);
    console.log('Is Mobile:', isMobile);
    console.log('Viewport Width:', window.innerWidth);
}

// Export for global access if needed
window.debugProjects = debugProjects;