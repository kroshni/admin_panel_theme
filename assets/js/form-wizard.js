/**
 * Vertical Form Wizard JS - Handles multi-step form validation, navigation, and save functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const wizardForm = document.getElementById('wizard-form');
    const stepContents = document.querySelectorAll('.step-content');
    const stepItems = document.querySelectorAll('.step-item');
    
    // Navigation buttons
    const prevButtons = document.querySelectorAll('.prev-step');
    const nextButtons = document.querySelectorAll('.next-step');
    const saveButtons = document.querySelectorAll('.save-step');
    const submitButton = document.getElementById('submit-form');
    
    let currentStep = 0;
    const totalSteps = stepContents.length;
    
    // Initialize form
    function initForm() {
        // Add event listeners to step items for direct navigation
        stepItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                goToStep(index);
            });
        });
        
        // Add event listeners to navigation buttons
        prevButtons.forEach(btn => {
            btn.addEventListener('click', prevStep);
        });
        
        nextButtons.forEach(btn => {
            btn.addEventListener('click', nextStep);
        });
        
        // Add event listeners to save buttons
        saveButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const stepNumber = parseInt(this.getAttribute('data-step'));
                saveStep(stepNumber - 1); // Convert to 0-based index
            });
        });
        
        // Add event listener to submit button
        if (submitButton) {
            submitButton.addEventListener('click', function(e) {
                e.preventDefault();
                submitForm();
            });
        }
        
        // Initialize summary data when form loads
        updateSummary();
    }
    
    // Show the specified step and hide others
    function showStep(stepIndex) {
        stepContents.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });
        
        // Update step indicators
        stepItems.forEach((item, index) => {
            item.classList.toggle('active', index === stepIndex);
        });
    }
    
    // Go to previous step
    function prevStep() {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    }
    
    // Validate current step and go to next if valid
    function nextStep() {
        if (validateStep(currentStep)) {
            if (currentStep < totalSteps - 1) {
                currentStep++;
                showStep(currentStep);
                
                // Update summary when going to the last step
                if (currentStep === totalSteps - 1) {
                    updateSummary();
                }
            }
        }
    }
    
    // Go to a specific step (used for direct navigation)
    function goToStep(stepIndex) {
        // Allow direct navigation to any step
        currentStep = stepIndex;
        showStep(currentStep);
        
        // Update summary when going to the last step
        if (currentStep === totalSteps - 1) {
            updateSummary();
        }
    }
    
    // Save the current step
    function saveStep(stepIndex) {
        if (validateStep(stepIndex)) {
            // Show success notification
            showNotification('success', `Step ${stepIndex + 1} saved successfully`);
        }
    }
    
    // Validate the specified step
    function validateStep(stepIndex) {
        const currentStepEl = stepContents[stepIndex];
        const inputs = currentStepEl.querySelectorAll('input, select, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            // Reset validation state
            input.classList.remove('is-invalid');
            
            // Check required fields
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.classList.add('is-invalid');
            }
            
            // Check email format
            if (input.type === 'email' && input.value.trim() && !isValidEmail(input.value)) {
                isValid = false;
                input.classList.add('is-invalid');
            }
            
            // Check password length
            if (input.id === 'wizardPassword' && input.value.trim() && input.value.length < 6) {
                isValid = false;
                input.classList.add('is-invalid');
            }
            
            // Check password confirmation
            if (input.id === 'confirmPassword') {
                const password = document.getElementById('wizardPassword');
                if (password && input.value !== password.value) {
                    isValid = false;
                    input.classList.add('is-invalid');
                }
            }
        });
        
        // If validation fails, show notification
        if (!isValid) {
            showNotification('error', 'Please fill in all required fields correctly');
        }
        
        return isValid;
    }
    
    // Update summary information on the last step
    function updateSummary() {
        // Personal Information
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        document.getElementById('summary-name').textContent = `${firstName} ${lastName}`;
        
        const dob = document.getElementById('dob').value;
        document.getElementById('summary-dob').textContent = dob;
        
        const gender = document.getElementById('gender');
        document.getElementById('summary-gender').textContent = gender.options[gender.selectedIndex]?.text || '';
        
        // Contact Details
        document.getElementById('summary-email').textContent = document.getElementById('email').value;
        document.getElementById('summary-phone').textContent = document.getElementById('phone').value;
        
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const state = document.getElementById('state');
        const stateText = state.options[state.selectedIndex]?.text || '';
        const zip = document.getElementById('zip').value;
        document.getElementById('summary-address').textContent = `${address}, ${city}, ${stateText} ${zip}`;
        
        // Account Information
        document.getElementById('summary-username').textContent = document.getElementById('username').value;
        
        const accountType = document.getElementById('accountType');
        document.getElementById('summary-account-type').textContent = accountType.options[accountType.selectedIndex]?.text || '';
    }
    
    // Submit the form
    function submitForm() {
        if (validateStep(currentStep)) {
            // Show loader
            showGlobalLoader();
            
            // Simulate form submission
            setTimeout(function() {
                hideGlobalLoader();
                
                // Show success message
                Swal.fire({
                    title: 'Success!',
                    text: 'Form submitted successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    // Reset form
                    wizardForm.reset();
                    currentStep = 0;
                    showStep(currentStep);
                    
                    // Remove validation classes
                    const inputs = wizardForm.querySelectorAll('input, select, textarea');
                    inputs.forEach(input => {
                        input.classList.remove('is-invalid', 'is-valid');
                    });
                });
            }, 1500);
        }
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Initialize the form
    if (wizardForm) {
        initForm();
    }
});