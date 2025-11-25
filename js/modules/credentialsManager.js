import { credentialsData } from '../config/credentialsData.js';
import { animationObserver } from './animations.js';

export function initializeDynamicCredentials() {
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
            console.log(`Found ${items.length} timeline items`);
            items.forEach(item => {
                item.classList.add('animated');
            });
        }, 500);
    }, 500);
}

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