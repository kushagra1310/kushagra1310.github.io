// Event Tracker for GitHub.io Page
(function() {
    // Initialize tracking on page load
    document.addEventListener('DOMContentLoaded', function() {
        // Log page view on initial load
        logEvent('view', document.title, 'Page loaded');
        
        // Set up click event listener for the entire document
        document.addEventListener('click', function(event) {
            // Get the clicked element
            const clickedElement = event.target;
            
            // Determine the type of element that was clicked
            let elementType = determineElementType(clickedElement);
            
            // Log the click event
            logEvent('click', elementType, clickedElement.outerHTML.slice(0, 50) + (clickedElement.outerHTML.length > 50 ? '...' : ''));
        });
    });
    
    // Function to log events with timestamp, type, and object info
    function logEvent(eventType, objectType, objectInfo) {
        const timestamp = new Date().toISOString();
        console.log(`${timestamp} , ${eventType} , ${objectType}`);
    }
    
    // Function to determine the type of element
    function determineElementType(element) {
        // Check for common interactive elements
        if (element.tagName === 'SELECT' || element.classList.contains('dropdown')) {
            return 'drop-down';
        } else if (element.tagName === 'IMG' || element.tagName === 'SVG') {
            return 'image';
        } else if (element.tagName === 'INPUT' && element.type === 'text' || 
                   element.tagName === 'TEXTAREA') {
            return 'text input';
        } else if (element.tagName === 'BUTTON' || 
                  (element.tagName === 'INPUT' && 
                  (element.type === 'submit' || element.type === 'button'))) {
            return 'button';
        } else if (element.tagName === 'A') {
            return 'link';
        } else if (element.tagName === 'LI' || element.tagName === 'UL' || element.tagName === 'OL') {
            return 'list element';
        } else if (element.tagName === 'DIV' || element.tagName === 'SECTION') {
            // Try to determine if this is a card or container
            if (element.classList.contains('card') || 
                element.classList.contains('container') || 
                element.classList.contains('skill-item')) {
                return 'container';
            }
            return 'div';
        } else if (element.tagName === 'P') {
            return 'paragraph';
        } else if (element.tagName === 'H1' || element.tagName === 'H2' || 
                   element.tagName === 'H3' || element.tagName === 'H4' || 
                   element.tagName === 'H5' || element.tagName === 'H6') {
            return 'heading';
        } else if (element.tagName === 'SPAN' || element.tagName === 'STRONG' || 
                   element.tagName === 'EM' || element.tagName === 'B' || 
                   element.tagName === 'I') {
            return 'text element';
        } else {
            // If it's something else, just return the tag name
            return element.tagName.toLowerCase();
        }
    }
})();