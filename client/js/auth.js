async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const data = await apiRequest("/auth/login", "POST", { email, password });

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  window.location.href = "index.html";
}

async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  await apiRequest("/auth/register", "POST", { email, password });

  alert("Registered! Now login.");
}