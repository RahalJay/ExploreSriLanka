document.addEventListener('DOMContentLoaded', function() {
    // Get the form element
    const form = document.getElementById('registrationForm');
    
    // Add submit event listener
    form.addEventListener('submit', function(event) {
        // Get input values
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Flag to track validation status
        let isValid = true;
        
        // Validate full name
        if (fullName.trim() === '') {
            alert('Please enter your full name');
            isValid = false;
        }
        
        // Validate email
        if (!validateEmail(email)) {
            alert('Please enter a valid email address');
            isValid = false;
        }
        
        // Validate username
        if (username.length < 4) {
            alert('Username must be at least 4 characters long');
            isValid = false;
        }
        
        // Validate password
        if (password.length < 8) {
            alert('Password must be at least 8 characters long');
            isValid = false;
        }
        
        // Prevent form submission if validation fails
        if (!isValid) {
            event.preventDefault();
        }
    });
    
    // Email validation helper function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});