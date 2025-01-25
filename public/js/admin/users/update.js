const modalEdit = document.getElementById("modalEdit");
const abortEdit = document.getElementById("abortEdit");
const sendEdit = document.getElementById("sendEdit");
let idUserEdit = null;

function editUserModal(id) {
  modalEdit.classList.remove("hidden");
  modalEdit.classList.add("flex");
  idUserEdit = id;
  loadDataUser(idUserEdit);
}

function loadDataUser(id) {
  fetch(`/api/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("namesEdit").value = data.names;
      document.getElementById("surnamesEdit").value = data.surnames;
      document.getElementById("identification_documentEdit").value =
        data.identification_document;
      document.getElementById("emailEdit").value = data.email;
      document.getElementById("sexEdit").value = data.sex;
    })
    .catch((err) => console.log(err));
}

abortEdit.addEventListener("click", () => {
  modalEdit.classList.remove("flex");
  modalEdit.classList.add("hidden");
  document.getElementById("namesEdit").value = "";
  document.getElementById("surnamesEdit").value = "";
  document.getElementById("identification_documentEdit").value = "";
  document.getElementById("emailEdit").value = "";
  document.getElementById("sexEdit").value = "";
});

sendEdit.addEventListener("click", () => {
  const datesEdit = {
    names: document.getElementById("namesEdit").value,
    surnames: document.getElementById("surnamesEdit").value,
    identification_document: document.getElementById(
      "identification_documentEdit"
    ).value,
    email: document.getElementById("emailEdit").value,
    sex: document.getElementById("sexEdit").value,
  };

  for (const key in datesEdit) {
    if (datesEdit[key] === "") {
      alert("El campo " + key + " es obligatorio");
      return;
    }
  }

  fetch(`/api/users/${idUserEdit}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datesEdit),
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
