/**
 * Multilingual Architecture JavaScript
 * Handles language switching, content loading, and user preferences
 */

class MultilingualManager {
    constructor() {
        this.currentLanguage = 'en';
        this.supportedLanguages = ['en', 'zh'];
        this.config = null;
        this.navigation = null;
        this.cookieName = 'preferred_language';
        this.cookieExpiry = 365;
        
        this.init();
    }

    async init() {
        try {
            // Load configuration (with fallback)
            await this.loadConfig().catch(() => {
                console.warn('Failed to load config, using defaults');
                this.config = { defaultLanguage: 'en' };
            });
            
            // Detect and set initial language
            this.detectLanguage();
            
            // Initialize language switcher
            this.initLanguageSwitcher();
            
            // Set up event listeners
            this.setupEventListeners();
            
            console.log('Multilingual system initialized successfully');
        } catch (error) {
            console.error('Failed to initialize multilingual system:', error);
            this.fallbackToDefault();
        }
    }

    async loadConfig() {
        try {
            const [configResponse, navResponse] = await Promise.all([
                fetch('../shared/config/languages.json'),
                fetch('../shared/data/navigation.json')
            ]);
            
            this.config = await configResponse.json();
            this.navigation = await navResponse.json();
            
            this.supportedLanguages = this.config.supportedLanguages || ['en', 'zh'];
            this.cookieName = this.config.cookieName || 'preferred_language';
            this.cookieExpiry = this.config.cookieExpiry || 365;
        } catch (error) {
            console.error('Failed to load configuration:', error);
            throw error;
        }
    }

    detectLanguage() {
        // Priority order: URL path > Cookie > Browser preference > Default
        let detectedLang = (this.config && this.config.defaultLanguage) || 'en';

        // 1. Check URL path
        const pathLang = this.getLanguageFromPath();
        if (pathLang && this.supportedLanguages.includes(pathLang)) {
            detectedLang = pathLang;
        }
        // 2. Check cookie
        else {
            const cookieLang = this.getCookie(this.cookieName);
            if (cookieLang && this.supportedLanguages.includes(cookieLang)) {
                detectedLang = cookieLang;
            }
            // 3. Check browser preference
            else if (this.config && this.config.autoDetect) {
                const browserLang = this.getBrowserLanguage();
                if (browserLang && this.supportedLanguages.includes(browserLang)) {
                    detectedLang = browserLang;
                }
            }
        }

        this.setLanguage(detectedLang, false);
    }

    getLanguageFromPath() {
        const path = window.location.pathname;
        const pathSegments = path.split('/').filter(segment => segment);
        
        if (pathSegments.length > 0) {
            const firstSegment = pathSegments[0];
            if (this.supportedLanguages.includes(firstSegment)) {
                return firstSegment;
            }
        }
        
        return null;
    }

    getBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0];
        return langCode;
    }

    initLanguageSwitcher() {
        const switcher = document.getElementById('language-switcher');
        if (!switcher) return;

        // Update active state
        this.updateLanguageSwitcher();
        
        // Initialize menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) {
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }

    updateLanguageSwitcher() {
        const toggles = document.querySelectorAll('.lang-toggle');
        toggles.forEach(toggle => {
            const lang = toggle.getAttribute('data-lang');
            if (lang === this.currentLanguage) {
                toggle.classList.add('active');
                toggle.setAttribute('aria-pressed', 'true');
            } else {
                toggle.classList.remove('active');
                toggle.setAttribute('aria-pressed', 'false');
            }
        });
    }

    toggleMenu() {
        // Use the existing menu system from the main theme
        const body = document.body;
        const menu = document.getElementById('menu');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (body.classList.contains('menu-visible')) {
            body.classList.remove('menu-visible');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        } else {
            body.classList.add('menu-visible');
            menuToggle.classList.add('active');
            menuToggle.setAttribute('aria-expanded', 'true');
        }
    }

    setupEventListeners() {
        // Language switcher clicks
        document.addEventListener('click', (e) => {
            const langToggle = e.target.closest('.lang-toggle');
            if (langToggle) {
                e.preventDefault();
                const targetLang = langToggle.getAttribute('data-lang');
                if (targetLang && targetLang !== this.currentLanguage) {
                    this.switchLanguage(targetLang);
                }
            }
            
            // Menu toggle clicks
            const menuToggle = e.target.closest('.menu-toggle');
            if (menuToggle) {
                e.preventDefault();
                this.toggleMenu();
            }
        });

        // Keyboard navigation for language switcher
        document.addEventListener('keydown', (e) => {
            const langToggle = e.target.closest('.lang-toggle');
            if (langToggle && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                langToggle.click();
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            const pathLang = this.getLanguageFromPath();
            if (pathLang && pathLang !== this.currentLanguage) {
                this.setLanguage(pathLang, true);
            }
        });
    }

    async switchLanguage(targetLang) {
        if (!this.supportedLanguages.includes(targetLang)) {
            console.error(`Unsupported language: ${targetLang}`);
            return;
        }

        // Save preference before redirecting
        this.setCookie(this.cookieName, targetLang, this.cookieExpiry);
        
        // Get current page name
        const currentPage = this.getCurrentPage();
        
        // Build target URL
        const targetURL = this.buildLanguageURL(targetLang, currentPage);
        
        console.log(`Redirecting to: ${targetURL}`);
        
        // Redirect to the target language page
        window.location.href = targetURL;
    }

    setLanguage(lang, updateSwitcher = true) {
        this.currentLanguage = lang;
        
        if (updateSwitcher) {
            this.updateLanguageSwitcher();
        }
    }



    getCurrentPage() {
        const path = window.location.pathname;
        const segments = path.split('/').filter(segment => segment);
        
        // Remove language segment if present
        if (segments.length > 0 && this.supportedLanguages.includes(segments[0])) {
            segments.shift();
        }
        
        // Get page name or default to index
        const pageName = segments.length > 0 ? segments[segments.length - 1] : 'index.html';
        return pageName.replace('.html', '');
    }

    buildLanguageURL(targetLang, currentPage) {
        // Get the base path (everything before the language segment)
        const currentPath = window.location.pathname;
        const pathSegments = currentPath.split('/').filter(segment => segment);
        
        // Remove language segment if present
        if (pathSegments.length > 0 && this.supportedLanguages.includes(pathSegments[0])) {
            pathSegments.shift();
        }
        
        // Build the new URL
        let newPath;
        if (currentPage === 'index' || currentPage === '' || pathSegments.length === 0) {
            newPath = `/${targetLang}/`;
        } else {
            newPath = `/${targetLang}/${currentPage}.html`;
        }
        
        // Return the full URL with protocol and host for proper redirection
        return window.location.origin + newPath;
    }





    fallbackToDefault() {
        console.log('Falling back to default language');
        this.currentLanguage = 'en';
        this.updateLanguageSwitcher();
        this.updatePageAttributes();
    }

    // Utility methods for cookie management
    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Public API methods
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    getSupportedLanguages() {
        return [...this.supportedLanguages];
    }

    isLanguageSupported(lang) {
        return this.supportedLanguages.includes(lang);
    }
}

// Initialize multilingual system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.multilingualManager = new MultilingualManager();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MultilingualManager;
}