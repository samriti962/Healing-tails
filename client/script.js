// =========================
// GLOBAL NAVIGATION
// =========================
function goToPage(page) {
  window.location.href = page;
}

// =========================
// GREETING
// =========================
function setGreeting() {
  const hour = new Date().getHours();
  let text = "Good Morning 👋";

  if (hour >= 12 && hour < 17) text = "Good Afternoon ☀️";
  else if (hour >= 17) text = "Good Evening 🌙";

  const greet = document.getElementById("greeting");
  if (greet) greet.innerText = text;
}

// =========================
// USER UI (LOGIN STATE)
// =========================
function setUserUI() {
  const user = localStorage.getItem("userEmail");

  const badge = document.getElementById("userBadge");
  const loginBtn = document.getElementById("loginBtn");

  if (user) {
    if (badge) {
      badge.innerText = user.charAt(0).toUpperCase();
      badge.classList.remove("hidden");
    }
    if (loginBtn) loginBtn.style.display = "none";
  } else {
    if (loginBtn) loginBtn.style.display = "block";
  }
}

// =========================
// MOOD SYSTEM
// =========================
const moodMessages = {
  "😡": "It's okay to feel angry 🌿",
  "😟": "You're stronger than worries 💛",
  "😐": "You're doing fine 🙂",
  "😊": "Keep smiling ✨",
  "😍": "Beautiful energy 💖"
};

function selectMood(el) {
  document.querySelectorAll(".mood").forEach(m => m.classList.remove("active"));
  el.classList.add("active");

  const mood = el.innerText;
  localStorage.setItem("mood", mood);

  const text = document.getElementById("selectedMoodText");
  if (text) text.innerText = moodMessages[mood];
}

function loadMood() {
  const saved = localStorage.getItem("mood");
  if (!saved) return;

  document.querySelectorAll(".mood").forEach(btn => {
    if (btn.innerText === saved) {
      btn.classList.add("active");

      const text = document.getElementById("selectedMoodText");
      if (text) text.innerText = moodMessages[saved];
    }
  });
}

// =========================
// FEELINGS / JOURNAL
// =========================
let feelings = JSON.parse(localStorage.getItem("feelings")) || [];

function sendFeeling() {
  const input = document.getElementById("feelingInput");
  const msgBox = document.getElementById("feelingMsg");

  if (!input || !input.value.trim()) return;

  const user = localStorage.getItem("userEmail") || "Anonymous";
  const text = `${user.split("@")[0]}: ${input.value}`;

  feelings.push(text);
  localStorage.setItem("feelings", JSON.stringify(feelings));

  input.value = "";

  if (msgBox) msgBox.innerText = "Saved 💚";

  renderFeelings();
}

function renderFeelings() {
  const list = document.getElementById("journalList");
  if (!list) return;

  list.innerHTML = feelings.map(f => `
    <div class="bubble">${f}</div>
  `).join("");
}

// =========================
// CHATBOT
// =========================
let chats = JSON.parse(localStorage.getItem("chats")) || [];

function toggleChat() {
  const chatbox = document.getElementById("chatbox");
  if (chatbox) chatbox.classList.toggle("hidden");
}

function getBotReply(text) {
  const lower = text.toLowerCase();

  if (lower.includes("sad")) return "I'm here with you 💚 You're not alone.";
  if (lower.includes("stress")) return "Try a deep breath: inhale 4s, hold 4s, exhale 4s 🌿";
  if (lower.includes("anxious")) return "Ground yourself — name 5 things you see 👀";
  if (lower.includes("happy")) return "That's beautiful ✨ Keep that energy!";

  return "I’m listening… tell me more 💭";
}

function sendChat() {
  const input = document.getElementById("chat-input");

  if (!input || !input.value.trim()) return;

  chats.push("You: " + input.value);

  const reply = getBotReply(input.value);
  chats.push("Bot: " + reply);

  localStorage.setItem("chats", JSON.stringify(chats));

  input.value = "";

  renderChat();
}

function renderChat() {
  const box = document.getElementById("chat-messages");
  if (!box) return;

  box.innerHTML = chats.map(c => `<p>${c}</p>`).join("");
}

// =========================
// COMMUNITY (MODAL)
// =========================
function openCreateCommunity() {
  document.getElementById("communityModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("communityModal").classList.add("hidden");
}

function createCommunity() {
  const input = document.getElementById("communityInput");
  const name = input.value.trim();

  if (!name) return;

  let communities = JSON.parse(localStorage.getItem("communities")) || [];
  communities.push(name);

  localStorage.setItem("communities", JSON.stringify(communities));

  input.value = "";
  closeModal();

  renderCommunities(); // 🔥 update UI instantly

  const msg = document.getElementById("feelingMsg");
  if (msg) msg.innerText = "Community created 💚";
}

function renderCommunities() {
  const list = document.getElementById("communityList");
  if (!list) return;

  const communities = JSON.parse(localStorage.getItem("communities")) || [];

  list.innerHTML = communities.map(c => `
    <div class="community-item">${c}</div>
  `).join("");
}

// =========================
// ACTIVITIES
// =========================
function goToActivity(type) {
  alert("Opening " + type + " section...");
}

// =========================
// LOGOUT
// =========================
function logout() {
  localStorage.removeItem("userEmail");
  location.reload();
}

// =========================
// INIT
// =========================
window.addEventListener("DOMContentLoaded", () => {
  setGreeting();
  loadMood();
  setUserUI();
  renderFeelings();
  renderChat();
  renderCommunities();

  // Enter to send feeling
  document.getElementById("feelingInput")?.addEventListener("keypress", function(e) {
    if (e.key === "Enter") sendFeeling();
  });

  // Enter to create community
  document.getElementById("communityInput")?.addEventListener("keypress", function(e) {
    if (e.key === "Enter") createCommunity();
  });
});