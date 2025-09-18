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
            // Load configuration
            await this.loadConfig();
            
            // Detect and set initial language
            this.detectLanguage();
            
            // Initialize language switcher
            this.initLanguageSwitcher();
            
            // Load initial content
            await this.loadContent();
            
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
        let detectedLang = this.config.defaultLanguage;

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
            else if (this.config.autoDetect) {
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
                this.setLanguage(pathLang, false);
                this.loadContent();
            }
        });
    }

    async switchLanguage(targetLang) {
        if (!this.supportedLanguages.includes(targetLang)) {
            console.error(`Unsupported language: ${targetLang}`);
            return;
        }

        // Show loading state
        this.showLoadingState();

        try {
            // Set new language
            this.setLanguage(targetLang, true);
            
            // Update URL
            this.updateURL(targetLang);
            
            // Load new content
            await this.loadContent();
            
            // Update navigation
            this.updateNavigation();
            
            // Save preference
            this.setCookie(this.cookieName, targetLang, this.cookieExpiry);
            
            // Update page attributes
            this.updatePageAttributes();
            
            console.log(`Language switched to: ${targetLang}`);
        } catch (error) {
            console.error('Failed to switch language:', error);
            this.showError('Failed to load content in the selected language');
        } finally {
            this.hideLoadingState();
        }
    }

    setLanguage(lang, updateSwitcher = true) {
        this.currentLanguage = lang;
        
        if (updateSwitcher) {
            this.updateLanguageSwitcher();
        }
    }

    updateURL(lang) {
        const currentPath = window.location.pathname;
        const currentSegments = currentPath.split('/').filter(segment => segment);
        
        // Remove current language from path if present
        if (currentSegments.length > 0 && this.supportedLanguages.includes(currentSegments[0])) {
            currentSegments.shift();
        }
        
        // Add new language to path
        const newPath = `/${lang}/${currentSegments.join('/')}`;
        
        // Update URL without triggering page reload
        window.history.pushState({ language: lang }, '', newPath);
    }

    async loadContent() {
        const contentPlaceholder = document.getElementById('content-placeholder');
        if (!contentPlaceholder) return;

        try {
            // Determine content file based on current page and language
            const currentPage = this.getCurrentPage();
            const contentPath = this.getContentPath(currentPage, this.currentLanguage);
            
            // Load content
            const response = await fetch(contentPath);
            if (!response.ok) {
                throw new Error(`Failed to load content: ${response.status}`);
            }
            
            const content = await response.text();
            
            // Fade out current content
            contentPlaceholder.classList.add('content-fade-out');
            
            // Wait for fade out animation
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // Update content
            contentPlaceholder.innerHTML = content;
            
            // Fade in new content
            contentPlaceholder.classList.remove('content-fade-out');
            contentPlaceholder.classList.add('content-fade-in');
            
            // Clean up animation class
            setTimeout(() => {
                contentPlaceholder.classList.remove('content-fade-in');
            }, 300);
            
        } catch (error) {
            console.error('Failed to load content:', error);
            this.loadFallbackContent();
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

    getContentPath(page, lang) {
        // For now, return a placeholder path
        // In a real implementation, this would map to actual content files
        return `../shared/content/${lang}/${page}.html`;
    }

    async loadFallbackContent() {
        const contentPlaceholder = document.getElementById('content-placeholder');
        if (!contentPlaceholder) return;

        const fallbackContent = this.currentLanguage === 'zh' 
            ? '<p>内容加载失败，请刷新页面重试。</p>'
            : '<p>Failed to load content. Please refresh the page and try again.</p>';
            
        contentPlaceholder.innerHTML = fallbackContent;
    }

    updateNavigation() {
        if (!this.navigation || !this.navigation.navigation[this.currentLanguage]) return;

        const navData = this.navigation.navigation[this.currentLanguage];
        
        // Update menu title
        const menuTitle = document.querySelector('#menu h2');
        if (menuTitle) {
            menuTitle.textContent = navData.menu;
        }
        
        // Update menu items
        const menuItems = document.querySelectorAll('#menu ul li a');
        menuItems.forEach((item, index) => {
            if (navData.items[index]) {
                item.textContent = navData.items[index].label;
                // Update href to include language prefix
                const href = navData.items[index].url;
                item.href = href;
            }
        });
    }

    updatePageAttributes() {
        const html = document.documentElement;
        const body = document.body;
        
        // Update lang attribute
        html.setAttribute('lang', this.currentLanguage === 'zh' ? 'zh-CN' : 'en');
        
        // Update body class for language-specific styling
        body.classList.remove('chinese-layout');
        if (this.currentLanguage === 'zh') {
            body.classList.add('chinese-layout');
        }
        
        // Update page title
        this.updatePageTitle();
    }

    updatePageTitle() {
        const titleMap = {
            'en': {
                'index': 'Qingguang Zheng - Computational Psychology Researcher',
                'research': 'Research Portfolio - Qingguang Zheng',
                'skills': 'Technical Skills & Research Expertise - Qingguang Zheng',
                'personal': 'Personal Interests - Qingguang Zheng',
                'QAs': 'Frequently Asked Questions - Qingguang Zheng',
                'contact': 'Contact Me - Qingguang Zheng'
            },
            'zh': {
                'index': '郑庆广 - 计算心理学研究者',
                'research': '研究作品集 - 郑庆广',
                'skills': '技术技能与研究专长 - 郑庆广',
                'personal': '个人兴趣 - 郑庆广',
                'blog': '学术博客 - 郑庆广',
                'contact': '联系方式 - 郑庆广'
            }
        };
        
        const currentPage = this.getCurrentPage();
        const newTitle = titleMap[this.currentLanguage]?.[currentPage] || 
                        titleMap[this.currentLanguage]?.['index'] || 
                        document.title;
        
        document.title = newTitle;
    }

    showLoadingState() {
        const topControls = document.getElementById('top-controls');
        if (topControls) {
            topControls.classList.add('language-loading');
        }
    }

    hideLoadingState() {
        const topControls = document.getElementById('top-controls');
        if (topControls) {
            topControls.classList.remove('language-loading');
        }
    }

    showError(message) {
        // Simple error display - could be enhanced with a proper notification system
        console.error(message);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'language-error';
        errorDiv.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: #ff4444;
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            z-index: 1001;
            font-size: 0.9em;
            max-width: 300px;
        `;
        errorDiv.textContent = message;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
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