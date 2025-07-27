/**
 * Professional Portfolio - Form Validation
 * This file contains the validation and submission handling for the contact form
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // DOM Elements
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} True if email is valid
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Set error state for a form field
     * @param {HTMLElement} input - Input element
     * @param {string} message - Error message
     */
    function setError(input, message) {
        const formGroup = input.parentElement;
        const errorDisplay = formGroup.querySelector('.error-message');
        
        formGroup.classList.add('error');
        errorDisplay.textContent = message;
    }

    /**
     * Remove error state from a form field
     * @param {HTMLElement} input - Input element
     */
    function clearError(input) {
        const formGroup = input.parentElement;
        const errorDisplay = formGroup.querySelector('.error-message');
        
        formGroup.classList.remove('error');
        errorDisplay.textContent = '';
    }

    /**
     * Validate all form inputs
     * @returns {boolean} True if all fields are valid
     */
    function validateForm() {
        let isValid = true;
        
        // Clear previous errors
        clearError(nameInput);
        clearError(emailInput);
        clearError(subjectInput);
        clearError(messageInput);
        
        // Name validation
        if (nameInput.value.trim() === '') {
            setError(nameInput, 'Name is required');
            isValid = false;
        } else if (nameInput.value.trim().length < 2) {
            setError(nameInput, 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Email validation
        if (emailInput.value.trim() === '') {
            setError(emailInput, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            setError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Subject validation
        if (subjectInput.value.trim() === '') {
            setError(subjectInput, 'Subject is required');
            isValid = false;
        } else if (subjectInput.value.trim().length < 5) {
            setError(subjectInput, 'Subject must be at least 5 characters');
            isValid = false;
        }
        
        // Message validation
        if (messageInput.value.trim() === '') {
            setError(messageInput, 'Message is required');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            setError(messageInput, 'Message must be at least 10 characters');
            isValid = false;
        }
        
        return isValid;
    }

    /**
     * Create and show a notification
     * @param {string} message - Message to display
     * @param {string} type - Type of notification ('success' or 'error')
     */
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add notification to body
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    /**
     * Handle form submission
     * @param {Event} e - Submit event
     */
    function handleSubmit(e) {
        e.preventDefault();
        
        // Validate all inputs
        if (!validateForm()) {
            return; // Stop if validation fails
        }
        
        // Normally, here you would send the form data to a server
        // For this portfolio demo, we'll simulate a successful submission
        
        // Collect form data
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            subject: subjectInput.value.trim(),
            message: messageInput.value.trim()
        };
        
        // Log form data (in a real project, this would be sent to a server)
        console.log('Form submitted:', formData);
        
        // Show success message to user
        showNotification('Your message has been sent successfully!', 'success');
        
        // Reset form fields
        contactForm.reset();
    }

    /**
     * Add CSS styles for notifications
     */
    function addNotificationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 4px;
                color: white;
                font-weight: 500;
                z-index: 9999;
                transform: translateY(100px);
                opacity: 0;
                transition: transform 0.3s ease, opacity 0.3s ease;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }
            
            .notification.show {
                transform: translateY(0);
                opacity: 1;
            }
            
            .notification.success {
                background-color: #2ecc71;
            }
            
            .notification.error {
                background-color: #e74c3c;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Initialize the form validation and submission handling
     */
    function init() {
        // Add event listeners
        contactForm.addEventListener('submit', handleSubmit);
        
        // Real-time validation on blur
        nameInput.addEventListener('blur', () => {
            if (nameInput.value.trim() !== '') {
                if (nameInput.value.trim().length < 2) {
                    setError(nameInput, 'Name must be at least 2 characters');
                } else {
                    clearError(nameInput);
                }
            }
        });
        
        emailInput.addEventListener('blur', () => {
            if (emailInput.value.trim() !== '') {
                if (!isValidEmail(emailInput.value.trim())) {
                    setError(emailInput, 'Please enter a valid email address');
                } else {
                    clearError(emailInput);
                }
            }
        });
        
        // Add notification styles
        addNotificationStyles();
    }

    // Initialize form validation
    if (contactForm) {
        init();
    }
});
