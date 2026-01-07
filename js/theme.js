// Theme Management - Dark/Light Mode
console.log('Theme management loaded');

// Get saved theme or default to dark
function getTheme() {
    return localStorage.getItem('theme') || 'dark';
}

// Apply theme to document
function applyTheme(theme) {
    console.log('Applying theme:', theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Update toggle state if exists
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.checked = (theme === 'dark');
    }
}

// Toggle theme
function toggleTheme() {
    const currentTheme = getTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);

    if (typeof showToast === 'function') {
        showToast(`Switched to ${newTheme} mode`, 'success');
    }
}

// Initialize theme on page load
function initializeTheme() {
    const savedTheme = getTheme();
    applyTheme(savedTheme);

    // Setup dark mode toggle in settings
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function () {
            toggleTheme();
        });
    }
}

// Apply theme immediately (before DOM loads for no flash)
applyTheme(getTheme());

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTheme);
} else {
    initializeTheme();
}
