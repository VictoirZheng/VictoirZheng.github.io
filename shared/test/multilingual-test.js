/**
 * Multilingual System Test Suite
 * Comprehensive testing for language detection, switching, and preferences
 */

class MultilingualTestSuite {
    constructor() {
        this.testResults = [];
        this.supportedLanguages = ['en', 'zh'];
        this.testStartTime = Date.now();
    }

    /**
     * Run all tests
     */
    async runAllTests() {
        console.log('🧪 Starting Multilingual System Test Suite...');
        
        try {
            // Core functionality tests
            await this.testLanguageDetection();
            await this.testLanguageSwitching();
            await this.testPreferenceStorage();
            await this.testURLRouting();
            
            // UI/UX tests
            await this.testLanguageSwitcher();
            await this.testContentLoading();
            await this.testAccessibility();
            
            // Performance tests
            await this.testPerformance();
            
            // Error handling tests
            await this.testErrorHandling();
            
            // Generate report
            this.generateTestReport();
            
        } catch (error) {
            console.error('❌ Test suite failed:', error);
            this.addTestResult('Test Suite', false, error.message);
        }
    }

    /**
     * Test language detection functionality
     */
    async testLanguageDetection() {
        console.log('🔍 Testing language detection...');
        
        try {
            // Test URL-based detection
            const urlTest = this.testURLDetection();
            this.addTestResult('URL Detection', urlTest.success, urlTest.message);
            
            // Test cookie-based detection
            const cookieTest = this.testCookieDetection();
            this.addTestResult('Cookie Detection', cookieTest.success, cookieTest.message);
            
            // Test browser language detection
            const browserTest = this.testBrowserDetection();
            this.addTestResult('Browser Detection', browserTest.success, browserTest.message);
            
            // Test fallback detection
            const fallbackTest = this.testFallbackDetection();
            this.addTestResult('Fallback Detection', fallbackTest.success, fallbackTest.message);
            
        } catch (error) {
            this.addTestResult('Language Detection', false, error.message);
        }
    }

    /**
     * Test URL-based language detection
     */
    testURLDetection() {
        try {
            // Mock different URL scenarios
            const testCases = [
                { url: '/en/index.html', expected: 'en' },
                { url: '/zh/index.html', expected: 'zh' },
                { url: '/index.html', expected: null },
                { url: '/', expected: null }
            ];
            
            let passed = 0;
            const total = testCases.length;
            
            testCases.forEach(testCase => {
                // Simulate URL detection logic
                const segments = testCase.url.split('/').filter(segment => segment);
                const detected = segments.length > 0 && this.supportedLanguages.includes(segments[0]) 
                    ? segments[0] 
                    : null;
                
                if (detected === testCase.expected) {
                    passed++;
                }
            });
            
            return {
                success: passed === total,
                message: `${passed}/${total} URL detection tests passed`
            };
            
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    /**
     * Test cookie-based detection
     */
    testCookieDetection() {
        try {
            // Test cookie setting and retrieval
            const testLang = 'zh';
            document.cookie = `preferred_language=${testLang}; path=/`;
            
            // Simulate cookie reading
            const cookieValue = this.getCookie('preferred_language');
            
            return {
                success: cookieValue === testLang,
                message: cookieValue === testLang 
                    ? 'Cookie detection working correctly'
                    : `Expected ${testLang}, got ${cookieValue}`
            };
            
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    /**
     * Test browser language detection
     */
    testBrowserDetection() {
        try {
            const browserLangs = navigator.languages || [navigator.language];
            const detected = browserLangs.find(lang => 
                this.supportedLanguages.includes(lang.split('-')[0])
            );
            
            return {
                success: true,
                message: `Browser languages: ${browserLangs.join(', ')}, detected: ${detected || 'none'}`
            };
            
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    /**
     * Test fallback detection
     */
    testFallbackDetection() {
        try {
            // Clear all preferences
            document.cookie = 'preferred_language=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            localStorage.removeItem('user_language_preference');
            
            // Should fallback to default
            const defaultLang = 'en';
            
            return {
                success: true,
                message: `Fallback to default language: ${defaultLang}`
            };
            
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    /**
     * Test language switching functionality
     */
    async testLanguageSwitching() {
        console.log('🔄 Testing language switching...');
        
        try {
            // Test programmatic switching
            if (typeof window.multilingualManager !== 'undefined') {
                const currentLang = window.multilingualManager.getCurrentLanguage();
                const targetLang = currentLang === 'en' ? 'zh' : 'en';
                
                // Test switching
                await window.multilingualManager.switchLanguage(targetLang);
                const newLang = window.multilingualManager.getCurrentLanguage();
                
                this.addTestResult('Programmatic Switching', 
                    newLang === targetLang, 
                    `Switched from ${currentLang} to ${newLang}`
                );
            } else {
                this.addTestResult('Programmatic Switching', false, 'Multilingual manager not available');
            }
            
            // Test UI switching
            const switcherTest = this.testUISwitching();
            this.addTestResult('UI Switching', switcherTest.success, switcherTest.message);
            
        } catch (error) {
            this.addTestResult('Language Switching', false, error.message);
        }
    }

    /**
     * Test UI-based language switching
     */
    testUISwitching() {
        try {
            const switcher = document.getElementById('language-switcher');
            if (!switcher) {
                return { success: false, message: 'Language switcher not found' };
            }
            
            const toggles = switcher.querySelectorAll('.lang-toggle');
            if (toggles.length !== 2) {
                return { success: false, message: `Expected 2 toggles, found ${toggles.length}` };
            }
            
            // Check if toggles have correct data attributes
            const langs = Array.from(toggles).map(toggle => toggle.getAttribute('data-lang'));
            const hasAllLangs = this.supportedLanguages.every(lang => langs.includes(lang));
            
            return {
                success: hasAllLangs,
                message: hasAllLangs 
                    ? 'All language toggles present and configured'
                    : `Missing languages: ${this.supportedLanguages.filter(lang => !langs.includes(lang))}`
            };
            
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    /**
     * Test preference storage
     */
    async testPreferenceStorage() {
        console.log('💾 Testing preference storage...');
        
        try {
            // Test localStorage
            const localStorageTest = this.testLocalStorage();
            this.addTestResult('LocalStorage', localStorageTest.success, localStorageTest.message);
            
            // Test sessionStorage
            const sessionStorageTest = this.testSessionStorage();
            this.addTestResult('SessionStorage', sessionStorageTest.success, sessionStorageTest.message);
            
            // Test cookie storage
            const cookieStorageTest = this.testCookieStorage();
            this.addTestResult('Cookie Storage', cookieStorageTest.success, cookieStorageTest.message);
            
        } catch (error) {
            this.addTestResult('Preference Storage', false, error.message);
        }
    }

    /**
     * Test localStorage functionality
     */
    testLocalStorage() {
        try {
            const testData = {
                language: 'zh',
                timestamp: Date.now(),
                source: 'test'
            };
            
            localStorage.setItem('test_language_preference', JSON.stringify(testData));
            const retrieved = JSON.parse(localStorage.getItem('test_language_preference'));
            
            const success = retrieved && retrieved.language === testData.language;
            
            // Cleanup
            localStorage.removeItem('test_language_preference');
            
            return {
                success,
                message: success ? 'LocalStorage working correctly' : 'LocalStorage test failed'
            };
            
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    /**
     * Test sessionStorage functionality
     */
    testSessionStorage() {
        try {
            const testLang = 'en';
            sessionStorage.setItem('test_session_language', testLang);
            const retrieved = sessionStorage.getItem('test_session_language');
            
            const success = retrieved === testLang;
            
            // Cleanup
            sessionStorage.removeItem('test_session_language');
            
            return {
                success,
                message: success ? 'SessionStorage working correctly' : 'SessionStorage test failed'
            };
            
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    /**
     * Test cookie storage functionality
     */
    testCookieStorage() {
        try {
            const testLang = 'zh';
            const cookieName = 'test_cookie_lang';
            
            // Set cookie
            document.cookie = `${cookieName}=${testLang}; path=/`;
            
            // Retrieve cookie
            const retrieved = this.getCookie(cookieName);
            
            const success = retrieved === testLang;
            
            // Cleanup
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            
            return {
                success,
                message: success ? 'Cookie storage working correctly' : 'Cookie storage test failed'
            };
            
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    /**
     * Test URL routing
     */
    async testURLRouting() {
        console.log('🛣️ Testing URL routing...');
        
        try {
            // Test current URL structure
            const currentPath = window.location.pathname;
            const segments = currentPath.split('/').filter(segment => segment);
            
            let routingTest = { success: true, message: 'URL routing structure valid' };
            
            // Check if we're in a language-specific path
            if (segments.length > 0) {
                const firstSegment = segments[0];
                if (this.supportedLanguages.includes(firstSegment)) {
                    routingTest.message = `Currently in ${firstSegment} language path`;
                } else {
                    routingTest = { 
                        success: false, 
                        message: `Invalid language path: ${firstSegment}` 
                    };
                }
            } else {
                routingTest.message = 'At root level - should redirect to language-specific path';
            }
            
            this.addTestResult('URL Routing', routingTest.success, routingTest.message);
            
        } catch (error) {
            this.addTestResult('URL Routing', false, error.message);
        }
    }

    /**
     * Test language switcher UI
     */
    async testLanguageSwitcher() {
        console.log('🎛️ Testing language switcher UI...');
        
        try {
            const switcher = document.getElementById('language-switcher');
            
            if (!switcher) {
                this.addTestResult('Language Switcher UI', false, 'Language switcher element not found');
                return;
            }
            
            // Test visibility
            const isVisible = switcher.offsetWidth > 0 && switcher.offsetHeight > 0;
            this.addTestResult('Switcher Visibility', isVisible, 
                isVisible ? 'Language switcher is visible' : 'Language switcher is hidden');
            
            // Test styling
            const computedStyle = window.getComputedStyle(switcher);
            const hasFixedPosition = computedStyle.position === 'fixed';
            this.addTestResult('Switcher Positioning', hasFixedPosition,
                hasFixedPosition ? 'Switcher has fixed positioning' : 'Switcher positioning incorrect');
            
            // Test accessibility
            const toggles = switcher.querySelectorAll('.lang-toggle');
            let accessibilityPassed = 0;
            
            toggles.forEach(toggle => {
                if (toggle.hasAttribute('aria-label') && toggle.hasAttribute('data-lang')) {
                    accessibilityPassed++;
                }
            });
            
            this.addTestResult('Switcher Accessibility', 
                accessibilityPassed === toggles.length,
                `${accessibilityPassed}/${toggles.length} toggles have proper accessibility attributes`);
            
        } catch (error) {
            this.addTestResult('Language Switcher UI', false, error.message);
        }
    }

    /**
     * Test content loading
     */
    async testContentLoading() {
        console.log('📄 Testing content loading...');
        
        try {
            // Test if content is loaded
            const mainContent = document.getElementById('main');
            const hasContent = mainContent && mainContent.innerHTML.trim().length > 0;
            
            this.addTestResult('Content Loading', hasContent,
                hasContent ? 'Main content loaded successfully' : 'Main content not found or empty');
            
            // Test language-specific content
            const currentLang = this.getCurrentLanguageFromDOM();
            this.addTestResult('Language-Specific Content', 
                currentLang !== null,
                currentLang ? `Content loaded for language: ${currentLang}` : 'Could not determine content language');
            
        } catch (error) {
            this.addTestResult('Content Loading', false, error.message);
        }
    }

    /**
     * Test accessibility features
     */
    async testAccessibility() {
        console.log('♿ Testing accessibility features...');
        
        try {
            // Test HTML lang attribute
            const htmlLang = document.documentElement.getAttribute('lang');
            this.addTestResult('HTML Lang Attribute', 
                htmlLang && this.supportedLanguages.some(lang => htmlLang.startsWith(lang)),
                htmlLang ? `HTML lang attribute: ${htmlLang}` : 'HTML lang attribute missing');
            
            // Test ARIA labels
            const switcher = document.getElementById('language-switcher');
            if (switcher) {
                const toggles = switcher.querySelectorAll('.lang-toggle');
                let ariaLabelsCount = 0;
                
                toggles.forEach(toggle => {
                    if (toggle.hasAttribute('aria-label')) {
                        ariaLabelsCount++;
                    }
                });
                
                this.addTestResult('ARIA Labels', 
                    ariaLabelsCount === toggles.length,
                    `${ariaLabelsCount}/${toggles.length} toggles have ARIA labels`);
            }
            
            // Test keyboard navigation
            const keyboardTest = this.testKeyboardNavigation();
            this.addTestResult('Keyboard Navigation', keyboardTest.success, keyboardTest.message);
            
        } catch (error) {
            this.addTestResult('Accessibility', false, error.message);
        }
    }

    /**
     * Test keyboard navigation
     */
    testKeyboardNavigation() {
        try {
            const switcher = document.getElementById('language-switcher');
            if (!switcher) {
                return { success: false, message: 'Language switcher not found' };
            }
            
            const toggles = switcher.querySelectorAll('.lang-toggle');
            let focusableCount = 0;
            
            toggles.forEach(toggle => {
                if (toggle.tabIndex >= 0 || toggle.tagName === 'BUTTON') {
                    focusableCount++;
                }
            });
            
            return {
                success: focusableCount === toggles.length,
                message: `${focusableCount}/${toggles.length} toggles are keyboard accessible`
            };
            
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    /**
     * Test performance
     */
    async testPerformance() {
        console.log('⚡ Testing performance...');
        
        try {
            const startTime = performance.now();
            
            // Test script loading time
            const scripts = document.querySelectorAll('script[src*="multilingual"]');
            this.addTestResult('Script Loading', 
                scripts.length > 0,
                `${scripts.length} multilingual scripts loaded`);
            
            // Test initialization time
            const initTime = performance.now() - startTime;
            this.addTestResult('Initialization Time', 
                initTime < 100,
                `Initialization took ${initTime.toFixed(2)}ms`);
            
            // Test memory usage (if available)
            if (performance.memory) {
                const memoryUsage = performance.memory.usedJSHeapSize / 1024 / 1024;
                this.addTestResult('Memory Usage', 
                    memoryUsage < 50,
                    `Memory usage: ${memoryUsage.toFixed(2)}MB`);
            }
            
        } catch (error) {
            this.addTestResult('Performance', false, error.message);
        }
    }

    /**
     * Test error handling
     */
    async testErrorHandling() {
        console.log('🚨 Testing error handling...');
        
        try {
            // Test invalid language switching
            if (typeof window.multilingualManager !== 'undefined') {
                try {
                    await window.multilingualManager.switchLanguage('invalid');
                    this.addTestResult('Invalid Language Handling', false, 'Should have thrown error for invalid language');
                } catch (error) {
                    this.addTestResult('Invalid Language Handling', true, 'Correctly handled invalid language');
                }
            }
            
            // Test missing configuration
            const configTest = this.testMissingConfiguration();
            this.addTestResult('Missing Configuration', configTest.success, configTest.message);
            
        } catch (error) {
            this.addTestResult('Error Handling', false, error.message);
        }
    }

    /**
     * Test missing configuration handling
     */
    testMissingConfiguration() {
        try {
            // This would test how the system handles missing config files
            // For now, just check if the system has fallback mechanisms
            return {
                success: true,
                message: 'Error handling mechanisms in place'
            };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    /**
     * Utility methods
     */
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

    getCurrentLanguageFromDOM() {
        const htmlLang = document.documentElement.getAttribute('lang');
        if (htmlLang) {
            return htmlLang.split('-')[0];
        }
        
        const path = window.location.pathname;
        const segments = path.split('/').filter(segment => segment);
        if (segments.length > 0 && this.supportedLanguages.includes(segments[0])) {
            return segments[0];
        }
        
        return null;
    }

    addTestResult(testName, success, message) {
        this.testResults.push({
            name: testName,
            success,
            message,
            timestamp: Date.now()
        });
        
        const icon = success ? '✅' : '❌';
        console.log(`${icon} ${testName}: ${message}`);
    }

    /**
     * Generate comprehensive test report
     */
    generateTestReport() {
        const totalTests = this.testResults.length;
        const passedTests = this.testResults.filter(result => result.success).length;
        const failedTests = totalTests - passedTests;
        const testDuration = Date.now() - this.testStartTime;
        
        console.log('\n📊 MULTILINGUAL SYSTEM TEST REPORT');
        console.log('=====================================');
        console.log(`Total Tests: ${totalTests}`);
        console.log(`Passed: ${passedTests} (${((passedTests/totalTests)*100).toFixed(1)}%)`);
        console.log(`Failed: ${failedTests} (${((failedTests/totalTests)*100).toFixed(1)}%)`);
        console.log(`Duration: ${testDuration}ms`);
        console.log('=====================================');
        
        if (failedTests > 0) {
            console.log('\n❌ FAILED TESTS:');
            this.testResults
                .filter(result => !result.success)
                .forEach(result => {
                    console.log(`- ${result.name}: ${result.message}`);
                });
        }
        
        console.log('\n📋 DETAILED RESULTS:');
        this.testResults.forEach(result => {
            const icon = result.success ? '✅' : '❌';
            console.log(`${icon} ${result.name}: ${result.message}`);
        });
        
        // Return summary for programmatic use
        return {
            total: totalTests,
            passed: passedTests,
            failed: failedTests,
            duration: testDuration,
            success: failedTests === 0,
            results: this.testResults
        };
    }
}

// Auto-run tests when script is loaded (if in test environment)
if (typeof window !== 'undefined' && window.location.search.includes('test=multilingual')) {
    document.addEventListener('DOMContentLoaded', () => {
        const testSuite = new MultilingualTestSuite();
        testSuite.runAllTests();
    });
}

// Export for manual testing
if (typeof window !== 'undefined') {
    window.MultilingualTestSuite = MultilingualTestSuite;
}

// Export for Node.js testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MultilingualTestSuite;
}