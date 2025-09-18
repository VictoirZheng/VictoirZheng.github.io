/**
 * Language Preferences Storage and Management
 * Advanced preference handling with analytics and user behavior tracking
 */

class LanguagePreferences {
    constructor() {
        this.storageKeys = {
            preference: 'user_language_preference',
            session: 'session_language_data',
            history: 'language_switch_history',
            analytics: 'language_analytics'
        };
        
        this.maxHistoryEntries = 50;
        this.analyticsRetentionDays = 30;
        
        this.init();
    }

    init() {
        this.cleanupOldData();
        this.initializeAnalytics();
    }

    /**
     * Save user language preference with comprehensive metadata
     */
    savePreference(language, options = {}) {
        const timestamp = Date.now();
        const preference = {
            language,
            timestamp,
            source: options.source || 'user_selection',
            page: options.page || window.location.pathname,
            previousLanguage: options.previousLanguage || null,
            userAgent: navigator.userAgent,
            screenResolution: `${screen.width}x${screen.height}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            sessionId: this.getSessionId(),
            ...options
        };

        try {
            // Save main preference
            localStorage.setItem(this.storageKeys.preference, JSON.stringify(preference));
            
            // Update session data
            this.updateSessionData(language, preference);
            
            // Add to history
            this.addToHistory(preference);
            
            // Update analytics
            this.updateAnalytics(preference);
            
            console.log('Language preference saved:', preference);
            return true;
            
        } catch (error) {
            console.error('Failed to save language preference:', error);
            return false;
        }
    }

    /**
     * Get stored language preference
     */
    getPreference() {
        try {
            const stored = localStorage.getItem(this.storageKeys.preference);
            if (stored) {
                const preference = JSON.parse(stored);
                
                // Check if preference is still valid (not expired)
                const maxAge = 90 * 24 * 60 * 60 * 1000; // 90 days
                if (Date.now() - preference.timestamp < maxAge) {
                    return preference;
                }
            }
        } catch (error) {
            console.warn('Failed to read language preference:', error);
        }
        
        return null;
    }

    /**
     * Update session-specific language data
     */
    updateSessionData(language, preference) {
        const sessionData = {
            currentLanguage: language,
            sessionStart: this.getSessionStart(),
            lastUpdate: Date.now(),
            switchCount: this.getSessionSwitchCount() + 1,
            pages: this.getSessionPages(),
            preference
        };

        try {
            sessionStorage.setItem(this.storageKeys.session, JSON.stringify(sessionData));
        } catch (error) {
            console.warn('Failed to update session data:', error);
        }
    }

    /**
     * Add language switch to history
     */
    addToHistory(preference) {
        try {
            let history = this.getHistory();
            
            // Add new entry
            history.unshift({
                ...preference,
                id: this.generateId()
            });
            
            // Limit history size
            if (history.length > this.maxHistoryEntries) {
                history = history.slice(0, this.maxHistoryEntries);
            }
            
            localStorage.setItem(this.storageKeys.history, JSON.stringify(history));
            
        } catch (error) {
            console.warn('Failed to update language history:', error);
        }
    }

    /**
     * Get language switch history
     */
    getHistory() {
        try {
            const stored = localStorage.getItem(this.storageKeys.history);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.warn('Failed to read language history:', error);
            return [];
        }
    }

    /**
     * Update language analytics
     */
    updateAnalytics(preference) {
        try {
            let analytics = this.getAnalytics();
            
            const today = new Date().toISOString().split('T')[0];
            const language = preference.language;
            
            // Initialize analytics structure if needed
            if (!analytics.daily) analytics.daily = {};
            if (!analytics.languages) analytics.languages = {};
            if (!analytics.sources) analytics.sources = {};
            if (!analytics.pages) analytics.pages = {};
            
            // Daily analytics
            if (!analytics.daily[today]) {
                analytics.daily[today] = { switches: 0, languages: {} };
            }
            analytics.daily[today].switches++;
            analytics.daily[today].languages[language] = (analytics.daily[today].languages[language] || 0) + 1;
            
            // Language analytics
            analytics.languages[language] = (analytics.languages[language] || 0) + 1;
            
            // Source analytics
            const source = preference.source;
            analytics.sources[source] = (analytics.sources[source] || 0) + 1;
            
            // Page analytics
            const page = preference.page;
            if (!analytics.pages[page]) analytics.pages[page] = {};
            analytics.pages[page][language] = (analytics.pages[page][language] || 0) + 1;
            
            // Update metadata
            analytics.lastUpdate = Date.now();
            analytics.totalSwitches = (analytics.totalSwitches || 0) + 1;
            
            localStorage.setItem(this.storageKeys.analytics, JSON.stringify(analytics));
            
        } catch (error) {
            console.warn('Failed to update language analytics:', error);
        }
    }

    /**
     * Get language analytics
     */
    getAnalytics() {
        try {
            const stored = localStorage.getItem(this.storageKeys.analytics);
            return stored ? JSON.parse(stored) : {};
        } catch (error) {
            console.warn('Failed to read language analytics:', error);
            return {};
        }
    }

    /**
     * Get comprehensive language insights
     */
    getInsights() {
        const preference = this.getPreference();
        const history = this.getHistory();
        const analytics = this.getAnalytics();
        const sessionData = this.getSessionData();
        
        return {
            currentPreference: preference,
            recentHistory: history.slice(0, 10),
            analytics: {
                totalSwitches: analytics.totalSwitches || 0,
                favoriteLanguage: this.getFavoriteLanguage(analytics),
                commonSources: this.getCommonSources(analytics),
                dailyActivity: this.getDailyActivity(analytics)
            },
            session: sessionData,
            recommendations: this.getRecommendations(preference, history, analytics)
        };
    }

    /**
     * Get language recommendations based on user behavior
     */
    getRecommendations(preference, history, analytics) {
        const recommendations = [];
        
        // Time-based recommendations
        const hour = new Date().getHours();
        if (hour >= 9 && hour <= 17) {
            // Work hours - suggest based on most used language during work hours
            const workHourLanguage = this.getWorkHourLanguage(history);
            if (workHourLanguage && workHourLanguage !== preference?.language) {
                recommendations.push({
                    type: 'time_based',
                    language: workHourLanguage,
                    reason: 'Based on your work hour preferences'
                });
            }
        }
        
        // Page-based recommendations
        const currentPage = window.location.pathname;
        const pageLanguage = this.getPageLanguage(analytics, currentPage);
        if (pageLanguage && pageLanguage !== preference?.language) {
            recommendations.push({
                type: 'page_based',
                language: pageLanguage,
                reason: `You usually prefer ${pageLanguage} for this page`
            });
        }
        
        return recommendations;
    }

    /**
     * Utility methods
     */
    getSessionId() {
        let sessionId = sessionStorage.getItem('multilingual_session_id');
        if (!sessionId) {
            sessionId = this.generateId();
            sessionStorage.setItem('multilingual_session_id', sessionId);
        }
        return sessionId;
    }

    getSessionStart() {
        const start = sessionStorage.getItem('session_start');
        return start ? parseInt(start) : Date.now();
    }

    getSessionSwitchCount() {
        try {
            const sessionData = sessionStorage.getItem(this.storageKeys.session);
            return sessionData ? JSON.parse(sessionData).switchCount || 0 : 0;
        } catch (error) {
            return 0;
        }
    }

    getSessionPages() {
        const pages = sessionStorage.getItem('visited_pages');
        return pages ? JSON.parse(pages) : [];
    }

    getSessionData() {
        try {
            const stored = sessionStorage.getItem(this.storageKeys.session);
            return stored ? JSON.parse(stored) : null;
        } catch (error) {
            return null;
        }
    }

    getFavoriteLanguage(analytics) {
        if (!analytics.languages) return null;
        
        return Object.entries(analytics.languages)
            .sort(([,a], [,b]) => b - a)[0]?.[0] || null;
    }

    getCommonSources(analytics) {
        if (!analytics.sources) return [];
        
        return Object.entries(analytics.sources)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([source, count]) => ({ source, count }));
    }

    getDailyActivity(analytics) {
        if (!analytics.daily) return [];
        
        const last7Days = [];
        const today = new Date();
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            
            last7Days.push({
                date: dateStr,
                switches: analytics.daily[dateStr]?.switches || 0,
                languages: analytics.daily[dateStr]?.languages || {}
            });
        }
        
        return last7Days;
    }

    getWorkHourLanguage(history) {
        const workHourSwitches = history.filter(entry => {
            const hour = new Date(entry.timestamp).getHours();
            return hour >= 9 && hour <= 17;
        });
        
        const languageCounts = {};
        workHourSwitches.forEach(entry => {
            languageCounts[entry.language] = (languageCounts[entry.language] || 0) + 1;
        });
        
        return Object.entries(languageCounts)
            .sort(([,a], [,b]) => b - a)[0]?.[0] || null;
    }

    getPageLanguage(analytics, page) {
        if (!analytics.pages || !analytics.pages[page]) return null;
        
        return Object.entries(analytics.pages[page])
            .sort(([,a], [,b]) => b - a)[0]?.[0] || null;
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    initializeAnalytics() {
        const analytics = this.getAnalytics();
        if (!analytics.initialized) {
            analytics.initialized = Date.now();
            analytics.version = '1.0.0';
            try {
                localStorage.setItem(this.storageKeys.analytics, JSON.stringify(analytics));
            } catch (error) {
                console.warn('Failed to initialize analytics:', error);
            }
        }
    }

    cleanupOldData() {
        try {
            // Clean up old daily analytics
            const analytics = this.getAnalytics();
            if (analytics.daily) {
                const cutoffDate = new Date();
                cutoffDate.setDate(cutoffDate.getDate() - this.analyticsRetentionDays);
                const cutoffStr = cutoffDate.toISOString().split('T')[0];
                
                Object.keys(analytics.daily).forEach(date => {
                    if (date < cutoffStr) {
                        delete analytics.daily[date];
                    }
                });
                
                localStorage.setItem(this.storageKeys.analytics, JSON.stringify(analytics));
            }
            
            // Clean up old history
            let history = this.getHistory();
            if (history.length > this.maxHistoryEntries) {
                history = history.slice(0, this.maxHistoryEntries);
                localStorage.setItem(this.storageKeys.history, JSON.stringify(history));
            }
            
        } catch (error) {
            console.warn('Failed to cleanup old data:', error);
        }
    }

    /**
     * Clear all stored preferences and data
     */
    clearAll() {
        try {
            Object.values(this.storageKeys).forEach(key => {
                localStorage.removeItem(key);
                sessionStorage.removeItem(key);
            });
            
            // Clear related session data
            sessionStorage.removeItem('multilingual_session_id');
            sessionStorage.removeItem('visited_pages');
            
            console.log('All language preferences cleared');
            return true;
            
        } catch (error) {
            console.error('Failed to clear preferences:', error);
            return false;
        }
    }

    /**
     * Export preferences data for backup or analysis
     */
    exportData() {
        return {
            preference: this.getPreference(),
            history: this.getHistory(),
            analytics: this.getAnalytics(),
            session: this.getSessionData(),
            exportDate: new Date().toISOString(),
            version: '1.0.0'
        };
    }

    /**
     * Import preferences data from backup
     */
    importData(data) {
        try {
            if (data.preference) {
                localStorage.setItem(this.storageKeys.preference, JSON.stringify(data.preference));
            }
            
            if (data.history) {
                localStorage.setItem(this.storageKeys.history, JSON.stringify(data.history));
            }
            
            if (data.analytics) {
                localStorage.setItem(this.storageKeys.analytics, JSON.stringify(data.analytics));
            }
            
            console.log('Language preferences imported successfully');
            return true;
            
        } catch (error) {
            console.error('Failed to import preferences:', error);
            return false;
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguagePreferences;
}

// Global instance
window.LanguagePreferences = LanguagePreferences;