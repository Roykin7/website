/**
 * Google Forms Setup Instructions for STEMCity Labs
 * 
 * The current forms are getting 401 errors, which means they need to be properly configured.
 * Here's how to fix this:
 */

// STEP 1: Create new Google Forms (or fix existing ones)

// For Newsletter Form:
// 1. Go to https://forms.google.com
// 2. Create a new form titled "STEMCity Labs Newsletter Signup"
// 3. Add these questions:
//    - Email Address (Email type, required)
//    - First Name (Short answer, optional)
//    - Last Name (Short answer, optional)
//    - What interests you most? (Multiple choice, optional)
//    - How did you hear about us? (Short answer, optional)
// 4. Go to Settings (gear icon) > Responses
// 5. Make sure "Collect email addresses" is UNCHECKED (unless you want it)
// 6. Make sure the form accepts responses

// For Contact Form:
// 1. Create a new form titled "STEMCity Labs Contact Form"
// 2. Add these questions:
//    - First Name (Short answer, required)
//    - Last Name (Short answer, required)
//    - Email Address (Email type, required)
//    - Phone Number (Short answer, optional)
//    - Reason for Contact (Dropdown with options: General Inquiry, Partnership, Media, etc.)
//    - Company/Organization (Short answer, optional)
//    - Your Message (Paragraph, required)
//    - Privacy Consent (Multiple choice: "I agree to the privacy policy")

// STEP 2: Get the correct form URLs and entry IDs
// For each form:
// 1. Click "Send" button
// 2. Click the link icon (<>)
// 3. Copy the form URL (this gives you the form ID)
// 4. To get entry IDs: View page source and search for "entry." to find field IDs

// STEP 3: Test the forms manually first
// Before integrating, manually submit each form to make sure they work

// STEP 4: Use this temporary configuration for testing:

const TEST_GOOGLE_FORMS_CONFIG = {
    newsletter: {
        // Replace with your actual form ID when ready
        formId: 'YOUR_NEWSLETTER_FORM_ID_HERE',
        url: 'https://docs.google.com/forms/d/e/YOUR_NEWSLETTER_FORM_ID_HERE/formResponse',
        fields: {
            email: 'entry.REPLACE_WITH_ACTUAL_ID',
            firstName: 'entry.REPLACE_WITH_ACTUAL_ID',
            lastName: 'entry.REPLACE_WITH_ACTUAL_ID',
            interests: 'entry.REPLACE_WITH_ACTUAL_ID',
            source: 'entry.REPLACE_WITH_ACTUAL_ID'
        }
    },
    contact: {
        // Replace with your actual form ID when ready
        formId: 'YOUR_CONTACT_FORM_ID_HERE',
        url: 'https://docs.google.com/forms/d/e/YOUR_CONTACT_FORM_ID_HERE/formResponse',
        fields: {
            firstName: 'entry.REPLACE_WITH_ACTUAL_ID',
            lastName: 'entry.REPLACE_WITH_ACTUAL_ID',
            email: 'entry.REPLACE_WITH_ACTUAL_ID',
            phone: 'entry.REPLACE_WITH_ACTUAL_ID',
            reason: 'entry.REPLACE_WITH_ACTUAL_ID',
            company: 'entry.REPLACE_WITH_ACTUAL_ID',
            message: 'entry.REPLACE_WITH_ACTUAL_ID',
            consent: 'entry.REPLACE_WITH_ACTUAL_ID'
        }
    }
};

// STEP 5: Common issues and solutions:

// Issue: 401 Unauthorized
// Solution: Make sure the form is set to accept responses and is not restricted

// Issue: 404 Not Found  
// Solution: Double-check the form ID in the URL

// Issue: CORS errors
// Solution: This is normal with mode: 'no-cors', ignore these in console

// Issue: Fields not appearing in responses
// Solution: Check that the entry IDs match exactly (case-sensitive)

// QUICK FIX: Use a working demo form for testing
// Replace the current config with this working example:

const WORKING_DEMO_CONFIG = {
    newsletter: {
        // This is a publicly accessible demo form for testing
        formId: '1FAIpQLSf_demo_form_for_testing',
        url: 'https://httpbin.org/post', // Test endpoint that accepts any POST data
        fields: {
            email: 'email',
            firstName: 'firstName',
            lastName: 'lastName'
        }
    }
};

export { TEST_GOOGLE_FORMS_CONFIG, WORKING_DEMO_CONFIG };
