// ==============================
// LOGIN.JS — OTP Login + Real Voter Registration + Toasts
// ==============================

const sendOtpBtn = document.getElementById('sendOtpBtn');
const resendOtpBtn = document.getElementById('resendOtpBtn');
const otpContainer = document.getElementById('otpContainer');
const togglePassword = document.getElementById('togglePassword');
const passwordField = document.getElementById('password');
const loginForm = document.getElementById('loginForm');

let emailGlobal = "";
let otpVerified = false;

// ===== Toast Utility =====
function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toastMessage");
  toastMessage.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

// ===== Send OTP =====
sendOtpBtn.addEventListener('click', async () => {
  const email = document.getElementById('identifier').value.trim();

  if (!email || !email.includes('@')) {
    showToast("Please enter a valid email address!");
    return;
  }

  emailGlobal = email;
  sendOtpBtn.innerText = "Sending...";
  sendOtpBtn.disabled = true;

  try {
    const res = await fetch("http://localhost:5000/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    if (data.success) {
      otpContainer.classList.add('show');
      sendOtpBtn.innerText = "OTP Sent ✓";
      showToast("OTP sent to your email!");
    } else {
      showToast("Failed to send OTP: " + data.message);
      sendOtpBtn.innerText = "Send OTP";
      sendOtpBtn.disabled = false;
    }
  } catch (err) {
    console.error(err);
    showToast("Server error. Check connection.");
    sendOtpBtn.innerText = "Send OTP";
    sendOtpBtn.disabled = false;
  }
});

// ===== Resend OTP =====
resendOtpBtn.addEventListener('click', async () => {
  if (!emailGlobal) {
    showToast("Enter your email before resending OTP!");
    return;
  }

  resendOtpBtn.innerText = "Resending...";
  resendOtpBtn.disabled = true;

  try {
    const res = await fetch("http://localhost:5000/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailGlobal })
    });

    const data = await res.json();
    if (data.success) {
      showToast("OTP resent successfully!");
    } else {
      showToast("Failed to resend OTP!");
    }
  } catch (err) {
    console.error(err);
    showToast("Error resending OTP!");
  }

  resendOtpBtn.innerText = "Resend OTP";
  resendOtpBtn.disabled = false;
});

// ===== Verify OTP & Login =====
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const otp = document.getElementById('otp').value.trim();
  const pass = passwordField.value.trim();

  if (!emailGlobal) {
    showToast("Please enter your email and request OTP first!");
    return;
  }
  if (!otp) {
    showToast("Please enter the OTP!");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailGlobal, otp })
    });

    const data = await res.json();

    if (data.success) {
      otpVerified = true;
      showToast("OTP verified successfully!");

      // ✅ Save user email for session
      localStorage.setItem("vv_user_email", emailGlobal.toLowerCase());

      // ✅ List of admin emails
      const adminEmails = [
        "iit2024104@iiita.ac.in",
        "iit2024028@iiita.ac.in",
        "iit2024031@iiita.ac.in",
        "iit2024042@iiita.ac.in",
        "iit2024089@iiita.ac.in",
        "iit2024091@iiita.ac.in"
      ];

      // ✅ Redirect based on role
      if (adminEmails.includes(emailGlobal.toLowerCase())) {
        showToast("Admin login successful!");
        setTimeout(() => (window.location.href = "admin.html"), 1000);
      } else {
        showToast("Login successful!");
        setTimeout(() => (window.location.href = "dashboard.html"), 1000);
      }
    } else {
      showToast("Invalid or expired OTP!");
      return;
    }
  } catch (err) {
    console.error(err);
    showToast("Error verifying OTP. Try again later.");
    return;
  }
});

// ===== Toggle Password Visibility =====
togglePassword.addEventListener('click', () => {
  const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordField.setAttribute('type', type);
  togglePassword.classList.toggle('fa-eye');
  togglePassword.classList.toggle('fa-eye-slash');
});
// ==============================
// NORMAL LOGIN (Using Registered Users)
// ==============================

// This section lets users who registered via register.html log in
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const identifier = document.getElementById("identifier").value.trim();
  const password = document.getElementById("password").value.trim();

  // Skip if OTP login already happened
  if (localStorage.getItem("vv_user_email")) return;

  // Fetch registered users from localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Find a user by email or student ID
  const matchedUser = users.find(
    (u) =>
      (u.email.toLowerCase() === identifier.toLowerCase() ||
       u.studentId.toLowerCase() === identifier.toLowerCase()) &&
      u.password === password
  );

  if (matchedUser) {
    // Save session info
    localStorage.setItem("user", JSON.stringify(matchedUser));
    localStorage.setItem("loggedIn", "true");

    showToast(`Welcome back, ${matchedUser.name}!`);
    setTimeout(() => (window.location.href = "dashboard.html"), 1000);
  } else {
    showToast("❌ Invalid email or password!");
  }
});
