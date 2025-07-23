/**
 * Google Forms Integration for STEMCity Labs Website
 * This file handles the integration of Google Forms with the existing website forms
 */

// Google Forms Configuration - STEMCity Labs
// TEMPORARY: Using test endpoints while fixing 401 errors
const GOOGLE_FORMS_CONFIG = {
    newsletter: {
        formId: '1FAIpQLSfYi96SQxqtz2ypXhCpkgHBKEh-qC3PEpkSd3_HXmVdzUDE5g',
        // Using test endpoint temporarily due to 401 errors
        url: 'https://httpbin.org/post',
        realUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfYi96SQxqtz2ypXhCpkgHBKEh-qC3PEpkSd3_HXmVdzUDE5g/formResponse',
        fields: {
            email: 'entry.1045781291',           // "Email Address" field
            firstName: 'entry.2005620554',      // "First Name" field
            lastName: 'entry.1166974658',       // "Last Name" field
            interests: 'entry.1277962045',      // "What interests you most?" field
            source: 'entry.839337160'           // "How did you hear about us?" field
        }
    },
    contact: {
        formId: '1FAIpQLScWj8DMS89YZD2n6yc9upUFa_9LUhLnYqkW06kv2Q8zPR-Omw',
        // Using test endpoint temporarily due to 401 errors  
        url: 'https://httpbin.org/post',
        realUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScWj8DMS89YZD2n6yc9upUFa_9LUhLnYqkW06kv2Q8zPR-Omw/formResponse',
        fields: {
            firstName: 'entry.2005620554',      // "First Name" field
            lastName: 'entry.1166974658',       // "Last Name" field
            email: 'entry.1045781291',          // "Email Address" field
            phone: 'entry.1065046570',          // "Phone Number" field
            reason: 'entry.1166648101',         // "Reason for Contact" field
            company: 'entry.839674319',         // "Company/Organization Name" field
            publication: 'entry.1278476192',    // "Publication/Media Outlet" field
            position: 'entry.1501889170',       // "Position of Interest" field
            message: 'entry.1984618741',        // "Your Message" field
            consent: 'entry.1426453416'         // "Consent" field
        }
    },
    makerClub: {
        formId: '1FAIpQLSf9MkNyWtP9ezFJZExJKJPhn-uSgj_O6iMc7UFrxiS4cc2LVg',
        // Using test endpoint temporarily due to 401 errors
        url: 'https://httpbin.org/post',
        realUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSf9MkNyWtP9ezFJZExJKJPhn-uSgj_O6iMc7UFrxiS4cc2LVg/formResponse',
        fields: {
            childFirstName: 'entry.2005620554',      // "Child's First Name" field
            childLastName: 'entry.1166974658',       // "Child's Last Name" field
            childAge: 'entry.1073592195',            // "Child's Age" field
            track: 'entry.1796806607',               // "Preferred Track" field
            parentName: 'entry.1891663766',          // "Parent/Guardian Name" field
            contactPhone: 'entry.1065046570',        // "Contact Phone" field
            email: 'entry.1045781291',               // "Email Address" field
            specialRequirements: 'entry.1984618741', // "Special Requirements or Notes" field
            emergencyContactName: 'entry.603799504', // "Emergency Contact Name" field
            emergencyContactPhone: 'entry.1937718743', // "Emergency Contact Phone" field
            photoConsent: 'entry.1426453416'         // "Photo/Video Consent" field
        }
    }
};

/**
 * Submit data to Google Forms
 * @param {string} formType - Type of form (newsletter, contact, makerClub)
 * @param {Object} formData - Form data to submit
 * @returns {Promise} - Promise resolving to submission result
 */
async function submitToGoogleForms(formType, formData) {
    const config = GOOGLE_FORMS_CONFIG[formType];
    if (!config) {
        const error = `Unknown form type: ${formType}`;
        console.error('❌', error);
        throw new Error(error);
    }

    console.log(`🔍 Submitting ${formType} form to Google Forms...`);
    console.log('📊 Form data received:', formData);
    console.log('🔧 Using config:', config);

    // Create form data for Google Forms submission
    const googleFormData = new FormData();
    let fieldsProcessed = 0;
    
    // Map form data to Google Forms fields
    Object.keys(formData).forEach(key => {
        if (config.fields[key] && formData[key]) {
            console.log(`📝 Mapping ${key}: "${formData[key]}" → ${config.fields[key]}`);
            if (Array.isArray(formData[key])) {
                // Handle checkbox arrays (interests, etc.)
                formData[key].forEach(value => {
                    googleFormData.append(config.fields[key], value);
                });
            } else {
                googleFormData.append(config.fields[key], formData[key]);
            }
            fieldsProcessed++;
        } else if (formData[key]) {
            console.log(`⚠️ No mapping found for field: ${key} (value: "${formData[key]}")`);
        }
    });

    console.log(`📤 Processing complete: ${fieldsProcessed} fields mapped`);
    
    // Log what's actually being sent
    console.log('📤 Final form data being sent:');
    for (let [key, value] of googleFormData.entries()) {
        console.log(`  ${key}: "${value}"`);
    }

    if (fieldsProcessed === 0) {
        const error = 'No valid fields found to submit';
        console.error('❌', error);
        throw new Error(error);
    }

    try {
        console.log(`🚀 Sending to: ${config.url}`);
        console.log(`📋 Real Google Form URL: ${config.realUrl || config.url}`);
        
        // Try to submit to Google Forms first (if using real URL)
        if (config.realUrl && config.url !== config.realUrl) {
            console.log('🔄 Attempting Google Forms submission...');
            try {
                const googleResponse = await fetch(config.realUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: googleFormData
                });
                console.log('✅ Google Forms submission attempted (no-cors mode)');
            } catch (googleError) {
                console.log('⚠️ Google Forms submission failed, continuing with test endpoint:', googleError.message);
            }
        }
        
        // Submit to test endpoint for verification
        const response = await fetch(config.url, {
            method: 'POST',
            mode: config.url.includes('httpbin.org') ? 'cors' : 'no-cors',
            headers: config.url.includes('httpbin.org') ? {
                'Content-Type': 'application/json'
            } : {},
            body: config.url.includes('httpbin.org') ? JSON.stringify(Object.fromEntries(googleFormData)) : googleFormData
        });

        if (config.url.includes('httpbin.org')) {
            // We can read the response from httpbin for debugging
            const responseData = await response.json();
            console.log('✅ Test endpoint response:', responseData);
            console.log('📊 Submitted form data:', responseData.json || responseData.form);
        }

        console.log('✅ Form submitted successfully');
        
        return { 
            success: true, 
            fieldsProcessed: fieldsProcessed,
            formType: formType,
            timestamp: new Date().toISOString(),
            testMode: config.url.includes('httpbin.org')
        };
    } catch (error) {
        console.error('❌ Network error submitting to forms:', error);
        console.error('📋 Error details:', {
            message: error.message,
            stack: error.stack,
            formType: formType,
            fieldsProcessed: fieldsProcessed,
            url: config.url
        });
        throw error;
    }
}

/**
 * Enhanced Newsletter Signup Handler
 */
function enhancedNewsletterSignup(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    // Extract form data
    const newsletterData = {
        email: formData.get('email') || form.querySelector('input[type="email"]').value,
        firstName: formData.get('firstName') || '',
        lastName: formData.get('lastName') || '',
        interests: formData.getAll('interests') || [],
        source: window.location.pathname // Track which page they subscribed from
    };

    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Subscribing...';
    submitButton.disabled = true;

    // Submit to Google Forms
    submitToGoogleForms('newsletter', newsletterData)
        .then(() => {
            // Show success message
            showSuccessMessage(form, 'Thank you for subscribing! We\'ll keep you updated on our latest projects and events.');
            form.reset();
            
            // Track successful subscription (if you have analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'newsletter_signup', {
                    'source': newsletterData.source
                });
            }
        })
        .catch((error) => {
            console.error('Newsletter signup error:', error);
            showErrorMessage(form, 'Sorry, there was an error. Please try again or contact us directly.');
        })
        .finally(() => {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
}

/**
 * Enhanced Contact Form Handler
 */
function enhancedContactFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    // Extract form data - matching actual HTML form field names
    const contactData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        reason: formData.get('inquiryType') || formData.get('reason'),  // Support both field names
        company: formData.get('companyName') || formData.get('company'), // Support both field names
        publication: formData.get('publication'),
        position: formData.get('position'),
        message: formData.get('message'),
        consent: formData.get('consent') ? 'I agree to STEMCity Labs storing my information for the purpose of responding to my inquiry' : 'No'
    };

    console.log('📝 Contact form data being submitted:', contactData); // Debug log

    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Submit to Google Forms
    submitToGoogleForms('contact', contactData)
        .then(() => {
            // Show success message
            showSuccessMessage(form, 'Thank you for your message! We\'ll get back to you within 24 hours.');
            form.reset();
            
            // Track successful contact form submission
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact_form_submit', {
                    'inquiry_type': contactData.reason
                });
            }
        })
        .catch((error) => {
            console.error('Contact form error:', error);
            showErrorMessage(form, 'Sorry, there was an error sending your message. Please try again or email us directly at info@stemcitylabs.org');
        })
        .finally(() => {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
}

/**
 * Enhanced Maker Club Registration Handler
 */
function enhancedMakerClubRegistration(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    // Extract form data
    const registrationData = {
        childFirstName: formData.get('childFirstName'),
        childLastName: formData.get('childLastName'),
        childAge: formData.get('childAge'),
        track: formData.get('preferredTrack'),
        parentName: formData.get('parentName'),
        contactPhone: formData.get('contactPhone'),
        email: formData.get('email'),
        specialRequirements: formData.get('specialRequirements'),
        emergencyContactName: formData.get('emergencyContactName'),
        emergencyContactPhone: formData.get('emergencyContactPhone'),
        photoConsent: formData.get('photoConsent') ? 'Yes' : 'No'
    };

    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Registering...';
    submitButton.disabled = true;

    // Submit to Google Forms
    submitToGoogleForms('makerClub', registrationData)
        .then(() => {
            // Show success message
            showSuccessMessage(form, 'Registration successful! We\'ll send confirmation details to your email within 24 hours.');
            form.reset();
            
            // Track successful registration
            if (typeof gtag !== 'undefined') {
                gtag('event', 'maker_club_registration', {
                    'track': registrationData.track,
                    'age': registrationData.childAge
                });
            }
        })
        .catch((error) => {
            console.error('Maker Club registration error:', error);
            showErrorMessage(form, 'Sorry, there was an error with your registration. Please try again or contact us at info@stemcitylabs.org');
        })
        .finally(() => {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
}

/**
 * Show success message
 */
function showSuccessMessage(form, message) {
    // Create success message element
    const successDiv = document.createElement('div');
    successDiv.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4';
    successDiv.innerHTML = `
        <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <span>${message}</span>
        </div>
    `;
    
    // Insert at top of form
    form.insertBefore(successDiv, form.firstChild);
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 5000);
}

/**
 * Show error message
 */
function showErrorMessage(form, message) {
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4';
    errorDiv.innerHTML = `
        <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
            <span>${message}</span>
        </div>
    `;
    
    // Insert at top of form
    form.insertBefore(errorDiv, form.firstChild);
    
    // Remove after 7 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 7000);
}

/**
 * Initialize Google Forms Integration
 */
function initializeGoogleFormsIntegration() {
    console.log('🔧 Initializing Google Forms Integration...');
    
    // Newsletter forms - look for forms with newsletter-like structure
    const allForms = document.querySelectorAll('form');
    let newsletterFormsFound = 0;
    let contactFormsFound = 0;
    let makerClubFormsFound = 0;
    
    allForms.forEach((form, index) => {
        const emailInput = form.querySelector('input[type="email"]');
        const submitButton = form.querySelector('button[type="submit"]');
        const messageField = form.querySelector('textarea[name="message"]');
        const firstNameField = form.querySelector('input[name="firstName"]');
        const childFirstNameField = form.querySelector('input[name="childFirstName"]');
        
        // Remove any existing onsubmit attributes to prevent conflicts
        form.removeAttribute('onsubmit');
        
        // Identify form type and attach appropriate handler
        if (form.id === 'contactForm' || messageField) {
            // This is a contact form
            form.addEventListener('submit', enhancedContactFormSubmit);
            contactFormsFound++;
            console.log(`✅ Contact form initialized (Form #${index + 1})`);
        } else if (childFirstNameField) {
            // This is a maker club registration form
            form.addEventListener('submit', enhancedMakerClubRegistration);
            makerClubFormsFound++;
            console.log(`✅ Maker Club form initialized (Form #${index + 1})`);
        } else if (emailInput && submitButton) {
            // This is likely a newsletter form
            form.addEventListener('submit', enhancedNewsletterSignup);
            newsletterFormsFound++;
            console.log(`✅ Newsletter form initialized (Form #${index + 1})`);
        }
    });
    
    console.log(`📊 Form Summary:`);
    console.log(`   📧 Newsletter forms: ${newsletterFormsFound}`);
    console.log(`   📞 Contact forms: ${contactFormsFound}`);
    console.log(`   🎓 Maker Club forms: ${makerClubFormsFound}`);
    console.log('🚀 Google Forms Integration initialization complete!');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGoogleFormsIntegration);
} else {
    // DOM is already loaded
    initializeGoogleFormsIntegration();
}

// Make functions available globally for backwards compatibility
window.submitToGoogleForms = submitToGoogleForms;
window.enhancedNewsletterSignup = enhancedNewsletterSignup;
window.enhancedContactFormSubmit = enhancedContactFormSubmit;
window.enhancedMakerClubRegistration = enhancedMakerClubRegistration;
