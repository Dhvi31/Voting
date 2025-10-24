// Countdown timer for ongoing election
function startCountdown(endTime) {
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  function updateTimer() {
    const now = new Date().getTime();
    const distance = endTime - now;

    if (distance < 0) {
      clearInterval(timerInterval);
      document.getElementById("timer").innerHTML = "Election Ended";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    daysEl.innerText = days.toString().padStart(2, "0");
    hoursEl.innerText = hours.toString().padStart(2, "0");
    minutesEl.innerText = minutes.toString().padStart(2, "0");
    secondsEl.innerText = seconds.toString().padStart(2, "0");
  }

  updateTimer(); // initial call
  const timerInterval = setInterval(updateTimer, 1000);
}

// Example: election ends on 31 Dec 2025 23:59:59
const electionEndDate = new Date("December 31, 2025 23:59:59").getTime();
startCountdown(electionEndDate);