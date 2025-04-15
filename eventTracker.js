(function() {

    document.addEventListener('DOMContentLoaded', function() {
        logEvent('view', document.title, 'Page loaded');
        
        document.addEventListener('click', function(event) {
            const clickedElement = event.target;
            
            let elementType = determineElementType(clickedElement);
            
            logEvent('click', elementType, clickedElement.outerHTML.slice(0, 50) + (clickedElement.outerHTML.length > 50 ? '...' : ''));
        });
    });
    
    function logEvent(eventType, objectType, objectInfo) {
        const timestamp = new Date().toISOString();
        console.log(`${timestamp} , ${eventType} , ${objectType}`);
    }
    
    function determineElementType(element) {
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
            return element.tagName.toLowerCase();
        }
    }
})();