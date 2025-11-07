document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const studentId = document.getElementById("studentId").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const cpassword = document.getElementById("cpassword").value.trim();

    if (!name || !studentId || !email || !password || !cpassword) {
      alert("⚠️ Please fill all fields.");
      return;
    }

    if (password !== cpassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    const user = { name, studentId, email, password };
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("loggedIn", "true");

    alert("✅ Registration Successful! Redirecting...");
    window.location.href = "login.html";
  });
});
