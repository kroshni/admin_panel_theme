/**
 * Form Repeater JS - Handles dynamic addition and removal of form fields
 */

document.addEventListener('DOMContentLoaded', function() {
    // Basic Contact Repeater
    initRepeater('contact-repeater', {
        addButtonSelector: '#add-contact',
        removeButtonSelector: '.remove-item',
        itemSelector: '.repeater-item',
        minItems: 1,
        maxItems: 5
    });
    
    // Product Order Repeater with calculations
    initRepeater('order-repeater', {
        addButtonSelector: '#add-product',
        removeButtonSelector: '.remove-item',
        itemSelector: '.repeater-item',
        minItems: 1,
        maxItems: 10,
        afterAdd: updateTotals,
        afterRemove: updateTotals,
        onChange: function(item) {
            // Update item total when quantity or price changes
            const quantity = parseFloat(item.querySelector('.quantity-input').value) || 0;
            const price = parseFloat(item.querySelector('.price-input').value) || 0;
            const totalEl = item.querySelector('.item-total');
            
            if (totalEl) {
                const total = quantity * price;
                totalEl.value = '$' + total.toFixed(2);
            }
            
            // Update grand total
            updateTotals();
        }
    });
    
    // Education Repeater
    initRepeater('education-repeater', {
        addButtonSelector: '#add-education',
        removeButtonSelector: '.remove-item',
        itemSelector: '.repeater-item',
        minItems: 1,
        maxItems: 5
    });
    
    // Experience Repeater
    initRepeater('experience-repeater', {
        addButtonSelector: '#add-experience',
        removeButtonSelector: '.remove-item',
        itemSelector: '.repeater-item',
        minItems: 1,
        maxItems: 5,
        afterAdd: function(newItem) {
            // Get the index of the new item
            const index = newItem.dataset.index;
            
            // Initialize nested repeater for responsibilities
            initRepeater(`responsibilities-repeater-${index}`, {
                addButtonSelector: `.add-nested-item[data-parent-index="${index}"]`,
                removeButtonSelector: `.remove-nested-item[data-parent-index="${index}"]`,
                itemSelector: `.nested-repeater-item[data-parent-index="${index}"]`,
                minItems: 1,
                maxItems: 5
            });
        }
    });
    
    // Initialize existing nested repeaters for responsibilities
    document.querySelectorAll('[id^="responsibilities-repeater-"]').forEach(function(repeater) {
        const parentIndex = repeater.id.split('-').pop();
        initRepeater(repeater.id, {
            addButtonSelector: `.add-nested-item[data-parent-index="${parentIndex}"]`,
            removeButtonSelector: `.remove-nested-item[data-parent-index="${parentIndex}"]`,
            itemSelector: `.nested-repeater-item[data-parent-index="${parentIndex}"]`,
            minItems: 1,
            maxItems: 5
        });
    });
    
    // Submit handler for all forms
    document.querySelectorAll('form').forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loader
            showGlobalLoader();
            
            // Simulate form submission
            setTimeout(function() {
                hideGlobalLoader();
                
                // Show success message
                showNotification('success', 'Form submitted successfully!');
                
                // Optionally reset the form
                // form.reset();
            }, 1500);
        });
    });
});

/**
 * Initialize a repeater component
 * @param {string} repeaterId - The ID of the repeater container
 * @param {Object} options - Configuration options
 */
function initRepeater(repeaterId, options) {
    const defaults = {
        addButtonSelector: '.add-item',
        removeButtonSelector: '.remove-item',
        itemSelector: '.repeater-item',
        minItems: 1,
        maxItems: 10,
        afterAdd: null,
        afterRemove: null,
        onChange: null
    };
    
    // Merge options with defaults
    const settings = Object.assign({}, defaults, options);
    
    // Get repeater elements
    const repeater = document.getElementById(repeaterId);
    if (!repeater) return;
    
    // Look for add button in the document instead of just within the repeater
    const addButton = document.querySelector(settings.addButtonSelector);
    const items = repeater.querySelectorAll(settings.itemSelector);
    
    // Initialize remove buttons for existing items
    items.forEach(function(item, index) {
        const removeButton = item.querySelector(settings.removeButtonSelector);
        if (removeButton) {
            removeButton.addEventListener('click', function() {
                removeItem(item);
            });
        }
        
        // Add index to item for identification
        item.dataset.index = index;
        
        // Add change event listeners to inputs
        if (settings.onChange) {
            const inputs = item.querySelectorAll('input, select, textarea');
            inputs.forEach(function(input) {
                input.addEventListener('input', function() {
                    settings.onChange(item);
                });
                input.addEventListener('change', function() {
                    settings.onChange(item);
                });
            });
        }
    });
    
    // Add button click handler
    if (addButton) {
        addButton.addEventListener('click', function() {
            addItem();
        });
    }
    
    // Add a new item
    function addItem() {
        const currentItems = repeater.querySelectorAll(settings.itemSelector);
        
        // Check if maximum items reached
        if (currentItems.length >= settings.maxItems) {
            showNotification('warning', `Maximum of ${settings.maxItems} items allowed`);
            return;
        }
        
        // Clone the first item
        const firstItem = repeater.querySelector(settings.itemSelector);
        if (!firstItem) return;
        
        const newItem = firstItem.cloneNode(true);
        
        // Clear input values
        newItem.querySelectorAll('input, select, textarea').forEach(function(input) {
            if (input.type === 'checkbox' || input.type === 'radio') {
                input.checked = false;
            } else {
                input.value = '';
            }
        });
        
        // Update index
        const newIndex = currentItems.length;
        newItem.dataset.index = newIndex;
        
        // Update any labels or IDs with the new index
        newItem.querySelectorAll('label').forEach(function(label) {
            if (label.htmlFor) {
                const forAttr = label.htmlFor;
                label.htmlFor = forAttr.replace(/\d+$/, newIndex);
            }
        });
        
        newItem.querySelectorAll('input, select, textarea').forEach(function(input) {
            if (input.id) {
                input.id = input.id.replace(/\d+$/, newIndex);
            }
            if (input.name) {
                input.name = input.name.replace(/\[\d+\]/, `[${newIndex}]`);
            }
        });
        
        // Add remove button event listener
        const removeButton = newItem.querySelector(settings.removeButtonSelector);
        if (removeButton) {
            removeButton.addEventListener('click', function() {
                removeItem(newItem);
            });
        }
        
        // Add change event listeners to inputs
        if (settings.onChange) {
            const inputs = newItem.querySelectorAll('input, select, textarea');
            inputs.forEach(function(input) {
                input.addEventListener('input', function() {
                    settings.onChange(newItem);
                });
                input.addEventListener('change', function() {
                    settings.onChange(newItem);
                });
            });
        }
        
        // Append the new item
        if (addButton.parentNode === repeater) {
            repeater.insertBefore(newItem, addButton);
        } else {
            repeater.appendChild(newItem);
        }
        
        // Call afterAdd callback if provided
        if (typeof settings.afterAdd === 'function') {
            settings.afterAdd(newItem);
        }
        
        // Show notification
        showNotification('success', 'New item added');
    }
    
    // Remove an item
    function removeItem(item) {
        const currentItems = repeater.querySelectorAll(settings.itemSelector);
        
        // Check if minimum items reached
        if (currentItems.length <= settings.minItems) {
            showNotification('warning', `Minimum of ${settings.minItems} items required`);
            return;
        }
        
        // Remove the item
        repeater.removeChild(item);
        
        // Reindex remaining items
        repeater.querySelectorAll(settings.itemSelector).forEach(function(item, index) {
            item.dataset.index = index;
        });
        
        // Call afterRemove callback if provided
        if (typeof settings.afterRemove === 'function') {
            settings.afterRemove();
        }
        
        // Show notification
        showNotification('info', 'Item removed');
    }
}

/**
 * Update totals for product order repeater
 */
function updateTotals() {
    const orderRepeater = document.getElementById('order-repeater');
    if (!orderRepeater) return;
    
    let subtotal = 0;
    
    // Calculate subtotal from all product items
    orderRepeater.querySelectorAll('.repeater-item').forEach(function(item) {
        const quantity = parseFloat(item.querySelector('.quantity-input').value) || 0;
        const price = parseFloat(item.querySelector('.price-input').value) || 0;
        subtotal += quantity * price;
    });
    
    // Update subtotal display
    const subtotalEl = document.getElementById('order-subtotal');
    if (subtotalEl) {
        subtotalEl.textContent = '$' + subtotal.toFixed(2);
    }
    
    // Calculate tax (assuming 10%)
    const tax = subtotal * 0.1;
    const taxEl = document.getElementById('order-tax');
    if (taxEl) {
        taxEl.textContent = '$' + tax.toFixed(2);
    }
    
    // Calculate grand total
    const grandTotal = subtotal + tax;
    const grandTotalEl = document.getElementById('order-total');
    if (grandTotalEl) {
        grandTotalEl.textContent = '$' + grandTotal.toFixed(2);
    }
}