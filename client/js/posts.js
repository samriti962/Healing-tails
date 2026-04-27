// LOAD POSTS (FEED)
async function loadPosts() {
  const posts = await apiRequest("/posts/feed");

  if (!posts) return;

  const container = document.getElementById("posts");
  container.innerHTML = "";

  posts.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";

    if (p.sensitive) {
      div.innerHTML = "⚠️ Sensitive content (click to view)";
      div.onclick = () => {
        div.innerHTML = `<b>${p.userName}</b><br>${p.content}`;
      };
    } else {
      div.innerHTML = `<b>${p.userName}</b><br>${p.content}`;
    }

    container.appendChild(div);
  });
}

// CREATE POST
async function createPost() {
  const content = document.getElementById("postContent").value;
  const user = JSON.parse(localStorage.getItem("user"));

  if (!content) return alert("Write something!");

  await apiRequest("/posts/create", "POST", {
    content,
    userName: user.anonymousName
  });

  document.getElementById("postContent").value = "";
  loadPosts();
}

// AUTO LOAD
window.onload = loadPosts;