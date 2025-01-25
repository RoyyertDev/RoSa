const modalEdit = document.getElementById("modalEdit");
const abortEdit = document.getElementById("abortEdit");
const sendEdit = document.getElementById("sendEdit");
let idFoodEdit = null;
function loadModal(id) {
  getCategories();
  idFoodEdit = id;
  loadDataFood(idFoodEdit);
  modalEdit.classList.remove("hidden");
  modalEdit.classList.add("flex");
}

function loadDataFood(id) {
  fetch(`/api/foods/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("nameEdit").value = data.name;
      document.getElementById("categoryEdit").value = data.fk_categories;
    })
    .catch((err) => console.log(err));
}

function getCategories() {
  fetch("/api/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      data.forEach((data) => {
        document.getElementById("categoryEdit").innerHTML += `
            <option value="${data.id}">${data.name}</option>
          `;
      });
    })
    .catch((err) => console.log(err));
}

abortEdit.addEventListener("click", () => {
  modalEdit.classList.remove("flex");
  modalEdit.classList.add("hidden");
  document.getElementById("nameEdit").value = "";
  document.getElementById("categoryEdit").value = "";
  document.getElementById("categoryEdit").innerHTML =
    "<option value='' disabled selected>Seleccionar categoria</option>";
});

sendEdit.addEventListener("click", () => {
  const datesEit = {
    name: document.getElementById("nameEdit").value,
    fk_categories: document.getElementById("categoryEdit").value,
  };

  for (const key in datesEit) {
    if (datesEit[key] === "") {
      alert("El campo " + key + " es obligatorio");
      return;
    }
  }

  fetch(`/api/foods/${idFoodEdit}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datesEit),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "error") {
        alert(data.message);
        return;
      } else if (data.status === "success") {
        alert(data.message);
        window.location.href = "/admin/foods";
        return;
      }
    })
    .catch((err) => console.log(err));
});
