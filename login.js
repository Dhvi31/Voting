const loginForm = document.getElementById('loginForm');
const credentialsStep = document.getElementById('credentialsStep');
const otpStep = document.getElementById('otpStep');
const verifyOtpButton = document.getElementById('verifyOtp');

let tempToken = ''; // temporary token from backend for OTP verification

// ==============================
// Step 1: Send OTP
// ==============================
document.getElementById('sendOtpBtn').addEventListener('click', async () => {
    const identifier = document.getElementById('identifier').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!identifier || !password) {
        alert('Please enter both identifier and password.');
        return;
    }

    // Demo: show OTP step immediately
    credentialsStep.style.display = 'none';
    otpStep.style.display = 'block';

    alert(`OTP sent to ${identifier} (demo)`);

    // In real app, send credentials to backend to generate tempToken
    tempToken = 'demo-token';
});

// ==============================
// Step 2: Verify OTP
// ==============================
verifyOtpButton.addEventListener('click', async () => {
    const otp = document.getElementById('otp').value.trim();
    if (!otp) {
        alert('Please enter the OTP.');
        return;
    }

    // Demo: Successful login
    alert('Logged in successfully (demo)');
    // Redirect to dashboard
    window.location.href = '/voter-dashboard.html';
});
