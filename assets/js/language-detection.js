/**
 * Language Detection and Preference Management
 * Handles automatic language detection, user preferences, and storage
 */

class LanguageDetector {
    constructor() {
        this.supportedLanguages = ['en', 'zh'];
        this.defaultLanguage = 'en';
        this.fallbackLanguage = 'en';
        this.cookieName = 'preferred_language';
        this.localStorageKey = 'user_language_preference';
        this.sessionStorageKey = 'session_language';
        this.cookieExpiry = 365; // days
        
        // Detection priority weights
        this.detectionWeights = {
            explicit: 100,      // User explicitly selected
            url: 90,            // URL path contains language
            cookie: 80,         // Stored cookie preference
            localStorage: 70,   // Local storage preference
            session: 60,        // Session storage
            browser: 50,        // Browser language preference
            geo: 40,            // Geographic location (if available)
            default: 0          // Default fallback
        };
    }

    /**
     * Detect the best language for the user
     * @param {Object} options - Detection options
     * @returns {Object} Detection result with language and confidence
     */
    detectLanguage(options = {}) {
        const detectionMethods = [
            () => this.detectFromURL(),
            () => this.detectFromCookie(),
            () => this.detectFromLocalStorage(),
            () => this.detectFromSessionStorage(),
            () => this.detectFromBrowser(),
            () => this.detectFromGeolocation(),
            () => this.detectDefault()
        ];

        const results = [];

        // Run all detection methods
        detectionMethods.forEach(method => {
            try {
                const result = method();
                if (result && result.language && this.isLanguageSupported(result.language)) {
                    results.push(result);
                }
            } catch (error) {
                console.warn('Language detection method failed:', error);
            }
        });

        // Sort by confidence (weight)
        results.sort((a, b) => b.confidence - a.confidence);

        // Return the highest confidence result
        const bestResult = results[0] || { 
            language: this.defaultLanguage, 
            confidence: 0, 
            source: 'default' 
        };

        console.log('Language detection results:', results);
        console.log('Selected language:', bestResult);

        return bestResult;
    }

    /**
     * Detect language from URL path
     */
    detectFromURL() {
        const path = window.location.pathname;
        const segments = path.split('/').filter(segment => segment);
        
        if (segments.length > 0) {
            const firstSegment = segments[0];
            if (this.isLanguageSupported(firstSegment)) {
                return {
                    language: firstSegment,
                    confidence: this.detectionWeights.url,
                    source: 'url',
                    details: { path, segment: firstSegment }
                };
            }
        }

        return null;
    }

    /**
     * Detect language from cookie
     */
    detectFromCookie() {
        const cookieValue = this.getCookie(this.cookieName);
        if (cookieValue && this.isLanguageSupported(cookieValue)) {
            return {
                language: cookieValue,
                confidence: this.detectionWeights.cookie,
                source: 'cookie',
                details: { cookieName: this.cookieName, value: cookieValue }
            };
        }

        return null;
    }

    /**
     * Detect language from localStorage
     */
    detectFromLocalStorage() {
        try {
            const storedValue = localStorage.getItem(this.localStorageKey);
            if (storedValue) {
                const preference = JSON.parse(storedValue);
                if (preference.language && this.isLanguageSupported(preference.language)) {
                    // Check if preference is still valid (not expired)
                    const now = Date.now();
                    const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
                    
                    if (!preference.timestamp || (now - preference.timestamp) < maxAge) {
                        return {
                            language: preference.language,
                            confidence: this.detectionWeights.localStorage,
                            source: 'localStorage',
                            details: preference
                        };
                    }
                }
            }
        } catch (error) {
            console.warn('Failed to read from localStorage:', error);
        }

        return null;
    }

    /**
     * Detect language from sessionStorage
     */
    detectFromSessionStorage() {
        try {
            const sessionLang = sessionStorage.getItem(this.sessionStorageKey);
            if (sessionLang && this.isLanguageSupported(sessionLang)) {
                return {
                    language: sessionLang,
                    confidence: this.detectionWeights.session,
                    source: 'sessionStorage',
                    details: { value: sessionLang }
                };
            }
        } catch (error) {
            console.warn('Failed to read from sessionStorage:', error);
        }

        return null;
    }

    /**
     * Detect language from browser preferences
     */
    detectFromBrowser() {
        const browserLanguages = this.getBrowserLanguages();
        
        for (const browserLang of browserLanguages) {
            // Try exact match first
            if (this.isLanguageSupported(browserLang)) {
                return {
                    language: browserLang,
                    confidence: this.detectionWeights.browser,
                    source: 'browser',
                    details: { 
                        browserLanguages,
                        matched: browserLang,
                        matchType: 'exact'
                    }
                };
            }
            
            // Try language code without region
            const langCode = browserLang.split('-')[0];
            if (this.isLanguageSupported(langCode)) {
                return {
                    language: langCode,
                    confidence: this.detectionWeights.browser - 5,
                    source: 'browser',
                    details: { 
                        browserLanguages,
                        matched: langCode,
                        matchType: 'partial',
                        original: browserLang
                    }
                };
            }
        }

        return null;
    }

    /**
     * Detect language from geolocation (if available)
     */
    detectFromGeolocation() {
        // This would require a geolocation service
        // For now, we'll implement a simple mapping based on timezone
        try {
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const geoLanguageMap = {
                'Asia/Shanghai': 'zh',
                'Asia/Beijing': 'zh',
                'Asia/Chongqing': 'zh',
                'Asia/Harbin': 'zh',
                'Asia/Hong_Kong': 'zh',
                'Asia/Macau': 'zh',
                'Asia/Taipei': 'zh'
            };

            const detectedLang = geoLanguageMap[timezone];
            if (detectedLang && this.isLanguageSupported(detectedLang)) {
                return {
                    language: detectedLang,
                    confidence: this.detectionWeights.geo,
                    source: 'geolocation',
                    details: { timezone, mapping: geoLanguageMap[timezone] }
                };
            }
        } catch (error) {
            console.warn('Geolocation detection failed:', error);
        }

        return null;
    }

    /**
     * Default language fallback
     */
    detectDefault() {
        return {
            language: this.defaultLanguage,
            confidence: this.detectionWeights.default,
            source: 'default',
            details: { reason: 'fallback' }
        };
    }

    /**
     * Get browser language preferences
     */
    getBrowserLanguages() {
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
        
        if (navigator.browserLanguage) {
            languages.push(navigator.browserLanguage);
        }
        
        if (navigator.systemLanguage) {
            languages.push(navigator.systemLanguage);
        }

        // Remove duplicates and normalize
        return [...new Set(languages)].map(lang => lang.toLowerCase());
    }

    /**
     * Save user language preference
     */
    savePreference(language, options = {}) {
        if (!this.isLanguageSupported(language)) {
            throw new Error(`Unsupported language: ${language}`);
        }

        const timestamp = Date.now();
        const preference = {
            language,
            timestamp,
            source: options.source || 'user_selection',
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        try {
            // Save to cookie
            this.setCookie(this.cookieName, language, this.cookieExpiry);
            
            // Save to localStorage with metadata
            localStorage.setItem(this.localStorageKey, JSON.stringify(preference));
            
            // Save to sessionStorage for current session
            sessionStorage.setItem(this.sessionStorageKey, language);
            
            console.log('Language preference saved:', preference);
            return true;
        } catch (error) {
            console.error('Failed to save language preference:', error);
            return false;
        }
    }

    /**
     * Clear all stored language preferences
     */
    clearPreferences() {
        try {
            // Clear cookie
            this.deleteCookie(this.cookieName);
            
            // Clear localStorage
            localStorage.removeItem(this.localStorageKey);
            
            // Clear sessionStorage
            sessionStorage.removeItem(this.sessionStorageKey);
            
            console.log('Language preferences cleared');
            return true;
        } catch (error) {
            console.error('Failed to clear language preferences:', error);
            return false;
        }
    }

    /**
     * Get stored preference details
     */
    getStoredPreference() {
        try {
            const stored = localStorage.getItem(this.localStorageKey);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (error) {
            console.warn('Failed to read stored preference:', error);
        }
        
        return null;
    }

    /**
     * Check if language is supported
     */
    isLanguageSupported(language) {
        return this.supportedLanguages.includes(language);
    }

    /**
     * Cookie utility methods
     */
    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        const secure = window.location.protocol === 'https:' ? '; Secure' : '';
        document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax${secure}`;
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

    deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    /**
     * Analytics and debugging
     */
    getDetectionAnalytics() {
        const detection = this.detectLanguage();
        const stored = this.getStoredPreference();
        const browserLangs = this.getBrowserLanguages();
        
        return {
            currentDetection: detection,
            storedPreference: stored,
            browserLanguages: browserLangs,
            supportedLanguages: this.supportedLanguages,
            cookies: {
                [this.cookieName]: this.getCookie(this.cookieName)
            },
            localStorage: {
                [this.localStorageKey]: localStorage.getItem(this.localStorageKey)
            },
            sessionStorage: {
                [this.sessionStorageKey]: sessionStorage.getItem(this.sessionStorageKey)
            },
            url: {
                pathname: window.location.pathname,
                detected: this.detectFromURL()
            },
            timestamp: Date.now()
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageDetector;
}

// Global instance
window.LanguageDetector = LanguageDetector;