/*
	Academic Website - Main JavaScript
	Minimal functionality - FAQ interactions only
	Navigation works without JavaScript
*/

(function() {
	'use strict';

	// Wait for DOM to be ready
	document.addEventListener('DOMContentLoaded', function() {
		
		// Remove preload class after page loads
		window.addEventListener('load', function() {
			setTimeout(function() {
				document.body.classList.remove('is-preload');
			}, 100);
		});
		
		// Initialize FAQ functionality (if on FAQ page)
		if (document.querySelector('.faq-question')) {
			initializeFAQ();
		}
		
		// Initialize mobile menu
		initializeMobileMenu();
	});

	/**
	 * Initialize FAQ expandable sections
	 * Progressive enhancement - content is accessible without JavaScript
	 */
	function initializeFAQ() {
		const faqQuestions = document.querySelectorAll('.faq-question');
		
		faqQuestions.forEach(function(question) {
			// Make questions focusable and add ARIA attributes
			question.setAttribute('tabindex', '0');
			question.setAttribute('role', 'button');
			question.setAttribute('aria-expanded', 'false');
			
			const answer = question.nextElementSibling;
			if (answer && answer.classList.contains('faq-answer')) {
				answer.setAttribute('aria-hidden', 'true');
			}

			// Click handler
			question.addEventListener('click', function() {
				toggleFAQItem(question);
			});

			// Keyboard handler
			question.addEventListener('keydown', function(e) {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					toggleFAQItem(question);
				}
			});
		});

		function toggleFAQItem(question) {
			const answer = question.nextElementSibling;
			if (!answer || !answer.classList.contains('faq-answer')) return;

			const isExpanded = question.getAttribute('aria-expanded') === 'true';

			// Close all other FAQ items
			faqQuestions.forEach(function(otherQuestion) {
				if (otherQuestion !== question) {
					otherQuestion.setAttribute('aria-expanded', 'false');
					const otherAnswer = otherQuestion.nextElementSibling;
					if (otherAnswer && otherAnswer.classList.contains('faq-answer')) {
						otherAnswer.classList.remove('active');
						otherAnswer.setAttribute('aria-hidden', 'true');
					}
				}
			});

			// Toggle current item
			if (!isExpanded) {
				question.setAttribute('aria-expanded', 'true');
				answer.classList.add('active');
				answer.setAttribute('aria-hidden', 'false');
			} else {
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

		function openMenu() {
			menuToggle.setAttribute('aria-expanded', 'true');
			mainNav.classList.add('active');
			document.body.style.overflow = 'hidden'; // Prevent background scrolling
			
			// Focus on close button for accessibility
			if (menuClose) {
				setTimeout(() => menuClose.focus(), 100);
			}
		}

		function closeMenu() {
			menuToggle.setAttribute('aria-expanded', 'false');
			mainNav.classList.remove('active');
			document.body.style.overflow = ''; // Restore scrolling
			menuToggle.focus(); // Return focus to toggle button
		}

		// Toggle menu on button click
		menuToggle.addEventListener('click', function() {
			const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
			
			if (isExpanded) {
				closeMenu();
			} else {
				openMenu();
			}
		});

		// Close menu on close button click
		if (menuClose) {
			menuClose.addEventListener('click', closeMenu);
		}

		// Close menu when clicking on navigation links
		const navLinks = mainNav.querySelectorAll('a');
		navLinks.forEach(function(link) {
			link.addEventListener('click', closeMenu);
		});

		// Close menu when clicking on overlay (outside menu content)
		mainNav.addEventListener('click', function(e) {
			// Only close if clicking on the overlay itself, not the menu content
			if (e.target === mainNav) {
				closeMenu();
			}
		});

		// Close menu on escape key
		document.addEventListener('keydown', function(e) {
			if (e.key === 'Escape' && mainNav.classList.contains('active')) {
				closeMenu();
			}
		});

		// Handle window resize - close menu if switching to desktop
		window.addEventListener('resize', function() {
			if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
				closeMenu();
			}
		});
	}

})();