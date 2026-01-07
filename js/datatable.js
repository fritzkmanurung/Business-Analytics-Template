// DataTable Enhancement - Sorting and Pagination
console.log('DataTable enhancements loaded');

// Pagination state
let currentPage = 1;
let rowsPerPage = 10;
let sortColumn = null;
let sortDirection = 'asc';

// Initialize DataTable features
function initializeDataTable() {
    console.log('Initializing DataTable features...');

    // Add sorting to table headers
    const tableHeaders = document.querySelectorAll('#reportsTable th[data-sort]');
    tableHeaders.forEach(header => {
        header.style.cursor = 'pointer';
        header.style.userSelect = 'none';

        header.addEventListener('click', function () {
            const column = this.getAttribute('data-sort');
            handleSort(column);
        });

        // Add sort icon
        if (!header.querySelector('.sort-icon')) {
            const icon = document.createElement('i');
            icon.className = 'fas fa-sort sort-icon';
            icon.style.marginLeft = '0.5rem';
            icon.style.opacity = '0.5';
            header.appendChild(icon);
        }
    });

    // Setup pagination controls
    setupPaginationControls();

    // Setup rows per page selector
    setupRowsPerPageSelector();
}

// Handle column sorting
function handleSort(column) {
    console.log('Sorting by:', column);

    // Toggle sort direction if same column
    if (sortColumn === column) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        sortColumn = column;
        sortDirection = 'asc';
    }

    // Sort the data
    filteredTransactions.sort((a, b) => {
        let valueA = a[column];
        let valueB = b[column];

        // Handle different data types
        if (column === 'amount') {
            valueA = parseFloat(valueA);
            valueB = parseFloat(valueB);
        } else if (column === 'date') {
            valueA = new Date(valueA);
            valueB = new Date(valueB);
        } else {
            valueA = String(valueA).toLowerCase();
            valueB = String(valueB).toLowerCase();
        }

        if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    // Update sort icons
    updateSortIcons();

    // Reset to first page and re-render
    currentPage = 1;
    if (typeof renderTable === 'function') {
        renderTable();
    }
    updatePaginationInfo();
}

// Update sort icons based on current sort state
function updateSortIcons() {
    document.querySelectorAll('#reportsTable th[data-sort] .sort-icon').forEach(icon => {
        const header = icon.parentElement;
        const column = header.getAttribute('data-sort');

        if (column === sortColumn) {
            icon.className = sortDirection === 'asc' ? 'fas fa-sort-up sort-icon' : 'fas fa-sort-down sort-icon';
            icon.style.opacity = '1';
        } else {
            icon.className = 'fas fa-sort sort-icon';
            icon.style.opacity = '0.5';
        }
    });
}

// Get paginated data for current page
function getPaginatedData() {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredTransactions.slice(start, end);
}

// Setup pagination controls
function setupPaginationControls() {
    const paginationContainer = document.getElementById('paginationControls');
    if (!paginationContainer) {
        console.log('Pagination container not found, creating...');
        createPaginationContainer();
    }
}

// Create pagination container if doesn't exist
function createPaginationContainer() {
    const tableCard = document.querySelector('#reportsTable')?.closest('.card');
    if (!tableCard) return;

    const paginationHTML = `
        <div id="paginationControls" style="display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-md); border-top: 1px solid var(--border-color);">
            <div id="paginationInfo" style="color: var(--text-secondary); font-size: var(--font-size-sm);"></div>
            <div style="display: flex; gap: var(--spacing-xs);">
                <button class="button button-secondary button-icon" id="prevPage" onclick="previousPage()">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <span id="pageNumbers" style="display: flex; gap: var(--spacing-xs);"></span>
                <button class="button button-secondary button-icon" id="nextPage" onclick="nextPage()">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
            <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
                <label style="font-size: var(--font-size-sm); color: var(--text-secondary);">Rows per page:</label>
                <select id="rowsPerPageSelect" class="form-select" style="width: auto; padding: 0.25rem 0.5rem;" onchange="changeRowsPerPage(this.value)">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
        </div>
    `;

    tableCard.insertAdjacentHTML('beforeend', paginationHTML);
}

// Setup rows per page selector
function setupRowsPerPageSelector() {
    const selector = document.getElementById('rowsPerPageSelect');
    if (selector) {
        selector.value = rowsPerPage;
    }
}

// Change rows per page
function changeRowsPerPage(value) {
    rowsPerPage = parseInt(value);
    currentPage = 1;
    if (typeof renderTable === 'function') {
        renderTable();
    }
    updatePaginationInfo();
}

// Go to next page
function nextPage() {
    const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        if (typeof renderTable === 'function') {
            renderTable();
        }
        updatePaginationInfo();
    }
}

// Go to previous page
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        if (typeof renderTable === 'function') {
            renderTable();
        }
        updatePaginationInfo();
    }
}

// Go to specific page
function goToPage(page) {
    currentPage = page;
    if (typeof renderTable === 'function') {
        renderTable();
    }
    updatePaginationInfo();
}

// Update pagination info and controls
function updatePaginationInfo() {
    const totalRecords = filteredTransactions.length;
    const totalPages = Math.ceil(totalRecords / rowsPerPage);
    const start = (currentPage - 1) * rowsPerPage + 1;
    const end = Math.min(currentPage * rowsPerPage, totalRecords);

    // Update info text
    const infoEl = document.getElementById('paginationInfo');
    if (infoEl) {
        infoEl.textContent = `Showing ${start}-${end} of ${totalRecords} transactions`;
    }

    // Update buttons state
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');

    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages;

    // Update page numbers
    renderPageNumbers(totalPages);
}

// Render page number buttons
function renderPageNumbers(totalPages) {
    const container = document.getElementById('pageNumbers');
    if (!container) return;

    container.innerHTML = '';

    // Show max 5 page numbers
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
        const btn = document.createElement('button');
        btn.className = `button ${i === currentPage ? 'button-primary' : 'button-secondary'}`;
        btn.style.minWidth = '2.5rem';
        btn.textContent = i;
        btn.onclick = () => goToPage(i);
        container.appendChild(btn);
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
        setTimeout(() => {
            initializeDataTable();
            updatePaginationInfo();
        }, 500); // Wait for data.js to render
    });
} else {
    setTimeout(() => {
        initializeDataTable();
        updatePaginationInfo();
    }, 500);
}

// Export functions for global use
window.getPaginatedData = getPaginatedData;
window.changeRowsPerPage = changeRowsPerPage;
window.nextPage = nextPage;
window.previousPage = previousPage;
window.goToPage = goToPage;
window.updatePaginationInfo = updatePaginationInfo;
