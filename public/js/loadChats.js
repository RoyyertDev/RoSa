import { obtainUserLogin } from "../../middleware/auth.js";

export async function loadChats(tittle) {
  try {
    const chatsUser = await obtainChats();
    const ul = document.getElementById("historyChats");
    if (tittle) {
      ul.insertAdjacentHTML(
        "afterbegin",
        `
        <li class="w-full px-4 py-2 hover:bg-slate-200 dark:hover:bg-[#2c2c2c] transition-all duration-400 rounded-lg cursor-pointer truncate">
          ${tittle}
        </li>
      `
      );
    } else {
      const user = await obtainUserLogin();
      if (user.role === 1) {
        document
          .getElementById("sectionLinks")
          .children[0].insertAdjacentHTML(
            "afterend",
            ` <a href="/admin/users" class="flex flex-row w-full gap-2 py-3 px-4 hover:bg-slate-200 dark:hover:bg-[#2c2c2c] rounded-xl items-center transition-all duration-400" > <img class="w-5 h-5" src="/svg/diseno-fluido.svg" alt="" /> Dashboard </a> `
          );
      }
      document.getElementById("theme-toggle").addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");
      });
      chatsUser.forEach((chat) => {
        ul.insertAdjacentHTML(
          "beforeend",
          `
          <li class="w-full px-4 py-2 hover:bg-slate-200 dark:hover:bg-[#2c2c2c] transition-all duration-400 rounded-lg cursor-pointer truncate">
            ${chat.title}
          </li>
        `
        );
      });
    }
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
