import { obtainUserLogin } from "../../middleware/auth.js";

export async function loadChats() {
  try {
    const chatsUser = await obtainChats();
    const ul = document.getElementById("historyChats");
    chatsUser.forEach((chat) => {
      ul.innerHTML += `<li
              class="w-full px-4 py-3 hover:bg-slate-200 transition-all duration-400 rounded-lg cursor-pointer truncate"
            >
              ${chat.title}
            </li>`;
    });
  } catch (error) {}
}

async function obtainChats() {
  const user = await obtainUserLogin();
  const response = await fetch("/api/userChats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fk_users: user.id,
    }),
  });
  const data = await response.json();
  return data.status === "success" ? data.chats : null;
}
