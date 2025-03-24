// Add interactivity for form submission
document.getElementById("registrationForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;



  // Simulate successful registration
  alert(`Welcome, ${fullName}! Your registration is successful.`);
  window.location.href = "Home.html"; // Redirect to the homepage
});

// Cancel button functionality
document.querySelector(".btn-cancel").addEventListener("click", function () {
  if (confirm("Are you sure you want to cancel?")) {
    window.location.href = "Home.html"; // Redirect to homepage
  }
});
