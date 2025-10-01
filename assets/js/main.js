/*
	Academic Website - Optimized JavaScript
	Minimal functionality for progressive enhancement
	All core features work without JavaScript
*/

(function() {
	'use strict';

	// Initialize when DOM is ready
	document.addEventListener('DOMContentLoaded', init);

	function init() {
		// Add JS class to enable JavaScript-enhanced styles
		document.documentElement.classList.add('js');
		
		// Remove preload class for smooth transitions
		removePreloadClass();
		
		// Initialize components only if they exist
		initializeFAQ();
		initializeMobileMenu();
	}

	/**
	 * Remove preload class after page loads
	 */
	function removePreloadClass() {
		window.addEventListener('load', function() {
			setTimeout(function() {
				document.body.classList.remove('is-preload');
			}, 100);
		});
	}

	/**
	 * Initialize FAQ expandable sections
	 * Progressive enhancement - content accessible without JavaScript
	 */
	function initializeFAQ() {
		const faqQuestions = document.querySelectorAll('.faq-question');
		if (!faqQuestions.length) return;
		
		faqQuestions.forEach(function(question) {
			setupFAQQuestion(question);
		});

		function setupFAQQuestion(question) {
			// Add accessibility attributes
			question.setAttribute('tabindex', '0');
			question.setAttribute('role', 'button');
			question.setAttribute('aria-expanded', 'false');
			
			const answer = question.nextElementSibling;
			if (answer && answer.classList.contains('faq-answer')) {
				answer.setAttribute('aria-hidden', 'true');
			}

			// Add event listeners
			question.addEventListener('click', () => toggleFAQItem(question));
			question.addEventListener('keydown', handleFAQKeydown);
		}

		function handleFAQKeydown(e) {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				toggleFAQItem(e.target);
			}
		}

		function toggleFAQItem(question) {
			const answer = question.nextElementSibling;
			if (!answer || !answer.classList.contains('faq-answer')) return;

			const isExpanded = question.getAttribute('aria-expanded') === 'true';

			// Close all other FAQ items (accordion behavior)
			faqQuestions.forEach(function(otherQuestion) {
				if (otherQuestion !== question) {
					closeFAQItem(otherQuestion);
				}
			});

			// Toggle current item
			if (isExpanded) {
				closeFAQItem(question);
			} else {
				openFAQItem(question);
			}
		}

		function openFAQItem(question) {
			const answer = question.nextElementSibling;
			question.setAttribute('aria-expanded', 'true');
			answer.classList.add('active');
			answer.setAttribute('aria-hidden', 'false');
		}

		function closeFAQItem(question) {
			const answer = question.nextElementSibling;
			if (answer && answer.classList.contains('faq-answer')) {
				question.setAttribute('aria-expanded', 'false');
				answer.classList.remove('active');
				answer.setAttribute('aria-hidden', 'true');
			}
		}
	}

	/**
	 * Initialize mobile menu functionality
	 * Progressive enhancement - navigation works without JavaScript
	 */
	function initializeMobileMenu() {
		const menuToggle = document.querySelector('.menu-toggle');
		const menuClose = document.querySelector('.menu-close');
		const mainNav = document.querySelector('.main-nav');
		
		if (!menuToggle || !mainNav) return;

		// Add event listeners
		menuToggle.addEventListener('click', toggleMenu);
		
		if (menuClose) {
			menuClose.addEventListener('click', closeMenu);
		}

		// Close menu when clicking navigation links
		const navLinks = mainNav.querySelectorAll('a');
		navLinks.forEach(link => link.addEventListener('click', closeMenu));

		// Close menu when clicking overlay
		mainNav.addEventListener('click', handleOverlayClick);

		// Keyboard and resize handlers
		document.addEventListener('keydown', handleEscapeKey);
		window.addEventListener('resize', handleResize);

		function toggleMenu() {
			const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
			isExpanded ? closeMenu() : openMenu();
		}

		function openMenu() {
			menuToggle.setAttribute('aria-expanded', 'true');
			mainNav.classList.add('active');
			document.body.style.overflow = 'hidden';
			
			// Focus management for accessibility
			if (menuClose) {
				setTimeout(() => menuClose.focus(), 100);
			}
		}

		function closeMenu() {
			menuToggle.setAttribute('aria-expanded', 'false');
			mainNav.classList.remove('active');
			document.body.style.overflow = '';
			menuToggle.focus();
		}

		function handleOverlayClick(e) {
			// Close only if clicking the overlay, not menu content
			if (e.target === mainNav) {
				closeMenu();
			}
		}

		function handleEscapeKey(e) {
			if (e.key === 'Escape' && mainNav.classList.contains('active')) {
				closeMenu();
			}
		}

		function handleResize() {
			// Close menu when switching to desktop view
			if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
				closeMenu();
			}
		}
	}

})();