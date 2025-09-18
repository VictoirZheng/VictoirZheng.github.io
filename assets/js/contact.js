/**
 * Contact Page Functionality
 * Handles time zone display and interactive elements
 */

(function() {
    'use strict';

    // Time zone and clock functionality
    function updateBeijingTime() {
        const now = new Date();
        const beijingTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Shanghai"}));
        const timeString = beijingTime.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        
        const timeElement = document.getElementById('beijing-time');
        if (timeElement) {
            timeElement.textContent = timeString;
        }
    }

    // Initialize contact page functionality
    function init() {
        // Update Beijing time immediately and then every second
        updateBeijingTime();
        setInterval(updateBeijingTime, 1000);

        // Add smooth scrolling to anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add hover effects to social cards
        const socialCards = document.querySelectorAll('.social-card');
        socialCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();