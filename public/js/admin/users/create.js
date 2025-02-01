const abort = document.getElementById("abort");
const send = document.getElementById("send");

abort.addEventListener("click", () => {
  modal.classList.remove("flex");
  modal.classList.add("hidden");
  document.getElementById("names").value = "";
  document.getElementById("surnames").value = "";
  document.getElementById("identification_document").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("password_confirm").value = "";
  document.getElementById("sex").value = "";
});

send.addEventListener("click", () => {
  const dates = {
    names: document.getElementById("names").value,
    surnames: document.getElementById("surnames").value,
    identification_document: document.getElementById("identification_document")
      .value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    password_confirm: document.getElementById("password_confirm").value,
    sex: document.getElementById("sex").value,
  };

  for (const key in dates) {
    if (dates[key] === "") {
      alert("El campo " + key + " es obligatorio");
      return;
    }
  }

  if (dates.password !== dates.password_confirm) {
    alert("Las contraseñas no coinciden");
    return;
  }

  fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dates),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "error") {
        alert(data.message);
        return;
      } else if (data.status === "success") {
        alert(data.message);
        window.location.href = "/admin/users";
        return;
      }
    })
    .catch((err) => console.log(err));
});
