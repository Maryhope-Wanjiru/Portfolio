/* ===== 1. HAMBURGER MENU ===== */
const menuToggle = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("#nav-menu");
const navLinks = document.querySelectorAll("#nav-menu a");

menuToggle.addEventListener("click", function () {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

// Close the menu after a link is tapped
navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});


/* ===== 2. GREETING BASED ON TIME OF DAY ===== */
function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning";
  } else if (hour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

document.querySelector("#greeting").textContent =
  getGreeting() + ", welcome to my portfolio!";


/* ===== 3. DYNAMIC CONTENT BUTTON ===== */
const facts = [
  "I am studying for a Bachelor of Science in Information Technology.",
  "I have a certificate in Introduction to Microsoft Excel.",
  "I know database basics.",
  "I am a beginner in Python and I am learning more every day."
];

let factIndex = 0;
const factText = document.querySelector("#fact");
const factButton = document.querySelector("#fact-btn");

factButton.addEventListener("click", function () {
  factText.textContent = facts[factIndex];
  factIndex = (factIndex + 1) % facts.length; // go back to 0 after the last fact
});


/* ===== 4. CONTACT FORM VALIDATION ===== */
const form = document.querySelector("#contact-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");
const formStatus = document.querySelector("#form-status");

function showError(input, message) {
  document.querySelector("#" + input.id + "-error").textContent = message;
  input.classList.add("invalid");
}

function clearError(input) {
  document.querySelector("#" + input.id + "-error").textContent = "";
  input.classList.remove("invalid");
}

function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  let isValid = true;

  formStatus.textContent = "";

  if (name === "") {
    showError(nameInput, "Please enter your name.");
    isValid = false;
  } else {
    clearError(nameInput);
  }

  if (email === "") {
    showError(emailInput, "Please enter your email.");
    isValid = false;
  } else if (!isValidEmail(email)) {
    showError(emailInput, "Please enter a valid email, like name@example.com.");
    isValid = false;
  } else {
    clearError(emailInput);
  }

  if (message === "") {
    showError(messageInput, "Please enter a message.");
    isValid = false;
  } else if (message.length < 10) {
    showError(messageInput, "Your message must be at least 10 characters.");
    isValid = false;
  } else {
    clearError(messageInput);
  }

  if (isValid) {
    formStatus.textContent = "Thank you, " + name + "! Your message has been submitted.";
    form.reset();
  }
});