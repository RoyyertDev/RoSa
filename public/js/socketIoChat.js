import { io } from "https://cdn.socket.io/4.5.1/socket.io.esm.min.js";
import { obtainUserLogin } from "../../middleware/auth.js";

const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

socket.on("message", (message) => {
  let active = messages.querySelector(".active");

  if (!active) {
    const item = `
                  <li class="active flex ${
                    message.from === "User" ? "flex-row-reverse" : "flex-row"
                  } w-full gap-4 items-end text-slate-600">
                      <img src="https://www.clarin.com/img/2023/12/01/rhVeUAooY_2000x1500__1.jpg" alt=""
                          class="w-12 h-12 object-cover rounded-full">
                      <div class="grid grid-rows-[auto_1fr] rounded-3xl ${
                        message.from === "User"
                          ? "rounded-br-none bg-slate-200 shadow-sm py-3 px-4"
                          : "rounded-bl-none"
                      } text-wrap gap-1">
                          <p class="message-content"></p>
                          <span class="text-xs font-semibold">${
                            message.from === "User" ? "Tu" : "RoSa"
                          } · ${new Date().toLocaleTimeString()}</span>
                      </div
                  </li>
              `;
    messages.insertAdjacentHTML("beforeend", item);
    active = messages.querySelector(".active");
  }
  const p = active.querySelector(".message-content");
  p.textContent += message.message;
  messages.scrollTop = messages.scrollHeight;
  if (message.complete) {
    const activeLi = messages.querySelector(".active");
    if (activeLi) {
      activeLi.classList.remove("active");
    }
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (input.value !== "") {
    if (messages.childElementCount === 0) {
      const titleChat = input.value.substring(0, 50);
      const user = await obtainUserLogin();
      socket.emit("message", input.value, titleChat, user.id);
      input.value = "";
    } else {
      socket.emit("message", input.value);
      input.value = "";
    }
  }
});
