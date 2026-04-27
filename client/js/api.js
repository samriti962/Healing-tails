const BASE_URL = "http://localhost:5000/api";

async function apiRequest(endpoint, method = "GET", body = null) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(BASE_URL + endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? "Bearer " + token : ""
      },
      body: body ? JSON.stringify(body) : null
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.msg || "Something went wrong");
    }

    return data;

  } catch (error) {
    console.error("API Error:", error.message);
    alert(error.message);
  }
}

// make global
window.apiRequest = apiRequest;