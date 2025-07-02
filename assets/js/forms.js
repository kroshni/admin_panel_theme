/**
 * Forms JS - Handles form validation and submission
 */

document.addEventListener('DOMContentLoaded', function() {
    // Basic Form Validation
    const basicForm = document.getElementById('basicForm');
    if (basicForm) {
        basicForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (!this.checkValidity()) {
                event.stopPropagation();
                this.classList.add('was-validated');
                showNotification('error', 'Please fill in all required fields correctly');
            } else {
                // Show loader
                showGlobalLoader();
                
                // Simulate form submission
                setTimeout(function() {
                    hideGlobalLoader();
                    showNotification('success', 'Form submitted successfully!');
                    
                    // Reset form
                    basicForm.classList.remove('was-validated');
                    basicForm.reset();
                }, 1500);
            }
        });
    }
    
    // Inline Form Validation
    const inlineForm = document.getElementById('inlineForm');
    if (inlineForm) {
        inlineForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (!this.checkValidity()) {
                event.stopPropagation();
                this.classList.add('was-validated');
                showNotification('error', 'Please fill in all required fields correctly');
            } else {
                // Show loader
                showGlobalLoader();
                
                // Simulate form submission
                setTimeout(function() {
                    hideGlobalLoader();
                    showNotification('success', 'Form submitted successfully!');
                    
                    // Reset form
                    inlineForm.classList.remove('was-validated');
                    inlineForm.reset();
                }, 1500);
            }
        });
    }
    
    // Horizontal Form Validation
    const horizontalForm = document.getElementById('horizontalForm');
    if (horizontalForm) {
        horizontalForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (!this.checkValidity()) {
                event.stopPropagation();
                this.classList.add('was-validated');
                showNotification('error', 'Please fill in all required fields correctly');
            } else {
                // Show loader
                showGlobalLoader();
                
                // Simulate form submission
                setTimeout(function() {
                    hideGlobalLoader();
                    showNotification('success', 'Form submitted successfully!');
                    
                    // Reset form
                    horizontalForm.classList.remove('was-validated');
                    horizontalForm.reset();
                }, 1500);
            }
        });
    }
    
    // Input Validation Examples
    const validationForm = document.getElementById('validationForm');
    if (validationForm) {
        // Custom validation for username
        const usernameInput = document.getElementById('validationUsername');
        if (usernameInput) {
            usernameInput.addEventListener('input', function() {
                const value = this.value.trim();
                const feedback = this.nextElementSibling;
                
                if (value.length > 0 && value.length < 4) {
                    this.setCustomValidity('Username must be at least 4 characters');
                    if (feedback) feedback.textContent = 'Username must be at least 4 characters';
                } else if (value.length > 20) {
                    this.setCustomValidity('Username must be less than 20 characters');
                    if (feedback) feedback.textContent = 'Username must be less than 20 characters';
                } else if (!/^[a-zA-Z0-9_]+$/.test(value) && value.length > 0) {
                    this.setCustomValidity('Username can only contain letters, numbers, and underscores');
                    if (feedback) feedback.textContent = 'Username can only contain letters, numbers, and underscores';
                } else {
                    this.setCustomValidity('');
                }
            });
        }
        
        // Custom validation for password
        const passwordInput = document.getElementById('validationPassword');
        if (passwordInput) {
            passwordInput.addEventListener('input', function() {
                const value = this.value;
                const feedback = this.nextElementSibling;
                
                if (value.length > 0 && value.length < 6) {
                    this.setCustomValidity('Password must be at least 6 characters');
                    if (feedback) feedback.textContent = 'Password must be at least 6 characters';
                } else if (!/[A-Z]/.test(value) && value.length > 0) {
                    this.setCustomValidity('Password must contain at least one uppercase letter');
                    if (feedback) feedback.textContent = 'Password must contain at least one uppercase letter';
                } else if (!/[0-9]/.test(value) && value.length > 0) {
                    this.setCustomValidity('Password must contain at least one number');
                    if (feedback) feedback.textContent = 'Password must contain at least one number';
                } else {
                    this.setCustomValidity('');
                }
            });
        }
        
        // Form submission
        validationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (!this.checkValidity()) {
                event.stopPropagation();
                this.classList.add('was-validated');
                showNotification('error', 'Please fill in all required fields correctly');
            } else {
                // Show loader
                showGlobalLoader();
                
                // Simulate form submission
                setTimeout(function() {
                    hideGlobalLoader();
                    showNotification('success', 'Form submitted successfully!');
                    
                    // Reset form
                    validationForm.classList.remove('was-validated');
                    validationForm.reset();
                }, 1500);
            }
        });
    }
    
    // File Upload Form
    const fileUploadForm = document.getElementById('fileUploadForm');
    if (fileUploadForm) {
        const fileInput = document.getElementById('formFile');
        const fileLabel = document.querySelector('.custom-file-label');
        
        if (fileInput) {
            fileInput.addEventListener('change', function() {
                const fileName = this.files[0] ? this.files[0].name : 'Choose file';
                if (fileLabel) {
                    fileLabel.textContent = fileName;
                }
            });
        }
        
        fileUploadForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (!this.checkValidity()) {
                event.stopPropagation();
                this.classList.add('was-validated');
                showNotification('error', 'Please select a file');
            } else {
                // Show loader
                showGlobalLoader();
                
                // Simulate file upload
                setTimeout(function() {
                    hideGlobalLoader();
                    showNotification('success', 'File uploaded successfully!');
                    
                    // Reset form
                    fileUploadForm.classList.remove('was-validated');
                    fileUploadForm.reset();
                    if (fileLabel) {
                        fileLabel.textContent = 'Choose file';
                    }
                }, 2000);
            }
        });
    }
    
    // Toggle Password Visibility
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const passwordInput = document.getElementById(targetId);
            
            if (passwordInput) {
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    this.innerHTML = '<i class="fas fa-eye-slash"></i>';
                } else {
                    passwordInput.type = 'password';
                    this.innerHTML = '<i class="fas fa-eye"></i>';
                }
            }
        });
    });
    
    // Initialize all tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});