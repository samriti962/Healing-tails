// LOG MOOD
async function logMood(mood) {
  const user = JSON.parse(localStorage.getItem("user"));

  const res = await apiRequest("/mood/log", "POST", {
    userId: user._id,
    mood
  });

  if (res) {
    alert("Mood saved!");
    getStreak();
  }
}

// GET STREAK
async function getStreak() {
  const user = JSON.parse(localStorage.getItem("user"));

  const data = await apiRequest(`/mood/streak/${user._id}`);

  if (!data) return;

  const el = document.getElementById("streak");
  if (el) {
    el.innerText = `🔥 ${data.streak} day streak`;
  }
}

// AUTO LOAD STREAK
window.onload = () => {
  if (document.getElementById("streak")) {
    getStreak();
  }
};