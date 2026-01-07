// Form Validation and Settings Page Functionality
// Business Analytics Dashboard - Settings Enhancement

// Form validation rules
const validationRules = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    required: /\S+/,
    minLength: (value, min) => value.length >= min
};

// Initialize form validation on settings page
function initializeFormsValidation() {
    const profileForm = document.querySelector('#profileForm');
    const settingsForm = document.querySelector('#settingsForm');

    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileSubmit);
    }

    if (settingsForm) {
        settingsForm.addEventListener('submit', handleSettingsSubmit);
    }

    // Real-time validation for email fields
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function () {
            validateEmail(this);
        });
    });
}

// Validate email field
function validateEmail(input) {
    const isValid = validationRules.email.test(input.value);

    if (!isValid && input.value.length > 0) {
        input.style.borderColor = 'var(--color-danger)';
        showFieldError(input, 'Please enter a valid email address');
    } else {
        input.style.borderColor = '';
        removeFieldError(input);
    }

    return isValid;
}

// Show field error
function showFieldError(input, message) {
    removeFieldError(input);

    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.cssText = `
    color: var(--color-danger);
    font-size: var(--font-size-xs);
    margin-top: 0.25rem;
  `;
    errorDiv.textContent = message;

    input.parentElement.appendChild(errorDiv);
}

// Remove field error
function removeFieldError(input) {
    const existingError = input.parentElement.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Handle profile form submit
function handleProfileSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const emailInput = e.target.querySelector('input[type="email"]');

    if (emailInput && !validateEmail(emailInput)) {
        showToast('Please fix validation errors before submitting', 'danger');
        return false;
    }

    // Simulate API call
    const button = e.target.querySelector('button[type="submit"]');
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

    setTimeout(() => {
        button.disabled = false;
        button.innerHTML = '<i class="fas fa-save"></i> Save Changes';
        showToast('Profile updated successfully!', 'success');

        // Log form data (in real app, would send to API)
        console.log('Profile data:', Object.fromEntries(formData));
    }, 1500);

    return false;
}

// Handle settings form submit
function handleSettingsSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    // Simulate API call
    setTimeout(() => {
        showToast('Settings saved successfully!', 'success');
        console.log('Settings data:', Object.fromEntries(formData));
    }, 1000);

    return false;
}

// API Key Management
function generateAPIKey() {
    const prefix = 'sk_live_';
    const randomPart = Array.from({ length: 32 }, () =>
        Math.random().toString(36).charAt(2)
    ).join('');

    const newKey = prefix + randomPart;

    showToast('New API key generated! Make sure to copy it now.', 'success');

    // In real app, would save to database
    console.log('Generated API key:', newKey);

    return newKey;
}

function copyAPIKey(key) {
    // Create temporary input to copy text
    const tempInput = document.createElement('input');
    tempInput.value = key;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    showToast('API key copied to clipboard!', 'success');
}

function revokeAPIKey(keyId) {
    if (confirm('Are you sure you want to revoke this API key? This action cannot be undone.')) {
        showToast('API key revoked successfully', 'warning');
        // In real app, would make API call to revoke
        console.log('Revoked API key:', keyId);
    }
}

// Theme toggle
function toggleTheme() {
    const isDark = document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    showToast(`Switched to ${isDark ? 'light' : 'dark'} mode`, 'info');
}

// Save notification preferences
function saveNotificationPreferences() {
    const dailyReports = document.getElementById('dailyReports')?.checked;
    const weeklyReports = document.getElementById('weeklyReports')?.checked;
    const transactionAlerts = document.getElementById('transactionAlerts')?.checked;
    const browserNotifications = document.getElementById('browserNotifications')?.checked;
    const soundAlerts = document.getElementById('soundAlerts')?.checked;

    const preferences = {
        dailyReports,
        weeklyReports,
        transactionAlerts,
        browserNotifications,
        soundAlerts
    };

    localStorage.setItem('notificationPreferences', JSON.stringify(preferences));
    showToast('Notification preferences saved!', 'success');
    console.log('Notification preferences:', preferences);
}

// Load saved preferences
function loadSavedPreferences() {
    const savedPrefs = localStorage.getItem('notificationPreferences');
    if (savedPrefs) {
        const prefs = JSON.parse(savedPrefs);

        Object.keys(prefs).forEach(key => {
            const checkbox = document.getElementById(key);
            if (checkbox) {
                checkbox.checked = prefs[key];
            }
        });
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFormsValidation);
    document.addEventListener('DOMContentLoaded', loadSavedPreferences);
} else {
    initializeFormsValidation();
    loadSavedPreferences();
}
