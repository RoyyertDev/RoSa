import { loadChats } from "./loadChats.js";
import { toggleButtonAside } from "./toggleButtonAside.js";

(function loadComponent() {
  fetch("/components/aside.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("aside").innerHTML = html;
      loadChats();
      toggleButtonAside();
    });
})();
