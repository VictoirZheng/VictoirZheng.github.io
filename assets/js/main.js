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

})();