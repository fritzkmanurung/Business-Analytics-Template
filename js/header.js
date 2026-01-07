// Header Popup Functionality - Notifications and Profile Dropdown

// Notification popup toggle
function initializeHeaderPopups() {
    const notificationButton = document.getElementById('notificationButton');
    const notificationPopup = document.getElementById('notificationPopup');
    const profileButton = document.getElementById('profileButton');
    const profileDropdown = document.getElementById('profileDropdown');

    // Toggle notification popup
    if (notificationButton && notificationPopup) {
        notificationButton.addEventListener('click', function (e) {
            e.stopPropagation();
            notificationPopup.classList.toggle('active');
            // Close profile dropdown if open
            if (profileDropdown) {
                profileDropdown.classList.remove('active');
            }
        });
    }

    // Toggle profile dropdown
    if (profileButton && profileDropdown) {
        profileButton.addEventListener('click', function (e) {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
            // Close notification popup if open
            if (notificationPopup) {
                notificationPopup.classList.remove('active');
            }
        });
    }

    // Close popups when clicking outside
    document.addEventListener('click', function (e) {
        if (notificationPopup && !notificationPopup.contains(e.target) && e.target !== notificationButton) {
            notificationPopup.classList.remove('active');
        }
        if (profileDropdown && !profileDropdown.contains(e.target) && e.target !== profileButton) {
            profileDropdown.classList.remove('active');
        }
    });

    // Mark notification as read when clicked
    const notificationItems = document.querySelectorAll('.notification-item');
    notificationItems.forEach(item => {
        item.addEventListener('click', function () {
            this.classList.remove('unread');
            updateNotificationBadge();
        });
    });
}

// Update notification badge count
function updateNotificationBadge() {
    const unreadCount = document.querySelectorAll('.notification-item.unread').length;
    const badge = document.querySelector('.notification-badge');

    if (badge) {
        if (unreadCount > 0) {
            badge.textContent = unreadCount;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
}

// Profile dropdown actions
function navigateToProfile() {
    window.location.href = '../user/profile.html';
}

function navigateToSettings() {
    window.location.href = '../dashboard/settings.html';
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // In real app, would clear session/token
        window.location.href = '../auth/login.html';
    }
}

// Mark all notifications as read
function markAllAsRead() {
    const notificationItems = document.querySelectorAll('.notification-item.unread');
    notificationItems.forEach(item => {
        item.classList.remove('unread');
    });
    updateNotificationBadge();
    showToast('All notifications marked as read', 'success');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    initializeHeaderPopups();
    updateNotificationBadge();
});
