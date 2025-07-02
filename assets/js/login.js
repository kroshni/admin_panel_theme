/**
 * Login JS - Handles login form validation and submission
 */

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form inputs
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            
            // Basic validation
            let isValid = true;
            let errorMessage = '';
            
            // Email validation
            if (!email) {
                isValid = false;
                errorMessage = 'Email is required';
                document.getElementById('email').classList.add('is-invalid');
            } else if (!isValidEmail(email)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
                document.getElementById('email').classList.add('is-invalid');
            } else {
                document.getElementById('email').classList.remove('is-invalid');
                document.getElementById('email').classList.add('is-valid');
            }
            
            // Password validation
            if (!password) {
                isValid = false;
                errorMessage = errorMessage || 'Password is required';
                document.getElementById('password').classList.add('is-invalid');
            } else if (password.length < 6) {
                isValid = false;
                errorMessage = errorMessage || 'Password must be at least 6 characters';
                document.getElementById('password').classList.add('is-invalid');
            } else {
                document.getElementById('password').classList.remove('is-invalid');
                document.getElementById('password').classList.add('is-valid');
            }
            
            // If form is valid, proceed with login
            if (isValid) {
                // Show loader
                showGlobalLoader();
                
                // Simulate API call with setTimeout
                setTimeout(function() {
                    // For demo purposes, hardcode a valid login
                    if (email === 'admin@example.com' && password === 'password') {
                        // Success - redirect to dashboard
                        showNotification('success', 'Login successful!');
                        
                        // Redirect after a short delay
                        setTimeout(function() {
                            window.location.href = 'dashboard.html';
                        }, 1000);
                    } else {
                        // Error - show notification
                        hideGlobalLoader();
                        showNotification('error', 'Invalid email or password');
                    }
                }, 1500); // Simulate network delay
            } else {
                // Show error notification
                showNotification('error', errorMessage);
            }
        });
        
        // Clear validation on input
        const inputs = loginForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('is-invalid');
            });
        });
    }
    
    // Helper function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});