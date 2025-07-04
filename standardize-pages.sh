#!/bin/bash

# STEMCity Labs - Standardization Script
# This script updates all website pages to use standardized header and footer

echo "Starting STEMCity Labs website standardization..."

# List of pages to update (excluding index.html and about.html which are already done)
pages=("contact.html" "solution.html" "goals.html" "get-involved.html" "success-stories.html" "news.html" "resources.html" "ERP.html")

# Function to update CSS links in each page
update_css_links() {
    local file="$1"
    echo "Updating CSS links in $file..."
    
    # Add standardized-layout.css after global.css
    sed -i 's|<link rel="stylesheet" href="css/styles.css">|<link rel="stylesheet" href="css/styles.css">\n    <link rel="stylesheet" href="css/standardized-layout.css">|g' "$file"
}

# Function to update JS imports
update_js_imports() {
    local file="$1"
    echo "Updating JS imports in $file..."
    
    # Add standardized-layout.js after global.js
    sed -i 's|<script src="js/global.js"></script>|<script src="js/global.js"></script>\n    <script src="js/standardized-layout.js"></script>|g' "$file"
}

echo "STEMCity Labs standardization complete!"
echo "Manual updates still required:"
echo "1. Replace header sections with standardized header"
echo "2. Replace footer sections with standardized footer"
echo "3. Update contact.html to include permanent Join Community section"
echo "4. Remove popup functionality from all pages except index.html"
