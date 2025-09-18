/**
 * Multilingual Architecture Initialization
 * Enhanced integration of language detection and multilingual management
 */

class MultilingualInit {
    constructor() {
        this.detector = null;
        this.manager = null;
        this.initialized = false;
        
        this.init();
    }

    async init() {
        try {
            // Initialize language detector
            this.detector = new LanguageDetector();
            
            // Detect optimal language
            const detection = this.detector.detectLanguage();
            console.log('Language detection result:', detection);
            
            // Initialize multilingual manager
            this.manager = new MultilingualManager();
            
            // Wait for manager to be ready
            await this.waitForManager();
            
            // Apply detected language if different from current
            if (detection.language !== this.manager.getCurrentLanguage()) {
                await this.manager.switchLanguage(detection.language);
            }
            
            // Save the detection result as preference if it's from user selection
            if (detection.source === 'user_selection') {
                this.detector.savePreference(detection.language, {
                    source: detection.source
                });
            }
            
            // Set up enhanced event listeners
            this.setupEnhancedListeners();
            
            this.initialized = true;
            console.log('Multilingual system fully initialized');
            
        } catch (error) {
            console.error('Failed to initialize multilingual system:', error);
            this.fallbackInit();
        }
    }

    async waitForManager() {
        return new Promise((resolve) => {
            const checkManager = () => {
                if (this.manager && this.manager.config) {
                    resolve();
                } else {
                    setTimeout(checkManager, 100);
                }
            };
            checkManager();
        });
    }

    setupEnhancedListeners() {
        // Enhanced language switching with detection integration
        document.addEventListener('click', async (e) => {
            const langToggle = e.target.closest('.lang-toggle');
            if (langToggle) {
                e.preventDefault();
                const targetLang = langToggle.getAttribute('data-lang');
                
                if (targetLang && targetLang !== this.manager.getCurrentLanguage()) {
                    // Save user preference with enhanced metadata
                    this.detector.savePreference(targetLang, {
                        source: 'user_selection',
                        timestamp: Date.now(),
                        page: window.location.pathname,
                        previousLanguage: this.manager.getCurrentLanguage()
                    });
                    
                    // Switch language
                    await this.manager.switchLanguage(targetLang);
                    
                    // Analytics tracking (if available)
                    this.trackLanguageSwitch(targetLang);
                }
            }
        });

        // Handle page visibility changes to update preferences
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && this.initialized) {
                this.updateSessionData();
            }
        });

        // Handle beforeunload to save session data
        window.addEventListener('beforeunload', () => {
            this.saveSessionData();
        });
    }

    updateSessionData() {
        if (this.manager) {
            const currentLang = this.manager.getCurrentLanguage();
            const sessionData = {
                language: currentLang,
                lastPage: window.location.pathname,
                timestamp: Date.now(),
                sessionDuration: Date.now() - (parseInt(sessionStorage.getItem('session_start')) || Date.now())
            };
            
            try {
                sessionStorage.setItem('multilingual_session', JSON.stringify(sessionData));
            } catch (error) {
                console.warn('Failed to update session data:', error);
            }
        }
    }

    saveSessionData() {
        if (this.manager) {
            const currentLang = this.manager.getCurrentLanguage();
            const sessionStart = parseInt(sessionStorage.getItem('session_start')) || Date.now();
            const sessionData = {
                language: currentLang,
                finalPage: window.location.pathname,
                sessionDuration: Date.now() - sessionStart,
                timestamp: Date.now()
            };
            
            try {
                localStorage.setItem('last_session_data', JSON.stringify(sessionData));
            } catch (error) {
                console.warn('Failed to save session data:', error);
            }
        }
    }

    trackLanguageSwitch(targetLang) {
        // Analytics tracking for language switches
        const eventData = {
            event: 'language_switch',
            language: targetLang,
            page: window.location.pathname,
            timestamp: Date.now()
        };

        // Google Analytics (if available)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'language_switch', {
                'language': targetLang,
                'page_path': window.location.pathname
            });
        }

        // Custom analytics (if available)
        if (typeof analytics !== 'undefined') {
            analytics.track('Language Switch', eventData);
        }

        console.log('Language switch tracked:', eventData);
    }

    fallbackInit() {
        console.log('Initializing multilingual system in fallback mode');
        
        // Basic language switching without advanced features
        document.addEventListener('click', (e) => {
            const langToggle = e.target.closest('.lang-toggle');
            if (langToggle) {
                e.preventDefault();
                const targetLang = langToggle.getAttribute('data-lang');
                
                if (targetLang) {
                    // Simple URL-based language switching
                    const currentPath = window.location.pathname;
                    const pathSegments = currentPath.split('/').filter(segment => segment);
                    
                    // Remove current language if present
                    if (pathSegments.length > 0 && ['en', 'zh'].includes(pathSegments[0])) {
                        pathSegments.shift();
                    }
                    
                    // Add new language
                    const newPath = `/${targetLang}/${pathSegments.join('/')}`;
                    window.location.href = newPath;
                }
            }
        });
    }

    // Public API methods
    getDetectionAnalytics() {
        if (this.detector) {
            return this.detector.getDetectionAnalytics();
        }
        return null;
    }

    getCurrentLanguage() {
        if (this.manager) {
            return this.manager.getCurrentLanguage();
        }
        return 'en'; // fallback
    }

    isInitialized() {
        return this.initialized;
    }

    async switchLanguage(language) {
        if (this.manager) {
            return await this.manager.switchLanguage(language);
        }
        return false;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Set session start time
    if (!sessionStorage.getItem('session_start')) {
        sessionStorage.setItem('session_start', Date.now().toString());
    }
    
    // Initialize multilingual system
    window.multilingualInit = new MultilingualInit();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MultilingualInit;
}