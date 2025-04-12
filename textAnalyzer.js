// Text Analysis Tool - Integrated with your website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize event listeners
    const analyzeBtn = document.getElementById('analyze-btn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', analyzeText);
    }
    
    // Check for URL parameters - useful if someone wants to share analysis
    checkUrlParams();
});

// Function to check URL parameters
function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const sampleText = urlParams.get('sample');
    
    if (sampleText === 'demo') {
        // Load a demo text for first-time users
        fetch('assets/demo-text.txt')
            .then(response => response.text())
            .then(text => {
                document.getElementById('text-input').value = text;
            })
            .catch(error => {
                console.error('Error loading demo text:', error);
            });
    }
}

// Main function to analyze the text
function analyzeText() {
    const textInput = document.getElementById('text-input').value;
    
    // Check if text has enough words
    const wordCount = countWords(textInput);
    if (wordCount <= 10000) {
        alert(`Please enter at least 10000 words. Current count: ${wordCount}`);
        return;
    }
    
    // Show loading state
    showLoading();
    
    // Use setTimeout to allow UI to update before heavy processing
    setTimeout(() => {
        // Perform analysis
        analyzeCharacters(textInput);
        analyzePronouns(textInput);
        analyzePrepositions(textInput);
        analyzeArticles(textInput);
        
        // Hide loading state
        hideLoading();
        
        // Scroll to results
        document.querySelector('.results-container').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }, 100);
}

// Show loading state
function showLoading() {
    const analyzeBtn = document.getElementById('analyze-btn');
    analyzeBtn.disabled = true;
    analyzeBtn.textContent = 'Analyzing...';
    analyzeBtn.style.opacity = '0.7';
    
    // Clear previous results
    document.getElementById('character-stats').innerHTML = '<div class="loading">Processing...</div>';
    document.getElementById('pronouns-stats').innerHTML = '';
    document.getElementById('prepositions-stats').innerHTML = '';
    document.getElementById('articles-stats').innerHTML = '';
}

// Hide loading state
function hideLoading() {
    const analyzeBtn = document.getElementById('analyze-btn');
    analyzeBtn.disabled = false;
    analyzeBtn.textContent = 'Analyze Text';
    analyzeBtn.style.opacity = '1';
}

// Function to count words
function countWords(text) {
    return text.trim().split(/\s+/).length;
}

// Function to analyze characters, words, spaces, newlines, and special symbols
function analyzeCharacters(text) {
    const charCount = text.length;
    const letterCount = (text.match(/[a-zA-Z]/g) || []).length;
    const wordCount = countWords(text);
    const spaceCount = (text.match(/\s/g) || []).length;
    const newlineCount = (text.match(/\n/g) || []).length;
    const specialSymbolCount = (text.match(/[^\w\s]/g) || []).length;
    
    document.getElementById('character-stats').innerHTML = `
        <h4>Basic Text Statistics</h4>
        <ul>
            <li>Total Characters: <span class="count">${charCount.toLocaleString()}</span></li>
            <li>Letters: <span class="count">${letterCount.toLocaleString()}</span></li>
            <li>Words: <span class="count">${wordCount.toLocaleString()}</span></li>
            <li>Spaces: <span class="count">${spaceCount.toLocaleString()}</span></li>
            <li>Newlines: <span class="count">${newlineCount.toLocaleString()}</span></li>
            <li>Special Symbols: <span class="count">${specialSymbolCount.toLocaleString()}</span></li>
        </ul>
    `;
    
    console.log("Character Stats:", {
        totalChars: charCount,
        letters: letterCount,
        words: wordCount,
        spaces: spaceCount,
        newlines: newlineCount,
        specialSymbols: specialSymbolCount
    });
}

// Function to analyze pronouns
function analyzePronouns(text) {
    const pronouns = {
        personal: ['i', 'me', 'my', 'mine', 'myself', 'you', 'your', 'yours', 'yourself', 
                  'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 
                  'it', 'its', 'itself', 'we', 'us', 'our', 'ours', 'ourselves', 
                  'they', 'them', 'their', 'theirs', 'themselves'],
        interrogative: ['who', 'whom', 'whose', 'which', 'what'],
        relative: ['that', 'which', 'who', 'whom', 'whose'],
        demonstrative: ['this', 'that', 'these', 'those'],
        indefinite: ['anybody', 'anyone', 'anything', 'each', 'either', 'everybody', 
                    'everyone', 'everything', 'neither', 'nobody', 'none', 'nothing', 
                    'one', 'somebody', 'someone', 'something', 'both', 'few', 'many', 
                    'several', 'all', 'any', 'most', 'some']
    };
    
    // Convert to lowercase and tokenize
    const tokens = text.toLowerCase().match(/\b\w+\b/g) || [];
    
    // Count pronouns by category
    const pronounCounts = {};
    let totalCount = 0;
    
    for (const category in pronouns) {
        pronounCounts[category] = {};
        
        for (const pronoun of pronouns[category]) {
            const count = tokens.filter(token => token === pronoun).length;
            if (count > 0) {
                pronounCounts[category][pronoun] = count;
                totalCount += count;
            }
        }
    }
    
    // Display results
    let html = `<h4>Pronoun Analysis (Total: ${totalCount.toLocaleString()})</h4>`;
    
    for (const category in pronounCounts) {
        const categoryPronouns = pronounCounts[category];
        const categoryEntries = Object.entries(categoryPronouns);
        
        if (categoryEntries.length > 0) {
            html += `<p><strong>${capitalize(category)} Pronouns:</strong></p><ul>`;
            
            categoryEntries.sort((a, b) => b[1] - a[1]).forEach(([pronoun, count]) => {
                html += `<li>"${pronoun}" <span class="count">${count.toLocaleString()}</span></li>`;
            });
            
            html += `</ul>`;
        }
    }
    
    document.getElementById('pronouns-stats').innerHTML = html;
}

// Function to analyze prepositions
function analyzePrepositions(text) {
    const prepositions = [
        'about', 'above', 'across', 'after', 'against', 'along', 'amid', 'among', 
        'around', 'as', 'at', 'before', 'behind', 'below', 'beneath', 'beside', 
        'between', 'beyond', 'by', 'despite', 'down', 'during', 'except', 'for', 
        'from', 'in', 'inside', 'into', 'like', 'near', 'of', 'off', 'on', 'onto', 
        'out', 'outside', 'over', 'past', 'regarding', 'round', 'since', 'through', 
        'throughout', 'to', 'toward', 'towards', 'under', 'underneath', 'until', 
        'unto', 'up', 'upon', 'with', 'within', 'without'
    ];
    
    // Convert to lowercase and tokenize
    const tokens = text.toLowerCase().match(/\b\w+\b/g) || [];
    
    // Count prepositions
    const prepositionCounts = {};
    let totalCount = 0;
    
    prepositions.forEach(prep => {
        const count = tokens.filter(token => token === prep).length;
        if (count > 0) {
            prepositionCounts[prep] = count;
            totalCount += count;
        }
    });
    
    // Sort by frequency (highest first)
    const sortedPrepositions = Object.entries(prepositionCounts)
        .sort((a, b) => b[1] - a[1]);
    
    // Display results
    let html = `<h4>Preposition Analysis (Total: ${totalCount.toLocaleString()})</h4><ul>`;
    
    sortedPrepositions.forEach(([prep, count]) => {
        html += `<li>"${prep}" <span class="count">${count.toLocaleString()}</span></li>`;
    });
    
    html += `</ul>`;
    document.getElementById('prepositions-stats').innerHTML = html;
}

// Function to analyze articles
function analyzeArticles(text) {
    const indefiniteArticles = ['a', 'an'];
    const definiteArticles = ['the'];
    const allArticles = [...indefiniteArticles, ...definiteArticles];
    
    // Convert to lowercase and tokenize
    const tokens = text.toLowerCase().match(/\b\w+\b/g) || [];
    
    // Count articles
    const articleCounts = {};
    const articleTypes = {
        indefinite: 0,
        definite: 0
    };
    
    allArticles.forEach(article => {
        const count = tokens.filter(token => token === article).length;
        if (count > 0) {
            articleCounts[article] = count;
            
            if (indefiniteArticles.includes(article)) {
                articleTypes.indefinite += count;
            } else {
                articleTypes.definite += count;
            }
        }
    });
    
    // Display results
    const totalIndefinite = articleTypes.indefinite;
    const totalDefinite = articleTypes.definite;
    const totalCount = totalIndefinite + totalDefinite;
    
    let html = `
        <h4>Article Analysis (Total: ${totalCount.toLocaleString()})</h4>
        <p><strong>Indefinite Articles (${totalIndefinite.toLocaleString()}):</strong></p>
        <ul>
    `;
    
    indefiniteArticles.forEach(article => {
        const count = articleCounts[article] || 0;
        if (count > 0) {
            html += `<li>"${article}" <span class="count">${count.toLocaleString()}</span></li>`;
        }
    });
    
    html += `
        </ul>
        <p><strong>Definite Articles (${totalDefinite.toLocaleString()}):</strong></p>
        <ul>
    `;
    
    definiteArticles.forEach(article => {
        const count = articleCounts[article] || 0;
        if (count > 0) {
            html += `<li>"${article}" <span class="count">${count.toLocaleString()}</span></li>`;
        }
    });
    
    html += `</ul>`;
    document.getElementById('articles-stats').innerHTML = html;
}

// Helper function to capitalize first letter
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
// Add at the bottom of the file
document.addEventListener("DOMContentLoaded", function() {
    // Animation observer for text analyzer elements
    const analyzerElements = [
        document.querySelector('.analyzer-container'),
        document.querySelector('.analyzer-header'),
        document.querySelector('.analyzer-input-container'),
        document.querySelector('.results-container')
    ];

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    analyzerElements.forEach(element => {
        if (element) observer.observe(element);
    });

    // Animate results when they appear
    const resultsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                resultsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observe dynamic results
    document.querySelectorAll('.stats-section').forEach(section => {
        resultsObserver.observe(section);
    });
});