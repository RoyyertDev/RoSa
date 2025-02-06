import { io } from "https://cdn.socket.io/4.5.1/socket.io.esm.min.js";
import { obtainUserLogin } from "../../middleware/auth.js";
import { loadChats } from "./loadChats.js";

const socket = io();
window.socket = socket;

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

const idParams = new URLSearchParams(window.location.search).get("chat");
idParams && socket.emit("loadChat", idParams);
socket.on("newChat", (idChat) => {
  window.history.pushState({}, "", `/?chat=${idChat}`);
});

var conversation = [];
var titleChat = null;
var user = await obtainUserLogin();
window.user = user;

socket.on("message", (message) => {
  if (message.msjAll) {
    conversation.push({
      message: message.msjAll,
      from: message.from,
    });
  }
  let active = messages.querySelector(".active");

  if (!active) {
    const item = `
                  <li class="active flex ${
                    message.from === "User" ? "flex-row-reverse" : "flex-row"
                  } w-full gap-4 items-end text-slate-600 dark:text-white">
                      <img src="/img/user.webp" alt=""
                          class="w-12 h-12 object-cover rounded-full">
                      <div class="grid grid-rows-[auto_1fr] rounded-3xl ${
                        message.from === "User"
                          ? "rounded-br-none bg-slate-200 dark:bg-[#2c2c2c] shadow-sm py-3 px-4"
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
    titleChat = input.value.substring(0, 50);
    if (messages.childElementCount === 0) {
      socket.emit("message", input.value, titleChat, user.id, conversation);
      input.value = "";
      loadChats(titleChat);
    } else {
      socket.emit("message", input.value, titleChat, user.id, conversation);
      input.value = "";
    }
  }
});

function getProducts() {
  const cardProductContainer = document.getElementById("cardProductContainer");
  fetch("/api/products")
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        cardProductContainer.innerHTML = "";
        data.forEach((data) => {
          cardProductContainer.innerHTML += `<span
              class="w-full flex flex-col rounded-xl border border-slate-500/20 overflow-hidden"
            >
              <img
                class="object-cover aspect-square h-2/4"
                src="${data.image}"
                alt="${data.name}"
              />
              <div class="px-4 py-2 flex-1 flex flex-col gap-1 justify-between">
                <div class="flex justify-between items-center font-bold">
                  <h1 class="text-sm">${data.name}</h1>
                  <span class="text-xs">${data.prize}$</span>
                </div>
                <h2 class="text-sm">${data.description}</h2>
                <button class="w-full py-1 bg-blue-600 rounded-xl text-white" onclick="addProduct('${data.name}')">
                  Añadir
                </button>
              </div>
            </span>
          `;
        });
      }
    });
}

function foodShow() {
  getProducts();
  const foodButton = document.getElementById("foodButton");
  const cardModalFood = document.getElementById("cardModalFood");
  foodButton.classList.toggle("rounded-xl");
  foodButton.classList.toggle("rounded-l-xl");
  foodButton.classList.toggle("dark:bg-[#2c2c2c]");
  cardModalFood.classList.toggle("hidden");
  cardModalFood.classList.toggle("flex");
}

function addProduct(name) {
  socket.emit(
    "message",
    "Por favor añade el producto " + name,
    titleChat,
    user.id,
    conversation
  );
}

window.addProduct = addProduct;
window.foodShow = foodShow;

function getPayments() {
  const cardPaymentContainer = document.getElementById("cardPaymentContainer");
  fetch(`/api/payments/${user.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        cardPaymentContainer.innerHTML = "";
        data.forEach((data) => {
          cardPaymentContainer.innerHTML += `
            <span
              class="w-full flex rounded-xl border border-slate-500/20 overflow-hidden justify-center p-2"
            >
              <img
                class="object-cover aspect-square"
                src="/svg/adobePDF.svg"
                alt="FACTURA_${data.names}_${data.payment_id}_${data.shopping_cart_id}_${data.date}"
              />
              <div
                class="px-4 py-2 flex-1 flex flex-col gap-1 justify-between truncate"
              >
                <div class="flex flex-col font-bold overflow-hidden truncate gap-2">
                  <span class="text-xs text-right">${data.date}_${data.cart_date}</span>
                  <h1 class="text-sm truncate">
                    FACTURA_${data.names}_${data.payment_id}_${data.shopping_cart_id}_${data.date}
                  </h1>
                </div>
              </div>
            </span>
          `;
        });
      }
    });
}

function paymentShow() {
  getPayments();
  const paymentButton = document.getElementById("paymentButton");
  const cardModalPayment = document.getElementById("cardModalPayment");
  paymentButton.classList.toggle("rounded-xl");
  paymentButton.classList.toggle("rounded-l-xl");
  paymentButton.classList.toggle("dark:bg-[#2c2c2c]");
  cardModalPayment.classList.toggle("hidden");
  cardModalPayment.classList.toggle("flex");
}

window.paymentShow = paymentShow;
