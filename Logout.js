// Get button elements
const cancelButton = document.getElementById('logout-btn');
const logoutButton = document.getElementById('cancel-btn');

// Function to handle navigation to home page
const goToHome = () => {
    try {
        window.location.href = 'Home.html'; // Navigate to home page
    } catch (error) {
        console.error('Error navigating to home page:', error);
        alert('There was an error returning to home page. Please try again.');
    }
};

// Function to handle logout
const handleLogout = () => {
    try {
        // Clear any stored session data
        localStorage.clear();
        sessionStorage.clear();
        
        // Remove any authentication cookies if they exist
        document.cookie.split(";").forEach(function(c) { 
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        
        // Redirect to login page
        window.location.href = 'Login.html';
    } catch (error) {
        console.error('Error during logout:', error);
        alert('There was an error logging out. Please try again.');
    }
};

// Add click event listeners to buttons
cancelButton.addEventListener('click', goToHome);
logoutButton.addEventListener('click', handleLogout);

// Add confirmation for logout button if user accidentally clicks
logoutButton.addEventListener('click', (event) => {
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (!confirmLogout) {
        event.preventDefault();
    }
});

// Handle page refresh and browser back button
window.addEventListener('beforeunload', (event) => {
    // Clear any sensitive data if the page is refreshed
    sessionStorage.clear();
});

// Prevent accessing the logout page after logging out
if (!localStorage.getItem('userLoggedIn')) {
    window.location.href = 'Login.html';
}