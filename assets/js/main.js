/**
 * Main JS - Common functionality across all pages
 */

document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

    // Add active class to current page in sidebar
    const currentPage = window.location.pathname.split('/').pop();
    const sidebarLinks = document.querySelectorAll('#sidebar-wrapper .list-group-item');
    
    sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Global AJAX setup for loader (if using AJAX)
    if (typeof $ !== 'undefined' && $.ajax) {
        $(document).ajaxStart(function() {
            $('#global-loader').fadeIn(100);
        });
        
        $(document).ajaxStop(function() {
            $('#global-loader').fadeOut(100);
        });
    }

    // Simulate page load for demo purposes
    $('#global-loader').fadeIn(100);
    setTimeout(function() {
        $('#global-loader').fadeOut(100);
    }, 500);
});

// Function to show global loader
function showGlobalLoader() {
    document.getElementById('global-loader').style.display = 'flex';
}

// Function to hide global loader
function hideGlobalLoader() {
    document.getElementById('global-loader').style.display = 'none';
}

// Function to show notification using SweetAlert2
function showNotification(type, message) {
    if (typeof Swal !== 'undefined') {
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
}