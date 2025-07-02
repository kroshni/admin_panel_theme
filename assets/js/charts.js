/**
 * Charts JS - Handles chart initialization and data
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts when DOM is loaded
    initAreaChart();
    initPieChart();
    initBarChart();
});

/**
 * Initialize Area Chart for Monthly Overview
 */
function initAreaChart() {
    const ctx = document.getElementById('monthlyOverviewChart');
    if (!ctx) return;
    
    // Sample data for monthly overview
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Revenue',
                data: [18000, 21000, 25000, 19000, 22000, 28000, 30000, 32000, 28000, 26000, 29000, 33000],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Expenses',
                data: [12000, 15000, 14000, 12500, 16000, 19000, 22000, 20000, 18000, 16000, 20000, 21000],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.4,
                fill: true
            }
        ]
    };
    
    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

/**
 * Initialize Pie Chart for Revenue Sources
 */
function initPieChart() {
    const ctx = document.getElementById('revenueSourcesChart');
    if (!ctx) return;
    
    // Sample data for revenue sources
    const data = {
        labels: ['Direct Sales', 'Online Store', 'Referral', 'Social Media', 'Other'],
        datasets: [{
            data: [35, 30, 15, 12, 8],
            backgroundColor: [
                'rgba(54, 162, 235, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };
    
    new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${percentage}%`;
                        }
                    }
                }
            },
            cutout: '70%'
        }
    });
}

/**
 * Initialize Bar Chart for Weekly Sales
 */
function initBarChart() {
    const ctx = document.getElementById('weeklySalesChart');
    if (!ctx) return;
    
    // Sample data for weekly sales
    const data = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
            label: 'Sales',
            data: [12, 19, 15, 8, 22, 14, 9],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };
    
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y + ' orders';
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 5
                    }
                }
            }
        }
    });
}