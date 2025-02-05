import { loadChats } from "./loadChats.js";
import { toggleButtonAside } from "./toggleButtonAside.js";

(function loadComponent() {
  fetch("/components/aside.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("aside").innerHTML = html;
      loadChats();
      toggleButtonAside();
      $(document).ready(function () {
        $("#sChats").on("input", function () {
          const filter = $(this).val().toLowerCase();
          $("#historyChats a").each(function () {
            const text = $(this).text().toLowerCase();
            $(this).toggle(text.includes(filter));
          });
        });
      });
      const fullName = `${user.names.split(" ")[0]} ${user.surnames
        .split(" ")[0][0]
        .toUpperCase()}.`;
      document.getElementById("profileName").innerText = `${fullName}`;
    });
})();
