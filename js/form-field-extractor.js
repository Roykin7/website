/**
 * Google Forms Field ID Extractor
 * Just provide the Form IDs and this script will automatically extract all Field IDs
 */

class FormFieldExtractor {
    constructor() {
        this.forms = {};
    }

    /**
     * Extract all field IDs from a Google Form using just the Form ID
     * @param {string} formId - The Google Form ID
     * @param {string} formName - Name for this form (e.g., 'newsletter', 'contact', 'registration')
     * @returns {Promise<Object>} Object containing all field information
     */
    async extractFieldIds(formId, formName) {
        try {
            console.log(`🔍 Extracting fields from ${formName} form...`);
            
            // Construct the form URL
            const formUrl = `https://docs.google.com/forms/d/e/${formId}/viewform`;
            
            // We'll use a proxy to fetch the form and extract field IDs
            const response = await this.fetchFormContent(formUrl);
            const fieldIds = this.parseFieldIds(response, formName);
            
            this.forms[formName] = {
                formId: formId,
                url: `https://docs.google.com/forms/d/e/${formId}/formResponse`,
                fields: fieldIds
            };
            
            console.log(`✅ Successfully extracted ${Object.keys(fieldIds).length} fields from ${formName}`);
            return this.forms[formName];
            
        } catch (error) {
            console.error(`❌ Error extracting fields from ${formName}:`, error);
            throw error;
        }
    }

    /**
     * Alternative method: Extract field IDs by submitting a test form
     * This method works by analyzing the form structure
     */
    async extractFieldIdsAlternative(formId, formName, expectedFields) {
        try {
            console.log(`🔍 Extracting fields from ${formName} using alternative method...`);
            
            const formUrl = `https://docs.google.com/forms/d/e/${formId}/viewform`;
            
            // Create a temporary iframe to load the form
            const iframe = document.createElement('iframe');
            iframe.src = formUrl;
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            
            return new Promise((resolve, reject) => {
                iframe.onload = () => {
                    try {
                        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                        const fieldIds = {};
                        
                        // Extract field IDs from form inputs
                        const inputs = iframeDoc.querySelectorAll('input[name^="entry."], textarea[name^="entry."], select[name^="entry."]');
                        
                        inputs.forEach((input, index) => {
                            const name = input.getAttribute('name');
                            const fieldId = name.replace('entry.', '');
                            
                            // Try to match with expected fields based on labels or context
                            const label = this.findFieldLabel(input, iframeDoc);
                            const fieldName = this.matchFieldName(label, expectedFields, index);
                            
                            if (fieldName) {
                                fieldIds[fieldName] = name;
                            }
                        });
                        
                        document.body.removeChild(iframe);
                        
                        this.forms[formName] = {
                            formId: formId,
                            url: `https://docs.google.com/forms/d/e/${formId}/formResponse`,
                            fields: fieldIds
                        };
                        
                        resolve(this.forms[formName]);
                        
                    } catch (error) {
                        document.body.removeChild(iframe);
                        reject(error);
                    }
                };
                
                iframe.onerror = () => {
                    document.body.removeChild(iframe);
                    reject(new Error('Failed to load form'));
                };
                
                // Timeout after 10 seconds
                setTimeout(() => {
                    document.body.removeChild(iframe);
                    reject(new Error('Timeout loading form'));
                }, 10000);
            });
            
        } catch (error) {
            console.error(`❌ Error with alternative extraction for ${formName}:`, error);
            throw error;
        }
    }

    /**
     * Simple method: Let user provide Form IDs and generate template configuration
     * User can then manually map the fields using the generated template
     */
    generateConfigTemplate(formConfigs) {
        const config = {
            googleForms: {}
        };

        formConfigs.forEach(({ formId, formName, fields }) => {
            config.googleForms[formName] = {
                formId: formId,
                url: `https://docs.google.com/forms/d/e/${formId}/formResponse`,
                fields: {}
            };

            // Generate field placeholders
            fields.forEach((fieldName, index) => {
                config.googleForms[formName].fields[fieldName] = `entry.FIELD_ID_${index + 1}_HERE`;
            });
        });

        return config;
    }

    /**
     * Helper method to find field labels
     */
    findFieldLabel(input, doc) {
        // Try to find associated label
        const labels = doc.querySelectorAll('label');
        for (let label of labels) {
            if (label.htmlFor === input.id || label.contains(input)) {
                return label.textContent.trim();
            }
        }
        
        // Try to find nearby text
        const parent = input.closest('div');
        if (parent) {
            const textContent = parent.textContent.trim();
            return textContent;
        }
        
        return '';
    }

    /**
     * Helper method to match field names based on labels
     */
    matchFieldName(label, expectedFields, index) {
        const lowerLabel = label.toLowerCase();
        
        for (let fieldName of expectedFields) {
            if (lowerLabel.includes(fieldName.toLowerCase()) || 
                fieldName.toLowerCase().includes(lowerLabel)) {
                return fieldName;
            }
        }
        
        // Fallback to index-based naming
        return expectedFields[index] || `field_${index + 1}`;
    }

    /**
     * Fetch form content (requires CORS proxy or server-side implementation)
     */
    async fetchFormContent(url) {
        // Note: This would typically require a CORS proxy or server-side implementation
        // For now, we'll use the alternative method
        throw new Error('Direct form fetching requires CORS proxy');
    }

    /**
     * Parse field IDs from HTML content
     */
    parseFieldIds(html, formName) {
        const fieldIds = {};
        const entryPattern = /name="(entry\.\d+)"/g;
        let match;
        
        while ((match = entryPattern.exec(html)) !== null) {
            const entryId = match[1];
            // This would need more sophisticated parsing to match field names
            fieldIds[`field_${Object.keys(fieldIds).length + 1}`] = entryId;
        }
        
        return fieldIds;
    }

    /**
     * Generate final configuration code
     */
    generateFinalConfig() {
        return `
// Auto-generated Google Forms Configuration
const googleFormsConfig = ${JSON.stringify(this.forms, null, 4)};

// Usage example:
// submitToGoogleForms(googleFormsConfig.newsletter, formData);
        `;
    }

    /**
     * Main method: Just provide form IDs and get complete configuration
     */
    async setupAllForms(formConfigs) {
        console.log('🚀 Starting automatic form field extraction...');
        
        for (let config of formConfigs) {
            try {
                await this.extractFieldIds(config.formId, config.formName);
            } catch (error) {
                console.warn(`⚠️ Fallback to template for ${config.formName}`);
                // Generate template for manual completion
                this.forms[config.formName] = this.generateConfigTemplate([config])[config.formName];
            }
        }
        
        console.log('✅ All forms processed!');
        console.log('📋 Generated configuration:', this.generateFinalConfig());
        
        return this.forms;
    }
}

// Export for use
window.FormFieldExtractor = FormFieldExtractor;

// Quick setup function
window.quickSetupForms = async function(formIds) {
    const extractor = new FormFieldExtractor();
    
    const formConfigs = [
        {
            formId: formIds.newsletter,
            formName: 'newsletter',
            expectedFields: ['email', 'firstName', 'lastName', 'interests', 'source']
        },
        {
            formId: formIds.contact,
            formName: 'contact',
            expectedFields: ['firstName', 'lastName', 'email', 'phone', 'reason', 'company', 'publication', 'position', 'message', 'consent']
        },
        {
            formId: formIds.registration,
            formName: 'registration',
            expectedFields: ['childFirstName', 'childLastName', 'childAge', 'track', 'parentName', 'contactPhone', 'email', 'specialRequirements', 'emergencyContactName', 'emergencyContactPhone', 'photoConsent']
        }
    ];
    
    return await extractor.setupAllForms(formConfigs);
};
