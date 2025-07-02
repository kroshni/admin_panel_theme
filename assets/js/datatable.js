/**
 * DataTable JS - Handles all DataTable functionality
 */

// Show global loader
function showLoader() {
    $('#global-loader').fadeIn(100);
}

// Hide global loader
function hideLoader() {
    $('#global-loader').fadeOut(100);
}

// Show notification
function showNotification(type, message) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

    Toast.fire({
        icon: type, // 'success', 'error', 'warning', 'info'
        title: message
    });
}

// Sample data for users table
const usersData = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", created: "2023-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active", created: "2023-02-20" },
    { id: 3, name: "Robert Johnson", email: "robert@example.com", role: "User", status: "Inactive", created: "2023-03-10" },
    { id: 4, name: "Emily Davis", email: "emily@example.com", role: "User", status: "Active", created: "2023-03-15" },
    { id: 5, name: "Michael Wilson", email: "michael@example.com", role: "Guest", status: "Pending", created: "2023-04-05" },
    { id: 6, name: "Sarah Brown", email: "sarah@example.com", role: "Editor", status: "Active", created: "2023-04-20" },
    { id: 7, name: "David Miller", email: "david@example.com", role: "User", status: "Inactive", created: "2023-05-12" },
    { id: 8, name: "Jennifer Taylor", email: "jennifer@example.com", role: "User", status: "Active", created: "2023-05-25" },
    { id: 9, name: "Thomas Anderson", email: "thomas@example.com", role: "Admin", status: "Active", created: "2023-06-10" },
    { id: 10, name: "Lisa White", email: "lisa@example.com", role: "Guest", status: "Pending", created: "2023-06-30" }
];

// Sample data for products table
const productsData = [
    { id: 1, name: "Laptop Pro X", category: "Electronics", price: 1299.99, stock: 45, status: "In Stock" },
    { id: 2, name: "Smartphone Ultra", category: "Electronics", price: 899.99, stock: 78, status: "In Stock" },
    { id: 3, name: "Wireless Headphones", category: "Electronics", price: 199.99, stock: 0, status: "Out of Stock" },
    { id: 4, name: "Cotton T-Shirt", category: "Clothing", price: 24.99, stock: 120, status: "In Stock" },
    { id: 5, name: "Designer Jeans", category: "Clothing", price: 89.99, stock: 35, status: "In Stock" },
    { id: 6, name: "Organic Coffee Beans", category: "Food", price: 15.99, stock: 200, status: "In Stock" },
    { id: 7, name: "Bestseller Novel", category: "Books", price: 12.99, stock: 0, status: "Discontinued" },
    { id: 8, name: "Smart Watch", category: "Electronics", price: 249.99, stock: 18, status: "In Stock" },
    { id: 9, name: "Kitchen Blender", category: "Home", price: 79.99, stock: 0, status: "Out of Stock" },
    { id: 10, name: "Yoga Mat", category: "Sports", price: 29.99, stock: 65, status: "In Stock" }
];

// Initialize DataTables
$(document).ready(function() {
    // Initialize Users DataTable
    const usersTable = $('#usersTable').DataTable({
        data: usersData,
        columns: [
            { data: 'id' },
            { data: 'name' },
            { data: 'email' },
            { data: 'role' },
            { 
                data: 'status',
                render: function(data) {
                    let badgeClass = 'bg-success';
                    if (data === 'Inactive') badgeClass = 'bg-danger';
                    if (data === 'Pending') badgeClass = 'bg-warning';
                    return `<span class="badge ${badgeClass}">${data}</span>`;
                }
            },
            { data: 'created' },
            { 
                data: null,
                orderable: false,
                render: function(data, type, row) {
                    return `
                        <div class="d-flex">
                            <button class="btn btn-sm btn-primary me-2 edit-user-btn" data-id="${row.id}">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-danger delete-user-btn" data-id="${row.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `;
                }
            }
        ],
        responsive: true,
        lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
        pageLength: 5
    });

    // Initialize Products DataTable
    const productsTable = $('#productsTable').DataTable({
        data: productsData,
        columns: [
            { data: 'id' },
            { data: 'name' },
            { data: 'category' },
            { 
                data: 'price',
                render: function(data) {
                    return `$${parseFloat(data).toFixed(2)}`;
                }
            },
            { data: 'stock' },
            { 
                data: 'status',
                render: function(data) {
                    let badgeClass = 'bg-success';
                    if (data === 'Out of Stock') badgeClass = 'bg-danger';
                    if (data === 'Discontinued') badgeClass = 'bg-secondary';
                    return `<span class="badge ${badgeClass}">${data}</span>`;
                }
            },
            { 
                data: null,
                orderable: false,
                render: function(data, type, row) {
                    return `
                        <div class="d-flex">
                            <button class="btn btn-sm btn-primary me-2 edit-product-btn" data-id="${row.id}">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-danger delete-product-btn" data-id="${row.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `;
                }
            }
        ],
        responsive: true,
        lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
        pageLength: 5
    });

    // Handle Add User Form Submission
    $('#saveUserBtn').on('click', function() {
        const form = document.getElementById('addUserForm');
        
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
        }
        
        showLoader();
        
        // Simulate API call with setTimeout
        setTimeout(function() {
            // Get form data
            const name = $('#userName').val();
            const email = $('#userEmail').val();
            const role = $('#userRole').val();
            const status = $('#userStatus').val();
            
            // Create new user object
            const newUser = {
                id: usersData.length + 1,
                name: name,
                email: email,
                role: role,
                status: status,
                created: new Date().toISOString().split('T')[0]
            };
            
            // Add to data array
            usersData.push(newUser);
            
            // Add to DataTable and redraw
            usersTable.row.add(newUser).draw();
            
            // Reset form and close modal
            form.reset();
            form.classList.remove('was-validated');
            $('#addUserModal').modal('hide');
            
            hideLoader();
            showNotification('success', 'User added successfully!');
        }, 1000);
    });

    // Handle Edit User Button Click
    $('#usersTable').on('click', '.edit-user-btn', function() {
        const userId = $(this).data('id');
        const user = usersData.find(u => u.id === userId);
        
        if (user) {
            // Populate edit form
            $('#editUserId').val(user.id);
            $('#editUserName').val(user.name);
            $('#editUserEmail').val(user.email);
            $('#editUserRole').val(user.role);
            $('#editUserStatus').val(user.status);
            
            // Show modal
            $('#editUserModal').modal('show');
        }
    });

    // Handle Update User Form Submission
    $('#updateUserBtn').on('click', function() {
        const form = document.getElementById('editUserForm');
        
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
        }
        
        showLoader();
        
        // Simulate API call with setTimeout
        setTimeout(function() {
            // Get form data
            const id = parseInt($('#editUserId').val());
            const name = $('#editUserName').val();
            const email = $('#editUserEmail').val();
            const role = $('#editUserRole').val();
            const status = $('#editUserStatus').val();
            
            // Find user in data array
            const userIndex = usersData.findIndex(u => u.id === id);
            
            if (userIndex !== -1) {
                // Update user data
                usersData[userIndex] = {
                    ...usersData[userIndex],
                    name: name,
                    email: email,
                    role: role,
                    status: status
                };
                
                // Update DataTable
                usersTable.row(function(idx, data) {
                    return data.id === id;
                }).data(usersData[userIndex]).draw();
                
                // Close modal
                $('#editUserModal').modal('hide');
                
                hideLoader();
                showNotification('success', 'User updated successfully!');
            }
        }, 1000);
    });

    // Handle Delete User Button Click
    $('#usersTable').on('click', '.delete-user-btn', function() {
        const userId = $(this).data('id');
        
        // Store the ID and type for delete confirmation
        $('#confirmDeleteBtn').data('id', userId);
        $('#confirmDeleteBtn').data('type', 'user');
        
        // Show confirmation modal
        $('#deleteConfirmModal').modal('show');
    });

    // Handle Add Product Form Submission
    $('#saveProductBtn').on('click', function() {
        const form = document.getElementById('addProductForm');
        
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
        }
        
        showLoader();
        
        // Simulate API call with setTimeout
        setTimeout(function() {
            // Get form data
            const name = $('#productName').val();
            const category = $('#productCategory').val();
            const price = parseFloat($('#productPrice').val());
            const stock = parseInt($('#productStock').val());
            const status = $('#productStatus').val();
            
            // Create new product object
            const newProduct = {
                id: productsData.length + 1,
                name: name,
                category: category,
                price: price,
                stock: stock,
                status: status
            };
            
            // Add to data array
            productsData.push(newProduct);
            
            // Add to DataTable and redraw
            productsTable.row.add(newProduct).draw();
            
            // Reset form and close modal
            form.reset();
            form.classList.remove('was-validated');
            $('#addProductModal').modal('hide');
            
            hideLoader();
            showNotification('success', 'Product added successfully!');
        }, 1000);
    });

    // Handle Edit Product Button Click
    $('#productsTable').on('click', '.edit-product-btn', function() {
        const productId = $(this).data('id');
        const product = productsData.find(p => p.id === productId);
        
        if (product) {
            // Populate edit form
            $('#editProductId').val(product.id);
            $('#editProductName').val(product.name);
            $('#editProductCategory').val(product.category);
            $('#editProductPrice').val(product.price);
            $('#editProductStock').val(product.stock);
            $('#editProductStatus').val(product.status);
            
            // Show modal
            $('#editProductModal').modal('show');
        }
    });

    // Handle Update Product Form Submission
    $('#updateProductBtn').on('click', function() {
        const form = document.getElementById('editProductForm');
        
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
        }
        
        showLoader();
        
        // Simulate API call with setTimeout
        setTimeout(function() {
            // Get form data
            const id = parseInt($('#editProductId').val());
            const name = $('#editProductName').val();
            const category = $('#editProductCategory').val();
            const price = parseFloat($('#editProductPrice').val());
            const stock = parseInt($('#editProductStock').val());
            const status = $('#editProductStatus').val();
            
            // Find product in data array
            const productIndex = productsData.findIndex(p => p.id === id);
            
            if (productIndex !== -1) {
                // Update product data
                productsData[productIndex] = {
                    ...productsData[productIndex],
                    name: name,
                    category: category,
                    price: price,
                    stock: stock,
                    status: status
                };
                
                // Update DataTable
                productsTable.row(function(idx, data) {
                    return data.id === id;
                }).data(productsData[productIndex]).draw();
                
                // Close modal
                $('#editProductModal').modal('hide');
                
                hideLoader();
                showNotification('success', 'Product updated successfully!');
            }
        }, 1000);
    });

    // Handle Delete Product Button Click
    $('#productsTable').on('click', '.delete-product-btn', function() {
        const productId = $(this).data('id');
        
        // Store the ID and type for delete confirmation
        $('#confirmDeleteBtn').data('id', productId);
        $('#confirmDeleteBtn').data('type', 'product');
        
        // Show confirmation modal
        $('#deleteConfirmModal').modal('show');
    });

    // Handle Delete Confirmation
    $('#confirmDeleteBtn').on('click', function() {
        const id = $(this).data('id');
        const type = $(this).data('type');
        
        showLoader();
        
        // Simulate API call with setTimeout
        setTimeout(function() {
            if (type === 'user') {
                // Remove from users data array
                const userIndex = usersData.findIndex(u => u.id === id);
                if (userIndex !== -1) {
                    usersData.splice(userIndex, 1);
                    
                    // Remove from DataTable
                    usersTable.row(function(idx, data) {
                        return data.id === id;
                    }).remove().draw();
                    
                    // Close modal
                    $('#deleteConfirmModal').modal('hide');
                    
                    hideLoader();
                    showNotification('success', 'User deleted successfully!');
                }
            } else if (type === 'product') {
                // Remove from products data array
                const productIndex = productsData.findIndex(p => p.id === id);
                if (productIndex !== -1) {
                    productsData.splice(productIndex, 1);
                    
                    // Remove from DataTable
                    productsTable.row(function(idx, data) {
                        return data.id === id;
                    }).remove().draw();
                    
                    // Close modal
                    $('#deleteConfirmModal').modal('hide');
                    
                    hideLoader();
                    showNotification('success', 'Product deleted successfully!');
                }
            }
        }, 1000);
    });

    // Form validation for all forms
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
});