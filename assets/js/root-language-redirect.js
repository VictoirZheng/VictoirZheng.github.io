/**
 * Root Language Redirect Script
 * Enhanced language detection and redirection for multilingual website
 * 
 * This script is now integrated directly into index.html for better performance
 * and user experience. This file is kept for reference and potential future use.
 */

(function() {
    'use strict';
    
    // Configuration
    const config = {
        supportedLanguages: ['en', 'zh'],
        defaultLanguage: 'en',
        cookieName: 'preferred_language',
        autoRedirectDelay: 2000,
        enableAutoRedirect: true
    };
    
    /**
     * Set language preference cookie
     */
    function setLanguagePreference(lang) {
        if (config.supportedLanguages.includes(lang)) {
            setCookie(config.cookieName, lang, 365);
        }
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
     * Set cookie
     */
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
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
        
        // 2. Check browser preference
        const browserLang = getBrowserLanguage();
        if (browserLang && config.supportedLanguages.includes(browserLang)) {
            return browserLang;
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
     * Perform the language redirect
     */
    function performRedirect() {
        const detectedLang = detectLanguage();
        const targetUrl = `/${detectedLang}/`;
        
        console.log(`Redirecting to: ${targetUrl} (detected language: ${detectedLang})`);
        
        // Perform redirect
        window.location.href = targetUrl;
    }
    
    /**
     * Initialize redirect logic
     * Note: This script is now primarily used for reference.
     * The actual redirect logic is embedded in index.html for better performance.
     */
    function init() {
        const path = window.location.pathname;
        
        // Only redirect from exact root path
        if (path === '/' || path === '') {
            if (config.enableAutoRedirect) {
                setTimeout(performRedirect, config.autoRedirectDelay);
            }
        }
    }
    
    /**
     * Make functions available globally
     */
    window.LanguageRedirect = {
        setLanguagePreference: setLanguagePreference,
        detectLanguage: detectLanguage,
        performRedirect: performRedirect
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();