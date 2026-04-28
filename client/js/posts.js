async function loadPosts() {
  const posts = await apiRequest("/posts/feed");

  const container = document.getElementById("posts");
  container.innerHTML = "";

  posts.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";

    if (p.sensitive) {
      div.innerHTML = "⚠️ Sensitive content (click to view)";
      div.onclick = () => div.innerHTML = p.content;
    } else {
      div.innerHTML = p.content;
    }

    container.appendChild(div);
  });
}

async function createPost() {
  const content = document.getElementById("postContent").value;
  const user = JSON.parse(localStorage.getItem("user"));

  await apiRequest("/posts/create", "POST", {
    content,
    userName: user.anonymousName
  });

  loadPosts();
}

loadPosts();