// Sample user credentials (In a real application, this would come from a backend)
const validCredentials = {
  username: "admin",
  password: "admin123"
};

// Get form and input elements
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

// Function to validate the form
function validateForm(username, password) {
  // Check if fields are empty
  if (!username || !password) {
      alert("Please fill in all fields");
      return false;
  }
  return true;
}

// Function to handle login
function handleLogin(event) {
  event.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  // Validate form
  if (!validateForm(username, password)) {
      return;
  }

  // Check credentials
  if (username === validCredentials.username && password === validCredentials.password) {
      // Store login status
      localStorage.setItem('userLoggedIn', 'true');
      localStorage.setItem('username', username);

      // Show success message
      const confirmLogin = confirm("Login Successful!");
      
      // Redirect to home page regardless of which button they press on the confirm dialog
      if (confirmLogin || !confirmLogin) {
          window.location.href = 'Home.html';
      }
  } else {
      // Show error message
      alert("Invalid username or password. Please try again.");
      
      // Clear password field but keep username for convenience
      passwordInput.value = '';
      passwordInput.focus();
  }
}

// Function to handle cancel button
function handleCancel() {
  // Clear form fields
  usernameInput.value = '';
  passwordInput.value = '';
  
  // Set focus to username field
  usernameInput.focus();
}

// Add event listeners
loginForm.addEventListener('submit', handleLogin);

// Get cancel button and add event listener
const cancelBtn = document.querySelector('.btn-cancel');
if (cancelBtn) {
  cancelBtn.addEventListener('click', handleCancel);
}

// Check if user is already logged in
window.addEventListener('load', () => {
  if (localStorage.getItem('userLoggedIn') === 'true') {
      window.location.href = 'Home.html';
  }
});

// Add input validation listeners
usernameInput.addEventListener('input', () => {
  if (usernameInput.value.trim() !== '') {
      usernameInput.classList.remove('error');
  }
});

passwordInput.addEventListener('input', () => {
  if (passwordInput.value.trim() !== '') {
      passwordInput.classList.remove('error');
  }
});

// Helper function to mark invalid fields
function markInvalid(element) {
  element.classList.add('error');
  element.focus();
}
