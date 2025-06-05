const apiUrl = "http://127.0.0.1:8000/careers/";

// ELEMENTOS
const usernameInput = document.getElementById("username");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const createBtn = document.getElementById("createBtn");

// CARREGA USERNAME SALVO
const savedUser = localStorage.getItem("codeleap_user") || "";
usernameInput.value = savedUser;

// ATUALIZA ESTADO DO BOTÃO
function updateButtonState() {
  const filled = usernameInput.value.trim() && titleInput.value.trim() && contentInput.value.trim();
  createBtn.disabled = !filled;
  createBtn.style.opacity = filled ? "1" : "0.5";
}

// EVENTOS DE INPUT
usernameInput.addEventListener("input", updateButtonState);
titleInput.addEventListener("input", updateButtonState);
contentInput.addEventListener("input", updateButtonState);

// SUBMISSÃO DO FORMULÁRIO
document.getElementById("postForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!username || !title || !content) return;

  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, title, content }),
  });

  localStorage.setItem("codeleap_user", username);

  titleInput.value = "";
  contentInput.value = "";
  updateButtonState();

  loadPosts();
});

// FUNÇÃO PARA CARREGAR POSTS
async function loadPosts() {
  const res = await fetch(apiUrl);
  const data = await res.json();

  const container = document.getElementById("postsContainer");
  container.innerHTML = "";

  data.forEach(post => {
    const div = document.createElement("div");
    div.className = "post";

    const isOwner = post.username === localStorage.getItem("codeleap_user");

    div.innerHTML = `
      <div class="post-header-bar">
        <span>${post.title}</span>
        ${isOwner ? `
          <div class="post-actions">
            <button onclick="editPost(${post.id}, '${post.title}', \`${post.content.replace(/`/g, "\\`")}\`)">✏️</button>
            <button onclick="confirmDelete(${post.id})">🗑️</button>
          </div>
        ` : ""}
      </div>
      <div class="post-content">
        <div class="meta"><strong>@${post.username}</strong> • ${new Date(post.created_datetime).toLocaleString()}</div>
        <p>${post.content}</p>
        <div style="margin-top: 10px;">
          <button onclick="alert('❤️ Like registrado (fake)!')">❤️ Like</button>
          <button onclick="toggleComments(${post.id})">💬 Comment</button>
        </div>
        <div id="comments-${post.id}" class="comments-section" style="display:none; margin-top:10px;">
  <div id="comment-list-${post.id}" class="comment-list"></div>
  <input type="text" id="comment-input-${post.id}" placeholder="Add a comment..." />
  <button onclick="addComment(${post.id})">Send</button>
</div>
      </div>
    `;

    container.appendChild(div);
  });
}

// FUNÇÃO DELETAR POST
function confirmDelete(id) {
  const ok = confirm("Tem certeza que deseja deletar este post?");
  if (!ok) return;

  fetch(`${apiUrl}${id}/`, {
    method: "DELETE"
  }).then(() => loadPosts());
}

// EDIÇÃO DE POST
let currentEditId = null;

function editPost(id, title, content) {
  currentEditId = id;
  document.getElementById("editTitle").value = title;
  document.getElementById("editContent").value = content;
  document.getElementById("editModal").style.display = "flex";
}

function closeEditModal() {
  currentEditId = null;
  document.getElementById("editModal").style.display = "none";
}

async function submitEdit() {
  const newTitle = document.getElementById("editTitle").value.trim();
  const newContent = document.getElementById("editContent").value.trim();

  if (!newTitle || !newContent || !currentEditId) return;

  await fetch(`${apiUrl}${currentEditId}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: newTitle, content: newContent }),
  });

  closeEditModal();
  loadPosts();
}

// INICIALIZAÇÃO
updateButtonState();
loadPosts();



const commentsStore = {};

function toggleComments(postId) {
  const section = document.getElementById(`comments-${postId}`);
  section.style.display = section.style.display === "none" ? "block" : "none";
}

function addComment(postId) {
  const input = document.getElementById(`comment-input-${postId}`);
  const text = input.value.trim();
  if (!text) return;

  if (!commentsStore[postId]) commentsStore[postId] = [];
  commentsStore[postId].push(text);

  input.value = "";
  renderComments(postId);
}

function renderComments(postId) {
  const list = document.getElementById(`comment-list-${postId}`);
  list.innerHTML = "";

  if (commentsStore[postId]) {
    commentsStore[postId].forEach(c => {
      const div = document.createElement("div");
      div.className = "comment";
      div.innerText = `@${savedUser || "Anon"}: ${c}`;
      list.appendChild(div);
    });
  }
}


let postIdToDelete = null;

function confirmDelete(id) {
  postIdToDelete = id;
  document.getElementById("deleteModal").style.display = "flex";
}

function closeDeleteModal() {
  postIdToDelete = null;
  document.getElementById("deleteModal").style.display = "none";
}

function confirmDeleteFinal() {
  if (!postIdToDelete) return;

  fetch(`${apiUrl}${postIdToDelete}/`, {
    method: "DELETE"
  }).then(() => {
    postIdToDelete = null;
    closeDeleteModal();
    loadPosts();
  });
}

