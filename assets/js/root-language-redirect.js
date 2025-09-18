/**
 * Root Language Redirect Script
 * Handles language detection and redirection for root-level access
 */

(function() {
    'use strict';
    
    // Configuration
    const config = {
        supportedLanguages: ['en', 'zh'],
        defaultLanguage: 'en',
        fallbackLanguage: 'en',
        cookieName: 'preferred_language',
        autoDetect: true
    };
    
    /**
     * Check if we're at the root level and need to redirect
     */
    function shouldRedirect() {
        const path = window.location.pathname;
        const segments = path.split('/').filter(segment => segment);
        
        // If we're at root or don't have a language prefix, we need to redirect
        return segments.length === 0 || !config.supportedLanguages.includes(segments[0]);
    }
    
    /**
     * Detect the best language for the user
     */
    function detectLanguage() {
        // Priority: Cookie > Browser preference > Default
        
        // 1. Check cookie preference
        const cookieValue = getCookie(config.cookieName);
        if (cookieValue && config.supportedLanguages.includes(cookieValue)) {
            return cookieValue;
        }
        
        // 2. Check browser preference (if auto-detect is enabled)
        if (config.autoDetect) {
            const browserLang = getBrowserLanguage();
            if (browserLang && config.supportedLanguages.includes(browserLang)) {
                return browserLang;
            }
        }
        
        // 3. Use default language
        return config.defaultLanguage;
    }
    
    /**
     * Get browser language preference
     */
    function getBrowserLanguage() {
        const languages = [];
        
        // Modern browsers
        if (navigator.languages) {
            languages.push(...navigator.languages);
        }
        
        // Fallback for older browsers
        if (navigator.language) {
            languages.push(navigator.language);
        }
        
        if (navigator.userLanguage) {
            languages.push(navigator.userLanguage);
        }
        
        // Check each language preference
        for (const lang of languages) {
            const langCode = lang.toLowerCase().split('-')[0];
            if (config.supportedLanguages.includes(langCode)) {
                return langCode;
            }
        }
        
        return null;
    }
    
    /**
     * Get cookie value
     */
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    
    /**
     * Perform the language redirect
     */
    function performRedirect() {
        const detectedLang = detectLanguage();
        const currentPath = window.location.pathname;
        const search = window.location.search;
        const hash = window.location.hash;
        
        // Build new URL
        let newPath;
        if (currentPath === '/' || currentPath === '') {
            newPath = `/${detectedLang}/`;
        } else {
            // Remove leading slash and add language prefix
            const cleanPath = currentPath.replace(/^\/+/, '');
            newPath = `/${detectedLang}/${cleanPath}`;
        }
        
        const newUrl = newPath + search + hash;
        
        console.log(`Redirecting to: ${newUrl} (detected language: ${detectedLang})`);
        
        // Perform redirect
        window.location.replace(newUrl);
    }
    
    /**
     * Initialize redirect logic
     */
    function init() {
        // Only redirect if we're at root level or missing language prefix
        if (shouldRedirect()) {
            performRedirect();
        }
    }
    
    // Run immediately (don't wait for DOM ready for redirects)
    init();
    
})();