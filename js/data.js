// Data Management and Filter Functionality
// Business Analytics Dashboard - Enhanced Features

console.log('data.js loaded');

// Sample data for demonstration
const sampleTransactions = [
    { id: 'TXN-001245', customer: 'John Smith', email: 'john.smith@example.com', product: 'Premium Plan', amount: 299, status: 'completed', date: '2024-01-06' },
    { id: 'TXN-001244', customer: 'Sarah Johnson', email: 'sarah.j@example.com', product: 'Basic Plan', amount: 99, status: 'completed', date: '2024-01-06' },
    { id: 'TXN-001243', customer: 'Michael Brown', email: 'm.brown@example.com', product: 'Enterprise Plan', amount: 599, status: 'pending', date: '2024-01-05' },
    { id: 'TXN-001242', customer: 'Emily Davis', email: 'emily.davis@example.com', product: 'Starter Plan', amount: 49, status: 'completed', date: '2024-01-05' },
    { id: 'TXN-001241', customer: 'David Wilson', email: 'd.wilson@example.com', product: 'Premium Plan', amount: 299, status: 'failed', date: '2024-01-05' },
    { id: 'TXN-001240', customer: 'Lisa Anderson', email: 'lisa.a@example.com', product: 'Basic Plan', amount: 99, status: 'completed', date: '2024-01-04' },
    { id: 'TXN-001239', customer: 'Robert Taylor', email: 'r.taylor@example.com', product: 'Premium Plan', amount: 299, status: 'completed', date: '2024-01-04' },
    { id: 'TXN-001238', customer: 'Jennifer Martinez', email: 'j.martinez@example.com', product: 'Enterprise Plan', amount: 599, status: 'completed', date: '2024-01-04' },
    { id: 'TXN-001237', customer: 'William Garcia', email: 'w.garcia@example.com', product: 'Starter Plan', amount: 49, status: 'pending', date: '2024-01-03' },
    { id: 'TXN-001236', customer: 'Mary Rodriguez', email: 'mary.r@example.com', product: 'Basic Plan', amount: 99, status: 'completed', date: '2024-01-03' },
    { id: 'TXN-001235', customer: 'James White', email: 'james.w@example.com', product: 'Premium Plan', amount: 299, status: 'completed', date: '2024-01-03' },
    { id: 'TXN-001234', customer: 'Patricia Harris', email: 'p.harris@example.com', product: 'Enterprise Plan', amount: 599, status: 'failed', date: '2024-01-02' },
    { id: 'TXN-001233', customer: 'Christopher Lee', email: 'chris.lee@example.com', product: 'Basic Plan', amount: 99, status: 'completed', date: '2024-01-02' },
    { id: 'TXN-001232', customer: 'Barbara Clark', email: 'b.clark@example.com', product: 'Starter Plan', amount: 49, status: 'completed', date: '2024-01-02' },
    { id: 'TXN-001231', customer: 'Daniel Lewis', email: 'd.lewis@example.com', product: 'Premium Plan', amount: 299, status: 'pending', date: '2024-01-01' }
];

console.log('Sample transactions loaded:', sampleTransactions.length);

// Store original data
let allTransactions = [...sampleTransactions];
let filteredTransactions = [...sampleTransactions];

// Filter state
let currentFilters = {
    dateRange: '30',
    status: 'all',
    product: 'all',
    search: ''
};

// Initialize data filters
function initializeFilters() {
    console.log('Initializing filters...');

    const dateRangeSelect = document.getElementById('dateRangeFilter');
    const statusSelect = document.getElementById('statusFilter');
    const productSelect = document.getElementById('productFilter');
    const searchInput = document.getElementById('searchFilter');

    if (dateRangeSelect) {
        console.log('Date range filter found');
        dateRangeSelect.addEventListener('change', function () {
            currentFilters.dateRange = this.value;
            applyFilters();
        });
    }

    if (statusSelect) {
        console.log('Status filter found');
        statusSelect.addEventListener('change', function () {
            currentFilters.status = this.value.toLowerCase();
            applyFilters();
        });
    }

    if (productSelect) {
        console.log('Product filter found');
        productSelect.addEventListener('change', function () {
            currentFilters.product = this.value;
            applyFilters();
        });
    }

    if (searchInput) {
        console.log('Search filter found');
        if (typeof debounce !== 'undefined') {
            searchInput.addEventListener('input', debounce(function () {
                currentFilters.search = this.value.toLowerCase();
                applyFilters();
            }, 300));
        } else {
            console.error('debounce function not found!');
        }
    }
}

// Apply all filters
function applyFilters() {
    console.log('Applying filters:', currentFilters);

    filteredTransactions = allTransactions.filter(transaction => {
        // Date range filter
        if (currentFilters.dateRange !== 'all') {
            const transactionDate = new Date(transaction.date);
            const today = new Date();
            const daysAgo = new Date(today.setDate(today.getDate() - parseInt(currentFilters.dateRange)));

            if (transactionDate < daysAgo) {
                return false;
            }
        }

        // Status filter
        if (currentFilters.status !== 'all' && transaction.status !== currentFilters.status) {
            return false;
        }

        // Product filter
        if (currentFilters.product !== 'all' && currentFilters.product !== 'All Products' && transaction.product !== currentFilters.product) {
            return false;
        }

        // Search filter
        if (currentFilters.search) {
            const searchLower = currentFilters.search;
            return (
                transaction.id.toLowerCase().includes(searchLower) ||
                transaction.customer.toLowerCase().includes(searchLower) ||
                transaction.email.toLowerCase().includes(searchLower) ||
                transaction.product.toLowerCase().includes(searchLower)
            );
        }

        return true;
    });

    console.log('Filtered transactions:', filteredTransactions.length);
    renderTable();
    updateSummaryStats();

    // Show toast if function exists
    if (typeof showToast === 'function') {
        showToast(`Filters applied: ${filteredTransactions.length} transactions found`, 'success');
    }
}

// Render table with filtered data
function renderTable() {
    const tableBody = document.querySelector('#reportsTable tbody');
    if (!tableBody) {
        console.error('Table body not found!');
        return;
    }

    console.log('Rendering table with', filteredTransactions.length, 'transactions');

    if (filteredTransactions.length === 0) {
        tableBody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: var(--spacing-xl); color: var(--text-secondary);">
          <i class="fas fa-inbox" style="font-size: 2rem; margin-bottom: var(--spacing-md); display: block;"></i>
          No transactions found matching your filters.
        </td>
      </tr>
    `;
        return;
    }

    // Get data to render (paginated if function exists)
    const dataToRender = typeof getPaginatedData === 'function' ? getPaginatedData() : filteredTransactions;

    tableBody.innerHTML = dataToRender.map(transaction => `
    <tr>
      <td>#${transaction.id}</td>
      <td>${transaction.customer}</td>
      <td>${transaction.email}</td>
      <td>${transaction.product}</td>
      <td>$${transaction.amount.toFixed(2)}</td>
      <td><span class="badge badge-${getBadgeClass(transaction.status)}">${capitalizeFirst(transaction.status)}</span></td>
      <td>${typeof formatDate !== 'undefined' ? formatDate(transaction.date) : transaction.date}</td>
      <td>
        <button class="button button-secondary button-icon" onclick="window.location.href='../reports/view.html'">
          <i class="fas fa-eye"></i>
        </button>
      </td>
    </tr>
  `).join('');

    // Update pagination info if function exists
    if (typeof updatePaginationInfo === 'function') {
        updatePaginationInfo();
    }

    console.log('Table rendered successfully with', dataToRender.length, 'rows');
}

// Update summary statistics  
function updateSummaryStats() {
    const totalRevenue = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
    const avgTransaction = filteredTransactions.length > 0 ? totalRevenue / filteredTransactions.length : 0;
    const successRate = filteredTransactions.length > 0
        ? (filteredTransactions.filter(t => t.status === 'completed').length / filteredTransactions.length * 100)
        : 0;

    console.log('Summary stats:', { totalRevenue, avgTransaction, successRate });

    // Update summary cards if they exist
    const summaryCards = document.querySelectorAll('.card-glass');
    summaryCards.forEach(card => {
        const title = card.querySelector('.card-title');
        if (title) {
            const value = card.querySelector('div[style*="font-size: var(--font-size-2xl)"]');
            if (value) {
                if (title.textContent.includes('Total Revenue')) {
                    value.textContent = `$${totalRevenue.toLocaleString()}`;
                } else if (title.textContent.includes('Average Transaction')) {
                    value.textContent = `$${avgTransaction.toFixed(2)}`;
                } else if (title.textContent.includes('Success Rate')) {
                    value.textContent = `${successRate.toFixed(1)}%`;
                }
            }
        }
    });

    // Update showing text
    const showingElements = document.querySelectorAll('.card-header ~ div');
    showingElements.forEach(showingText => {
        if (showingText && showingText.textContent.includes('Showing')) {
            showingText.innerHTML = `Showing <strong>${filteredTransactions.length}</strong> of <strong>${allTransactions.length}</strong> transactions`;
        }
    });
}

// Export to CSV
function exportToCSV() {
    const headers = ['Transaction ID', 'Customer', 'Email', 'Product', 'Amount', 'Status', 'Date'];
    const csvData = [
        headers.join(','),
        ...filteredTransactions.map(t =>
            `${t.id},${t.customer},${t.email},${t.product},$${t.amount},${t.status},${t.date}`
        )
    ].join('\n');

    downloadFile(csvData, 'transactions.csv', 'text/csv');
    if (typeof showToast === 'function') {
        showToast('CSV exported successfully!', 'success');
    }
}

// Export to Excel (using simple CSV with .xlsx extension)
function exportToExcel() {
    const headers = ['Transaction ID', 'Customer', 'Email', 'Product', 'Amount', 'Status', 'Date'];
    const csvData = [
        headers.join('\t'),
        ...filteredTransactions.map(t =>
            `${t.id}\t${t.customer}\t${t.email}\t${t.product}\t$${t.amount}\t${t.status}\t${t.date}`
        )
    ].join('\n');

    downloadFile(csvData, 'transactions.xlsx', 'application/vnd.ms-excel');
    if (typeof showToast === 'function') {
        showToast('Excel file exported successfully!', 'success');
    }
}

// Download file helper
function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
}

// Helper functions
function getBadgeClass(status) {
    const statusMap = {
        'completed': 'success',
        'pending': 'warning',
        'failed': 'danger'
    };
    return statusMap[status] || 'secondary';
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function viewTransaction(id) {
    const transaction = allTransactions.find(t => t.id === id);
    if (transaction) {
        if (typeof showToast === 'function') {
            showToast(`Viewing transaction ${id}: $${transaction.amount} - ${transaction.status}`, 'info');
        } else {
            console.log(`Viewing transaction ${id}:`, transaction);
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded - initializing data management');
    initializeFilters();
    renderTable();
    updateSummaryStats();
    console.log('Data management initialized successfully');
});
