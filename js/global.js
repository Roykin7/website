// STEMCity Labs Global JavaScript - Mobile-First Responsive Functionality

// Global Variables
const STEMCityLabs = {
    // Configuration
    config: {
        searchDelay: 300,
        popupDelay: 3000,
        animationDuration: 300
    },
    
    // Search functionality data
    searchData: [
        { url: 'index.html', title: 'Home', content: 'STEMCity Labs Empowering Africa Next Generation of Innovators STEM Science Technology Engineering Mathematics education civic technology vision youth skills societal change educators students industry professionals civic leaders collaboration innovation' },
        { url: 'about.html', title: 'About Us', content: 'STEMCity Labs mission vision values team board members staff organization history purpose goals objectives foundation background story journey' },
        { url: 'solution.html', title: 'Our Solution', content: 'STEMCity Labs solution approach methodology program curriculum hubs vibrant all-in-one students educators industry leaders civic changemakers collaboration creativity real-world impact hands-on learning end-to-end support inclusive ecosystems innovation' },
        { url: 'goals.html', title: 'Goals & Impact', content: 'STEMCity Labs EVO PROJECT Digital Skills for the Future Project outcomes objectives impact assessment metrics achievements milestones progress evaluation success measurement results Digital Workplace Tujulize Uganda' },
        { url: 'get-involved.html', title: 'Get Involved', content: 'STEMCity Labs volunteer donate support partner sponsor collaborate contribute join participate help assist engagement involvement community opportunities jobs tenders partnerships schools volunteering' },
        { url: 'success-stories.html', title: 'Success Stories', content: 'STEMCity Labs success stories case studies testimonials achievements impact student stories teacher stories program outcomes inspiration' },
        { url: 'news.html', title: 'News & Blog', content: 'STEMCity Labs news updates blog articles posts announcements events happenings recent activities press media coverage' },
        { url: 'events.html', title: 'Events Calendar', content: 'STEMCity Labs events calendar workshops seminars hackathons conferences meetups gatherings schedule dates times locations upcoming' },
        { url: 'resources.html', title: 'Resources', content: 'STEMCity Labs resources materials downloads guides information tools learning assets educational content references documents' },
        { url: 'contact.html', title: 'Contact Us', content: 'STEMCity Labs contact information email phone address location office headquarters get in touch reach out message inquiry question feedback' }
    ],
    
    // State management
    state: {
        searchOpen: false,
        mobileNavOpen: false,
        popupShown: localStorage.getItem('popupShown') === 'true'
    }
};

// Utility Functions
const Utils = {
    // Debounce function for search
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Smooth scroll to element
    scrollToElement: function(element, offset = 0) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const targetPosition = elementPosition - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    },
    
    // Generate unique ID
    generateId: function() {
        return Math.random().toString(36).substr(2, 9);
    }
};

// Mobile Navigation
const MobileNav = {
    init: function() {
        this.createMobileToggle();
        this.bindEvents();
        this.handleResize();
    },
    
    createMobileToggle: function() {
        const nav = document.querySelector('nav');
        const navContainer = nav.querySelector('.nav-container') || nav;
        
        // Create mobile toggle button
        const toggleButton = document.createElement('button');
        toggleButton.className = 'mobile-nav-toggle';
        toggleButton.innerHTML = '☰';
        toggleButton.setAttribute('aria-label', 'Toggle navigation menu');
        
        // Insert at beginning of nav
        navContainer.insertBefore(toggleButton, navContainer.firstChild);
        
        // Add mobile nav class to nav ul
        const navList = nav.querySelector('ul');
        if (navList) {
            navList.classList.add('mobile-nav-list');
        }
    },
    
    bindEvents: function() {
        const toggleButton = document.querySelector('.mobile-nav-toggle');
        const navList = document.querySelector('.mobile-nav-list');
        
        if (toggleButton && navList) {
            toggleButton.addEventListener('click', () => {
                STEMCityLabs.state.mobileNavOpen = !STEMCityLabs.state.mobileNavOpen;
                this.toggleNav();
            });
            
            // Close nav when clicking on a link
            navList.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') {
                    STEMCityLabs.state.mobileNavOpen = false;
                    this.toggleNav();
                }
            });
            
            // Close nav when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('nav') && STEMCityLabs.state.mobileNavOpen) {
                    STEMCityLabs.state.mobileNavOpen = false;
                    this.toggleNav();
                }
            });
        }
    },
    
    toggleNav: function() {
        const navList = document.querySelector('.mobile-nav-list');
        const toggleButton = document.querySelector('.mobile-nav-toggle');
        
        if (navList && toggleButton) {
            if (STEMCityLabs.state.mobileNavOpen) {
                navList.style.display = 'flex';
                toggleButton.innerHTML = '✕';
                toggleButton.setAttribute('aria-expanded', 'true');
            } else {
                navList.style.display = '';
                toggleButton.innerHTML = '☰';
                toggleButton.setAttribute('aria-expanded', 'false');
            }
        }
    },
    
    handleResize: function() {
        window.addEventListener('resize', Utils.debounce(() => {
            const isMobile = window.innerWidth <= 575.98;
            const toggleButton = document.querySelector('.mobile-nav-toggle');
            const navList = document.querySelector('.mobile-nav-list');
            
            if (toggleButton && navList) {
                if (isMobile) {
                    toggleButton.style.display = 'block';
                    if (!STEMCityLabs.state.mobileNavOpen) {
                        navList.style.display = 'none';
                    }
                } else {
                    toggleButton.style.display = 'none';
                    navList.style.display = '';
                    STEMCityLabs.state.mobileNavOpen = false;
                }
            }
        }, 250));
    }
};

// Search Functionality
const Search = {
    init: function() {
        this.bindEvents();
        this.createSearchElements();
    },
    
    createSearchElements: function() {
        const searchContainer = document.querySelector('.search-container');
        if (!searchContainer) return;
        
        // Ensure proper structure
        let searchToggle = searchContainer.querySelector('.search-toggle');
        let searchForm = searchContainer.querySelector('.search-form');
        
        if (!searchToggle) {
            searchToggle = document.createElement('button');
            searchToggle.className = 'search-toggle';
            searchToggle.innerHTML = `
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                <span>Search</span>
            `;
            searchContainer.appendChild(searchToggle);
        }
        
        if (!searchForm) {
            searchForm = document.createElement('div');
            searchForm.className = 'search-form';
            searchForm.innerHTML = `
                <form onsubmit="return Search.performSearch(event)">
                    <div class="d-flex gap-2">
                        <input type="text" class="form-control search-input" placeholder="Search the website..." autocomplete="off">
                        <button type="submit" class="btn btn-primary">Go</button>
                    </div>
                </form>
                <div class="search-results mt-2"></div>
            `;
            searchContainer.appendChild(searchForm);
        }
    },
    
    bindEvents: function() {
        document.addEventListener('click', (e) => {
            const searchToggle = e.target.closest('.search-toggle');
            const searchContainer = e.target.closest('.search-container');
            
            if (searchToggle) {
                e.preventDefault();
                this.toggleSearch();
            } else if (!searchContainer && STEMCityLabs.state.searchOpen) {
                this.closeSearch();
            }
        });
        
        // Handle search input with debounce
        document.addEventListener('input', Utils.debounce((e) => {
            if (e.target.classList.contains('search-input')) {
                this.liveSearch(e.target.value);
            }
        }, STEMCityLabs.config.searchDelay));
        
        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && STEMCityLabs.state.searchOpen) {
                this.closeSearch();
            }
        });
    },
    
    toggleSearch: function() {
        const searchForm = document.querySelector('.search-form');
        if (!searchForm) return;
        
        STEMCityLabs.state.searchOpen = !STEMCityLabs.state.searchOpen;
        
        if (STEMCityLabs.state.searchOpen) {
            searchForm.style.display = 'block';
            const searchInput = searchForm.querySelector('.search-input');
            if (searchInput) {
                setTimeout(() => searchInput.focus(), 100);
            }
        } else {
            searchForm.style.display = 'none';
        }
    },
    
    closeSearch: function() {
        const searchForm = document.querySelector('.search-form');
        if (searchForm) {
            searchForm.style.display = 'none';
            STEMCityLabs.state.searchOpen = false;
        }
    },
    
    performSearch: function(event) {
        event.preventDefault();
        const searchInput = event.target.querySelector('.search-input');
        if (searchInput) {
            this.executeSearch(searchInput.value);
        }
        return false;
    },
    
    liveSearch: function(query) {
        if (query.length > 2) {
            this.executeSearch(query);
        } else {
            this.clearResults();
        }
    },
    
    executeSearch: function(query) {
        const searchResults = document.querySelector('.search-results');
        if (!searchResults || !query.trim()) {
            this.clearResults();
            return;
        }
        
        const results = STEMCityLabs.searchData.filter(page => 
            page.title.toLowerCase().includes(query.toLowerCase()) || 
            page.content.toLowerCase().includes(query.toLowerCase())
        );
        
        this.displayResults(results, searchResults);
    },
    
    displayResults: function(results, container) {
        if (results.length === 0) {
            container.innerHTML = '<p class="text-center">No results found. Try different keywords.</p>';
        } else {
            let resultsHtml = '<h5 class="mb-2">Results:</h5>';
            results.forEach(page => {
                resultsHtml += `
                    <div class="mb-2 pb-2" style="border-bottom: 1px solid #e0e0e0;">
                        <a href="${page.url}" class="text-decoration-none fw-bold" style="color: #3949ab;">${page.title}</a>
                    </div>
                `;
            });
            container.innerHTML = resultsHtml;
        }
    },
    
    clearResults: function() {
        const searchResults = document.querySelector('.search-results');
        if (searchResults) {
            searchResults.innerHTML = '';
        }
    }
};

// Email Popup Management
const EmailPopup = {
    init: function() {
        if (!STEMCityLabs.state.popupShown) {
            setTimeout(() => {
                this.showPopup();
            }, STEMCityLabs.config.popupDelay);
        }
        
        this.bindEvents();
    },
    
    bindEvents: function() {
        document.addEventListener('click', (e) => {
            const closeButton = e.target.closest('#close-popup');
            const popup = e.target.closest('#email-popup');
            
            if (closeButton || (popup && e.target === popup)) {
                this.hidePopup();
            }
        });
        
        // Handle form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'popup-email-form' || e.target.id === 'footer-email-form') {
                e.preventDefault();
                this.handleEmailSubmission(e.target);
            }
        });
    },
    
    showPopup: function() {
        const popup = document.querySelector('#email-popup');
        if (popup) {
            popup.style.display = 'flex';
        }
    },
    
    hidePopup: function() {
        const popup = document.querySelector('#email-popup');
        if (popup) {
            popup.style.display = 'none';
            localStorage.setItem('popupShown', 'true');
            STEMCityLabs.state.popupShown = true;
        }
    },
    
    handleEmailSubmission: function(form) {
        const email = form.querySelector('input[type="email"]').value;
        const name = form.querySelector('input[name="name"]')?.value || 'Subscriber';
        
        // Here you would typically send this data to your server
        console.log('Email subscription:', { email, name });
        
        this.showSuccessMessage(form);
        
        if (form.id === 'popup-email-form') {
            setTimeout(() => {
                this.hidePopup();
            }, 3000);
        }
    },
    
    showSuccessMessage: function(form) {
        const formContainer = form.parentElement;
        const originalContent = formContainer.innerHTML;
        
        formContainer.innerHTML = `
            <div class="text-center p-3">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <h4 class="mt-2 mb-2" style="color: #4CAF50;">Thank You!</h4>
                <p>Your subscription has been confirmed.</p>
            </div>
        `;
    }
};

// Form Validation
const FormValidation = {
    init: function() {
        this.bindEvents();
    },
    
    bindEvents: function() {
        document.addEventListener('submit', (e) => {
            const form = e.target;
            if (form.tagName === 'FORM' && !this.validateForm(form)) {
                e.preventDefault();
            }
        });
        
        // Real-time validation
        document.addEventListener('blur', (e) => {
            if (e.target.classList.contains('form-control')) {
                this.validateField(e.target);
            }
        }, true);
    },
    
    validateForm: function(form) {
        let isValid = true;
        const fields = form.querySelectorAll('.form-control[required]');
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    },
    
    validateField: function(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let message = '';
        
        // Remove existing error
        this.clearFieldError(field);
        
        // Required validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            message = 'This field is required.';
        }
        
        // Email validation
        else if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Please enter a valid email address.';
            }
        }
        
        // Phone validation
        else if (type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                isValid = false;
                message = 'Please enter a valid phone number.';
            }
        }
        
        if (!isValid) {
            this.showFieldError(field, message);
        }
        
        return isValid;
    },
    
    showFieldError: function(field, message) {
        field.classList.add('is-invalid');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    },
    
    clearFieldError: function(field) {
        field.classList.remove('is-invalid');
        const errorDiv = field.parentNode.querySelector('.invalid-feedback');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
};

// Animations and Effects
const Animations = {
    init: function() {
        this.initScrollAnimations();
        this.initCounterAnimations();
    },
    
    initScrollAnimations: function() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements with animation classes
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    },
    
    initCounterAnimations: function() {
        const counters = document.querySelectorAll('.rolling-number');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    },
    
    animateCounter: function(element) {
        const target = parseInt(element.getAttribute('data-target'), 10);
        const duration = 3000;
        let start = 0;
        let startTime = null;
        
        function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            const easeProgress = 1 - (1 - progress) * (1 - progress);
            const value = Math.floor(easeProgress * target);
            
            element.textContent = value;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target;
            }
        }
        
        requestAnimationFrame(animate);
    }
};

// Performance Optimization
const Performance = {
    init: function() {
        this.lazyLoadImages();
        this.optimizeScrollHandlers();
    },
    
    lazyLoadImages: function() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    },
    
    optimizeScrollHandlers: function() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    },
    
    handleScroll: function() {
        // Add scroll-based functionality here
        const scrollY = window.scrollY;
        const header = document.querySelector('.sticky-header');
        
        if (header) {
            if (scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }
};

// Accessibility Features
const Accessibility = {
    init: function() {
        this.addSkipLinks();
        this.improveKeyboardNavigation();
        this.addAriaLabels();
    },
    
    addSkipLinks: function() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #000;
            color: #fff;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    },
    
    improveKeyboardNavigation: function() {
        // Trap focus in modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const popup = document.querySelector('#email-popup');
                if (popup && popup.style.display === 'flex') {
                    this.trapFocus(e, popup);
                }
            }
        });
    },
    
    trapFocus: function(e, container) {
        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    },
    
    addAriaLabels: function() {
        // Add aria-labels to buttons without text
        document.querySelectorAll('button:not([aria-label])').forEach(button => {
            if (!button.textContent.trim()) {
                const icon = button.querySelector('svg, i');
                if (icon) {
                    button.setAttribute('aria-label', 'Button');
                }
            }
        });
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    MobileNav.init();
    Search.init();
    EmailPopup.init();
    FormValidation.init();
    Animations.init();
    Performance.init();
    Accessibility.init();
    
    console.log('STEMCity Labs website initialized successfully');
});

// Make functions globally available for inline event handlers
window.Search = Search;
window.STEMCityLabs = STEMCityLabs;
