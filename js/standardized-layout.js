// STEMCity Labs - Standardized Layout JavaScript

// Configuration for different pages
const PageConfig = {
    // Pages where popup should appear (only index.html for first-time visitors)
    popupPages: ['index.html'],
    
    // Pages where join community should be permanently visible (contact.html)
    permanentJoinPages: ['contact.html'],
    
    // Get current page name
    getCurrentPage: function() {
        const path = window.location.pathname;
        return path.split('/').pop() || 'index.html';
    },
    
    // Check if current page should show popup
    shouldShowPopup: function() {
        const currentPage = this.getCurrentPage();
        return this.popupPages.includes(currentPage);
    },
    
    // Check if current page should have permanent join community
    shouldShowPermanentJoin: function() {
        const currentPage = this.getCurrentPage();
        return this.permanentJoinPages.includes(currentPage);
    }
};

// Enhanced Email Popup Management
const StandardizedEmailPopup = {
    init: function() {
        this.createPopupHTML();
        this.bindEvents();
        
        // Only show popup on designated pages for first-time visitors
        if (PageConfig.shouldShowPopup() && !this.hasVisitedBefore()) {
            setTimeout(() => {
                this.showPopup();
            }, 3000); // 3 second delay
        }
        
        // Add permanent join community section for contact page
        if (PageConfig.shouldShowPermanentJoin()) {
            this.addPermanentJoinSection();
        }
    },
    
    createPopupHTML: function() {
        // Only create popup if it doesn't exist and should be shown
        if (!document.querySelector('#email-popup') && PageConfig.shouldShowPopup()) {
            const popupHTML = `
                <div id="email-popup" class="popup-overlay">
                    <div class="popup-content">
                        <button id="close-popup" class="popup-close">&times;</button>
                        <h3>Join Our Community</h3>
                        <p>Subscribe to our newsletter to stay informed about STEM education initiatives, events, and opportunities in Africa.</p>
                        <form id="popup-email-form" class="popup-form">
                            <input type="text" name="name" placeholder="Your Name" required>
                            <input type="email" name="email" placeholder="Your Email Address" required>
                            <button type="submit">Subscribe Now</button>
                        </form>
                        <p class="popup-disclaimer">We respect your privacy and will never share your information.</p>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', popupHTML);
        }
    },
    
    addPermanentJoinSection: function() {
        // Add join community section to contact page
        const contactContainer = document.querySelector('.contact-grid');
        if (contactContainer) {
            const joinSectionHTML = `
                <div class="join-community-section" style="grid-column: 1 / -1;">
                    <h3>Join Our Community</h3>
                    <p>Subscribe to our newsletter to stay informed about STEM education initiatives, events, and opportunities in Africa.</p>
                    <form id="contact-join-form" class="newsletter-form" style="max-width: 400px; margin: 0 auto;">
                        <input type="text" name="name" placeholder="Your Name" required>
                        <input type="email" name="email" placeholder="Your Email Address" required>
                        <button type="submit">Subscribe Now</button>
                    </form>
                    <p class="popup-disclaimer">We respect your privacy and will never share your information.</p>
                </div>
            `;
            contactContainer.insertAdjacentHTML('beforeend', joinSectionHTML);
        }
    },
    
    bindEvents: function() {
        // Close popup events
        document.addEventListener('click', (e) => {
            const closeButton = e.target.closest('#close-popup');
            const popup = e.target.closest('#email-popup');
            
            if (closeButton || (popup && e.target === popup)) {
                this.hidePopup();
            }
        });
        
        // Handle form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'popup-email-form' || 
                e.target.id === 'footer-email-form' || 
                e.target.id === 'contact-join-form') {
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
            this.markAsVisited();
        }
    },
    
    handleEmailSubmission: function(form) {
        const email = form.querySelector('input[type="email"]').value;
        const name = form.querySelector('input[name="name"]')?.value || 'Subscriber';
        
        // Simulate email submission
        console.log('Email subscription:', { email, name });
        
        // Show success message
        this.showSuccessMessage(form);
        
        // Hide popup if it was from popup form
        if (form.id === 'popup-email-form') {
            setTimeout(() => {
                this.hidePopup();
            }, 2000);
        }
    },
    
    showSuccessMessage: function(form) {
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        button.textContent = 'Subscribed!';
        button.style.background = '#4caf50';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            button.disabled = false;
            form.reset();
        }, 2000);
    },
    
    hasVisitedBefore: function() {
        return localStorage.getItem('stemcity-visited') === 'true';
    },
    
    markAsVisited: function() {
        localStorage.setItem('stemcity-visited', 'true');
    }
};

// Search functionality (from existing global.js)
const SearchManager = {
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
    
    init: function() {
        this.bindSearchEvents();
    },
    
    bindSearchEvents: function() {
        // Add search functionality if search toggle exists
        const searchToggle = document.querySelector('.search-toggle');
        if (searchToggle) {
            searchToggle.addEventListener('click', () => {
                this.toggleSearch();
            });
        }
    },
    
    toggleSearch: function() {
        // Simple search implementation - could be enhanced
        const query = prompt('Enter your search query:');
        if (query) {
            this.performSearch(query);
        }
    },
    
    performSearch: function(query) {
        const results = this.searchData.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.content.toLowerCase().includes(query.toLowerCase())
        );
        
        if (results.length > 0) {
            const result = results[0];
            window.location.href = result.url;
        } else {
            alert('No results found for: ' + query);
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    StandardizedEmailPopup.init();
    SearchManager.init();
});

// Global form submission handler for compatibility
function submitEmailForm(form) {
    const email = form.querySelector('input[type="email"]').value;
    const name = form.querySelector('input[name="name"]')?.value || 'Subscriber';
    
    console.log('Email subscription:', { email, name });
    
    // Show success message
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    
    button.textContent = 'Subscribed!';
    button.style.background = '#4caf50';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
        button.disabled = false;
        form.reset();
    }, 2000);
    
    return false; // Prevent form submission
}
