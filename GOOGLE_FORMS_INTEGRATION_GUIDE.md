# STEMCity Labs - Google Forms Integration Guide

## 🚀 Setting up Google Forms for Contact Form

### Step 1: Create a Google Form

1. **Go to Google Forms**: https://forms.google.com
2. **Click "Create a new form"** or use a template
3. **Add the following questions** (make sure to match the field names exactly):

#### Required Form Fields:
1. **Full Name** (Short answer) - Required
2. **Email Address** (Short answer) - Required  
3. **Phone Number** (Short answer) - Optional
4. **Organization/School** (Short answer) - Optional
5. **Subject** (Multiple choice) - Required
   - Options: General Inquiry, Partnership Opportunities, Volunteer Opportunities, Program Information, Funding/Donations, Media Inquiries, Other
6. **Message** (Paragraph) - Required
7. **Newsletter Subscription** (Multiple choice) - Optional
   - Options: Yes, No

### Step 2: Get Form Field IDs

1. **Open your Google Form**
2. **Click "Preview"** (eye icon)
3. **Right-click on the page** and select "View Page Source"
4. **Search for "entry." in the source code**
5. **Find the entry IDs** for each field:
   - Look for: `name="entry.XXXXXXXXX"`
   - Copy the numbers after "entry."

Example entry IDs you'll find:
```html
<input name="entry.123456789" ... > <!-- Full Name -->
<input name="entry.987654321" ... > <!-- Email -->
<input name="entry.456789123" ... > <!-- Phone -->
<!-- etc. -->
```

### Step 3: Configure the Website Integration

1. **Open `contact.html`** in your code editor
2. **Find the JavaScript section** around line 500
3. **Replace the placeholder entry IDs** with your actual form entry IDs:

```javascript
// Replace these with your actual Google Form entry IDs
formData.append('entry.123456789', document.getElementById('name').value);        // Full Name
formData.append('entry.987654321', document.getElementById('email').value);       // Email
formData.append('entry.456789123', document.getElementById('phone').value);       // Phone
formData.append('entry.789123456', document.getElementById('organization').value); // Organization
formData.append('entry.321654987', document.getElementById('subject').value);     // Subject
formData.append('entry.654987321', document.getElementById('message').value);     // Message
formData.append('entry.147258369', document.getElementById('newsletter').checked ? 'Yes' : 'No'); // Newsletter
```

4. **Get your Google Form URL**:
   - In your Google Form, click "Send"
   - Click the link icon
   - Copy the URL (it looks like: `https://docs.google.com/forms/d/e/1FAIpQLSc.../viewform`)
   - Replace `viewform` with `formResponse`

5. **Update the form URL** in the JavaScript:
```javascript
const googleFormURL = 'https://docs.google.com/forms/d/e/YOUR_ACTUAL_FORM_ID/formResponse';
```

### Step 4: Test the Integration

1. **Save your changes**
2. **Open the contact page** in a browser
3. **Fill out the form** and submit
4. **Check your Google Form responses** to see if the submission worked

### Step 5: Set up Response Notifications

1. **In your Google Form**, click "Responses"
2. **Click the three dots** menu
3. **Select "Get email notifications for new responses"**
4. **You'll get an email** every time someone submits the form

### Alternative: Easy Google Forms Setup

If the above seems complex, you can also:

1. **Create a simple redirect** to your Google Form
2. **Style the Google Form** to match your website
3. **Embed the Google Form** directly in your contact page

## 🔧 Current Implementation Status

✅ **JavaScript integration code added** to `contact.html`
🔄 **Needs configuration** with your actual Google Form IDs
⏳ **Ready to test** once configured

## 📋 What You Need to Do

1. **Create the Google Form** with the 7 fields listed above
2. **Get the entry IDs** from the form source code
3. **Replace the placeholder IDs** in `contact.html`
4. **Update the form URL** in the JavaScript
5. **Test the integration**

## 🎯 Benefits of Google Forms Integration

✅ **Free and reliable** - No hosting costs
✅ **Automatic data collection** - Responses saved to Google Sheets
✅ **Email notifications** - Get notified of new submissions
✅ **Data export** - Easy to download as CSV/Excel
✅ **Spam protection** - Built-in Google security
✅ **Mobile responsive** - Works on all devices

---

**Need help?** The integration is ready to go - just need to configure it with your Google Form details!
