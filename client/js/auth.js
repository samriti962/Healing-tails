// LOGIN
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const data = await apiRequest("/auth/login", "POST", {
    email,
    password
  });

  if (!data) return;

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  window.location.href = "feed.html";
}

// REGISTER
async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const data = await apiRequest("/auth/register", "POST", {
    email,
    password
  });

  if (data) {
    alert("Registered successfully! Now login.");
  }
}

// LOGOUT
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
}