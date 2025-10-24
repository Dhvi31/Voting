// ==============================
// Election Registration Form
// ==============================
document.getElementById('electionRegistrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const election = document.getElementById('election').value;
    const role = document.getElementById('role').value;
    const district = document.getElementById('district').value.trim();
    const manifesto = document.getElementById('manifesto').value.trim();

    if(!election || !role){
        alert('Please select an election and role.');
        return;
    }

    console.log({ election, role, district, manifesto });
    alert('Successfully registered for the election! (mock)');
    this.reset();
});

// ==============================
// Dark Mode Toggle
// ==============================
const toggleButton = document.getElementById('darkModeToggle');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleButton.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// ==============================
// Auto-detect system dark mode
// ==============================
if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
    document.body.classList.add('dark-mode');
    toggleButton.textContent = '☀️ Light Mode';
}
