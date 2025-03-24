document.addEventListener('DOMContentLoaded', function() {
  // Get form elements
  const loginForm = document.getElementById('loginForm');
  const userTypeSelect = document.getElementById('userType');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const loginAlert = document.getElementById('login-alert');
  const usernameError = document.getElementById('username-error');
  const passwordError = document.getElementById('password-error');
  const loginButton = document.getElementById('login-button');
  const cancelButton = document.getElementById('cancel-button');
  
  // Change form behavior based on selected user type
  userTypeSelect.addEventListener('change', function() {
    const isAdmin = this.value === 'admin';
    const signupLink = document.querySelector('.signup-link');
    
    // Hide signup link for admin login
    signupLink.style.display = isAdmin ? 'none' : 'block';
    
    // Clear any existing errors when switching user types
    resetErrors();
  });
  
  // Clear individual field errors on input
  usernameInput.addEventListener('input', function() {
    usernameInput.parentElement.classList.remove('error');
    usernameError.style.display = 'none';
    loginAlert.style.display = 'none';
  });
  
  passwordInput.addEventListener('input', function() {
    passwordInput.parentElement.classList.remove('error');
    passwordError.style.display = 'none';
    loginAlert.style.display = 'none';
  });
  
  // Login button click handler
  loginButton.addEventListener('click', function(e) {
    // Prevent any default behavior
    e.preventDefault();
    
    // Reset previous errors
    resetErrors();
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const userType = userTypeSelect.value;
    
    // Validate form fields
    let isValid = true;
    
    if (!username) {
      usernameInput.parentElement.classList.add('error');
      usernameError.style.display = 'block';
      isValid = false;
    }
    
    if (!password) {
      passwordInput.parentElement.classList.add('error');
      passwordError.style.display = 'block';
      isValid = false;
    }
    
    if (!isValid) {
      return;
    }
    
    // Show loading state
    const originalButtonText = loginButton.innerHTML;
    loginButton.innerHTML = '<span class="loading"></span> Logging in...';
    loginButton.disabled = true;
    
    // Send AJAX request to the PHP login script
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('userType', userType);
    
    fetch('login_process.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Successful login
        loginAlert.textContent = data.message;
        loginAlert.style.display = 'block';
        loginAlert.style.color = '#2ecc71';
        
        // Redirect to the specified page
        setTimeout(() => {
          window.location.href = data.redirect;
        }, 1000);
      } else {
        // Failed login
        loginButton.innerHTML = originalButtonText;
        loginButton.disabled = false;
        loginAlert.textContent = data.message;
        loginAlert.style.display = 'block';
      }
    })
    .catch(error => {
      // Handle fetch errors
      loginButton.innerHTML = originalButtonText;
      loginButton.disabled = false;
      loginAlert.textContent = "An error occurred. Please try again.";
      loginAlert.style.display = 'block';
      console.error('Error:', error);
    });
  });
  
  // Handle cancel button
  cancelButton.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent any default behavior
    window.location.href = 'Home.html';
  });
  
  // Prevent form submission which could cause page reload
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    return false;
  });
  
  // Helper function to reset error states
  function resetErrors() {
    usernameInput.parentElement.classList.remove('error');
    passwordInput.parentElement.classList.remove('error');
    usernameError.style.display = 'none';
    passwordError.style.display = 'none';
    loginAlert.style.display = 'none';
  }
});