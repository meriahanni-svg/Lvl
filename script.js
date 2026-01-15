const ADMIN_USER = "ADMIIN";
const ADMIN_PASS = "ADMIIN";

if (!localStorage.users) {
  localStorage.users = JSON.stringify({
    "user1": { pass: "1234", tries: 1, levels: [] },
    "user2": { pass: "1234", tries: 1, levels: [] },
    "vip":   { pass: "vip123", tries: 999, levels: [] }
  });
}

function login() {
  const u = user.value;
  const p = pass.value;
  const users = JSON.parse(localStorage.users);

  if (u === ADMIN_USER && p === ADMIN_PASS) {
    loginBox.classList.add("hidden");
    adminBox.classList.remove("hidden");
    return;
  }

  if (users[u] && users[u].pass === p) {
    sessionStorage.user = u;
    loginBox.classList.add("hidden");
    userBox.classList.remove("hidden");
    loadLevels();
  } else {
    alert("❌ معلومات خاطئة");
  }
}

function saveLevel() {
  const u = sessionStorage.user;
  const users = JSON.parse(localStorage.users);

  if (users[u].tries <= 0) {
    alert("❌ انتهت المحاولات");
    return;
  }

  users[u].levels.push({ status: "offline" });
  users[u].tries--;

  localStorage.users = JSON.stringify(users);
  loadLevels();
}

function loadLevels() {
  const u = sessionStorage.user;
  const users = JSON.parse(localStorage.users);
  levelList.innerHTML = "";

  users[u].levels.forEach((lvl, i) => {
    levelList.innerHTML += `
      <div>
        Level Up #${i + 1} :
        <span class="${lvl.status}">${lvl.status}</span><br>
        <button class="btn" onclick="toggle(${i})">تشغيل / إيقاف</button>
      </div>
    `;
  });
}

function toggle(i) {
  const u = sessionStorage.user;
  const users = JSON.parse(localStorage.users);
  users[u].levels[i].status =
    users[u].levels[i].status === "offline" ? "online" : "offline";
  localStorage.users = JSON.stringify(users);
  loadLevels();
}

function logout() {
  location.reload();
}
