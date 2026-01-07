// Main JavaScript for Business Analytics Dashboard
// Handles mobile menu, notifications, and common functionality

document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function () {
            sidebar.classList.toggle('active');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function (event) {
            const isClickInside = sidebar.contains(event.target) || menuToggle.contains(event.target);

            if (!isClickInside && window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    }

    // Active nav link highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });

    // Simulated real-time notifications
    initNotifications();

    // Export functionality for tables
    initTableExport();
});

// Notification System
function initNotifications() {
    // Simulate real-time notifications
    const notifications = [
        { type: 'success', message: 'New user registered', time: 'Just now' },
        { type: 'info', message: 'Report generated successfully', time: '5 min ago' },
        { type: 'warning', message: 'Server response time increased', time: '15 min ago' }
    ];

    // This could be expanded to show toast notifications
    console.log('Notifications initialized:', notifications);
}

// Table Export Functionality
function initTableExport() {
    const exportButtons = document.querySelectorAll('[data-export]');

    exportButtons.forEach(button => {
        button.addEventListener('click', function () {
            const format = this.getAttribute('data-export');
            const tableId = this.getAttribute('data-table');

            if (format === 'csv') {
                exportTableToCSV(tableId);
            } else if (format === 'excel') {
                console.log('Excel export would be implemented here');
            }
        });
    });
}

// Export table to CSV
function exportTableToCSV(tableId) {
    const table = document.querySelector(`#${tableId} table`) || document.querySelector('.table');
    if (!table) return;

    let csv = [];
    const rows = table.querySelectorAll('tr');

    rows.forEach(row => {
        const cols = row.querySelectorAll('td, th');
        const csvRow = [];

        cols.forEach(col => {
            csvRow.push('"' + col.innerText.replace(/"/g, '""') + '"');
        });

        csv.push(csvRow.join(','));
    });

    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `export-${Date.now()}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Format date
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(new Date(date));
}

// Debounce function for search and filters
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Show loading state
function showLoading(element) {
    if (element) {
        element.classList.add('loading');
    }
}

// Hide loading state
function hideLoading(element) {
    if (element) {
        element.classList.remove('loading');
    }
}

// Toast notification (simple implementation)
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerText = message;
    toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    padding: 1rem 1.5rem;
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
