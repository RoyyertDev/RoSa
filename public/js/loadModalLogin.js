import { login } from "../../middleware/auth.js";
import {
  createUser,
  createDetails,
  obtainCountries,
  obtainProvinces,
  obtainCities,
} from "./registerUser.js";
function loadLoginModal() {
  fetch("/components/loginModal.html")
    .then((response) => response.text())
    .then((html) => {
      document.body.innerHTML += html;
      const email = document.getElementById("email");
      const password = document.getElementById("password");
      const buttonLogin = document.getElementById("buttonLogin");
      //Creacion de usuario
      const sendCreate = document.getElementById("sendCreate");
      const sendCreateDetails = document.getElementById("sendCreateDetails");
      buttonLogin.addEventListener("click", async () => {
        const logeo = await login(email.value, password.value);
        logeo.success === true ? (window.location.href = "/") : null;
      });
      sendCreate.addEventListener("click", () => {
        createUser();
      });
      obtainCountries();
      document.getElementById("fk_countries").addEventListener("change", () => {
        obtainProvinces();
        document.getElementById("fk_cities").innerHTML =
          "<option value='' disabled selected>Seleccionar ciudad</option>";
      });
      document.getElementById("fk_provinces").addEventListener("change", () => {
        obtainCities();
      });
      sendCreateDetails.addEventListener("click", () => {
        createDetails();
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
