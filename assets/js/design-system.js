/**
 * Design System Interactive Components
 * Adds interactive functionality to the unified design system
 */

(function() {
    'use strict';

    // Initialize design system when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializeCards();
        initializeSkillBars();
        initializeAnimations();
        initializeButtons();
        initializeQAsPage(); // Add QAs page functionality
    });

    /**
     * Initialize card interactions
     */
    function initializeCards() {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            // Add hover sound effect (optional)
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
            
            // Add click ripple effect for interactive cards
            if (card.classList.contains('card--nav') || card.querySelector('a')) {
                card.addEventListener('click', function(e) {
                    createRippleEffect(e, this);
                });
            }
        });
    }

    /**
     * Initialize skill bar animations
     */
    function initializeSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        // Animate skill bars when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const percentage = skillBar.getAttribute('data-percentage') || '0';
                    
                    // Animate the width
                    setTimeout(() => {
                        skillBar.style.width = percentage + '%';
                    }, 200);
                    
                    // Unobserve after animation
                    observer.unobserve(skillBar);
                }
            });
        }, {
            threshold: 0.5
        });
        
        skillBars.forEach(bar => {
            // Set initial width to 0
            bar.style.width = '0%';
            observer.observe(bar);
        });
    }

    /**
     * Initialize scroll-triggered animations
     */
    function initializeAnimations() {
        const animatedElements = document.querySelectorAll('.card--animate');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animatedElements.forEach(element => {
            // Set initial state
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            
            observer.observe(element);
        });
    }

    /**
     * Initialize button interactions
     */
    function initializeButtons() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            // Add loading state functionality
            if (button.classList.contains('btn--loading')) {
                button.disabled = true;
            }
            
            // Add click effect
            button.addEventListener('click', function(e) {
                if (!this.disabled && !this.classList.contains('btn--loading')) {
                    createRippleEffect(e, this);
                }
            });
            
            // Add keyboard navigation
            button.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }

    /**
     * Create ripple effect on click
     */
    function createRippleEffect(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        // Add ripple animation keyframes if not already added
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    /**
     * Utility function to add loading state to buttons
     */
    window.setButtonLoading = function(button, loading = true) {
        if (loading) {
            button.classList.add('btn--loading');
            button.disabled = true;
        } else {
            button.classList.remove('btn--loading');
            button.disabled = false;
        }
    };

    /**
     * Utility function to show notifications
     */
    window.showNotification = function(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: var(--color-bg-card);
            border: 1px solid var(--color-border-primary);
            border-radius: var(--radius-base);
            color: var(--color-text-primary);
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        // Set type-specific styles
        switch (type) {
            case 'success':
                notification.style.borderColor = 'var(--color-success)';
                notification.style.background = 'rgba(76, 175, 80, 0.1)';
                break;
            case 'error':
                notification.style.borderColor = 'var(--color-error)';
                notification.style.background = 'rgba(244, 67, 54, 0.1)';
                break;
            case 'warning':
                notification.style.borderColor = 'var(--color-warning)';
                notification.style.background = 'rgba(255, 152, 0, 0.1)';
                break;
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, duration);
    };

    /**
     * Utility function to update skill bar percentage
     */
    window.updateSkillBar = function(skillBar, percentage) {
        const progressBar = skillBar.querySelector('.skill-progress');
        const percentageText = skillBar.querySelector('.skill-percentage');
        
        if (progressBar) {
            progressBar.style.width = percentage + '%';
            progressBar.setAttribute('data-percentage', percentage);
        }
        
        if (percentageText) {
            percentageText.textContent = percentage + '%';
        }
    };

    /**
     * Smooth scroll to element
     */
    window.smoothScrollTo = function(element, offset = 0) {
        const targetElement = typeof element === 'string' ? document.querySelector(element) : element;
        
        if (targetElement) {
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };

    /**
     * Initialize theme toggle functionality (for future use)
     */
    window.initThemeToggle = function() {
        const themeToggle = document.querySelector('.theme-toggle');
        
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                document.body.classList.toggle('light-theme');
                
                // Save preference
                const isLight = document.body.classList.contains('light-theme');
                localStorage.setItem('theme', isLight ? 'light' : 'dark');
            });
            
            // Load saved theme
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'light') {
                document.body.classList.add('light-theme');
            }
        }
    };

})();

/**
 * Homepage specific functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize homepage if we're on the homepage
    if (document.querySelector('.hero-section')) {
        initializeHomepage();
    }
});

function initializeHomepage() {
    initializeScrollAnimations();
    initializeCounterAnimations();
    initializeHeroAnimations();
    initializeSpecializationTags();
    initializeProgressBars();
    initializeNavigationCards();
}

/**
 * Initialize scroll-triggered animations for homepage elements
 */
function initializeScrollAnimations() {
    // Skip navigation cards to prevent display issues
    const animatedElements = document.querySelectorAll('[data-animate="true"]:not(.nav-card)');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Ensure all navigation cards are immediately visible
    const navCards = document.querySelectorAll('.nav-card');
    navCards.forEach(card => {
        card.style.opacity = '1';
        card.style.visibility = 'visible';
        card.style.transform = 'none';
    });
}

/**
 * Initialize counter animations for metrics
 */
function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.metric-number[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const text = counter.textContent;
                
                // Extract suffix (like +, M+, K+)
                const suffix = text.replace(/[\d,]/g, '');
                
                animateCounter(counter, target, suffix);
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

/**
 * Animate counter from 0 to target value
 */
function animateCounter(element, target, suffix = '') {
    let current = 0;
    const increment = target / 60; // 60 frames for smooth animation
    const duration = 2000; // 2 seconds
    
    element.classList.add('counting');
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
            element.classList.remove('counting');
        }
        
        // Format the number based on its size and type
        let displayValue;
        if (target >= 1000000) {
            if (target === 5000000) {
                displayValue = (current / 1000000).toFixed(1) + 'M+';
            } else if (target === 1256520) {
                displayValue = '¥' + (current / 1000000).toFixed(2) + 'M';
            } else {
                displayValue = (current / 1000000).toFixed(1) + 'M' + suffix.replace(/M/g, '');
            }
        } else if (target >= 1000) {
            displayValue = (current / 1000).toFixed(1) + 'K' + suffix.replace(/K/g, '');
        } else if (target === 106) {
            // Special case for TOEFL score
            displayValue = 'TOEFL ' + Math.round(current);
        } else {
            displayValue = Math.round(current) + suffix;
        }
        
        element.textContent = displayValue;
    }, duration / 60);
}

/**
 * Initialize hero section animations
 */
function initializeHeroAnimations() {
    const heroContent = document.querySelector('.hero-content');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const heroSpecializations = document.querySelector('.hero-specializations');
    
    if (heroContent) {
        // Stagger the hero animations
        setTimeout(() => {
            if (heroTitle) heroTitle.style.animation = 'slideInUp 0.8s ease-out forwards';
        }, 200);
        
        setTimeout(() => {
            if (heroSubtitle) heroSubtitle.style.animation = 'slideInUp 0.8s ease-out forwards';
        }, 400);
        
        setTimeout(() => {
            if (heroDescription) heroDescription.style.animation = 'slideInUp 0.8s ease-out forwards';
        }, 600);
        
        setTimeout(() => {
            if (heroSpecializations) heroSpecializations.style.animation = 'slideInUp 0.8s ease-out forwards';
        }, 800);
    }
}

/**
 * Initialize specialization tag interactions
 */
function initializeSpecializationTags() {
    const tags = document.querySelectorAll('.specialization-tag');
    
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * Initialize progress bar animations
 */
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar[data-width]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.getAttribute('data-width');
                
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 300);
                
                observer.unobserve(progressBar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    progressBars.forEach(bar => {
        bar.style.width = '0%';
        observer.observe(bar);
    });
}

/**
 * Navigation card interactions - disabled hover animations
 */
function initializeNavigationCards() {
    // No hover animations to prevent layout issues
    // Cards are now purely static with only button hover effects
    console.log('Navigation cards initialized without hover animations');
}

/**
 * Initialize enhanced scroll animations
 */
function initializeEnhancedScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.getAttribute('data-animate');
                const delay = element.getAttribute('data-delay') || '0s';
                
                element.style.animationDelay = delay;
                element.classList.add('animate-in');
                
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize enhanced animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeEnhancedScrollAnimations();
});
/**

 * Personal Page specific functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize personal page if we're on the personal page
    if (document.querySelector('.personal-traits-overview')) {
        initializePersonalPage();
    }
});

function initializePersonalPage() {
    initializePersonalAnimations();
    initializeTraitCards();
    initializeTeachingCards();
    initializeFunFacts();
}

/**
 * Initialize animations for personal page elements
 */
function initializePersonalAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate="fade-in"]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach((element, index) => {
        // Add staggered delay for trait cards
        if (element.classList.contains('trait-card')) {
            element.style.transitionDelay = `${index * 0.1}s`;
        }
        observer.observe(element);
    });
}

/**
 * Initialize trait card interactions
 */
function initializeTraitCards() {
    const traitCards = document.querySelectorAll('.trait-card');
    
    traitCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle pulse effect to icon
            const icon = this.querySelector('.trait-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.trait-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
}

/**
 * Initialize teaching card interactions
 */
function initializeTeachingCards() {
    const teachingCards = document.querySelectorAll('.teaching-card');
    
    teachingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Highlight the period badge
            const period = this.querySelector('.teaching-period');
            if (period) {
                period.style.transform = 'scale(1.05)';
                period.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const period = this.querySelector('.teaching-period');
            if (period) {
                period.style.transform = 'scale(1)';
            }
        });
    });
}

/**
 * Initialize fun facts interactions
 */
function initializeFunFacts() {
    const funFacts = document.querySelectorAll('.fun-fact');
    
    funFacts.forEach((fact, index) => {
        // Add random hover delay for playful effect
        fact.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(10deg) scale(1.2)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        fact.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
        });
        
        // Add click interaction for mobile
        fact.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

/**
 * Initialize value items with progressive reveal
 */
function initializeValueItems() {
    const valueItems = document.querySelectorAll('.value-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    valueItems.forEach((item, index) => {
        // Set initial state
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        observer.observe(item);
    });
}

// Initialize value items when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.values-list')) {
        initializeValueItems();
    }
});

/**
 * Utility function to add typing effect to text elements
 */
function addTypingEffect(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    typeWriter();
}

/**
 * Initialize quote typing effect
 */
function initializeQuoteTyping() {
    const quote = document.querySelector('.philosophy-content blockquote p');
    
    if (quote) {
        const originalText = quote.textContent;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    addTypingEffect(entry.target, originalText, 30);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(quote);
    }
}

// Initialize quote typing when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.philosophy-section')) {
        initializeQuoteTyping();
    }
});    /**

     * Initialize QAs page functionality
     */
    function initializeQAsPage() {
        if (!document.querySelector('.qa-container')) return;
        
        initializeCollapsibleQAs();
    }

    /**
     * Initialize collapsible Q&A functionality
     */
    function initializeCollapsibleQAs() {
        const qaQuestions = document.querySelectorAll('.qa-question');
        
        qaQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                
                // Toggle current answer
                this.setAttribute('aria-expanded', !isExpanded);
                answer.classList.toggle('active', !isExpanded);
            });
            
            // Keyboard accessibility
            question.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }





    /**
     * Initialize smooth scrolling for navigation links
     */
    function initializeSmoothScrolling() {
        const navLinks = document.querySelectorAll('.qa-navigation .nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL without triggering scroll
                    history.pushState(null, null, `#${targetId}`);
                }
            });
        });
    }
            }
        });
    }

    /**
     * Initialize smooth scrolling for navigation links
     */
    function initializeSmoothScrolling() {
        const navLinks = document.querySelectorAll('.qa-navigation .nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL without triggering scroll
                    history.pushState(null, null, `#${targetId}`);
                }
            });
        });
    }

