const modal = document.getElementById("modal");
const buttonRegister = document.getElementById("buttonRegister");

buttonRegister.addEventListener("click", () => {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
});
