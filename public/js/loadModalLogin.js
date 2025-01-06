import { login } from "../../middleware/auth.js";
function loadLoginModal() {
  fetch("/components/loginModal.html")
    .then((response) => response.text())
    .then((html) => {
      document.body.innerHTML += html;
      const email = document.getElementById("email");
      const password = document.getElementById("password");
      const buttonLogin = document.getElementById("buttonLogin");
      buttonLogin.addEventListener("click", async () => {
        const logeo = await login(email.value, password.value);
        logeo.success === true ? (window.location.href = "/") : null;
      });
    });
}

(async function verifySession() {
  const response = await fetch("/auth/session", {
    method: "GET",
  });
  const data = await response.json();
  data.success === false ? loadLoginModal() : null;
})();
