const modalEdit = document.getElementById("modalEdit");
const abortEdit = document.getElementById("abortEdit");
const sendEdit = document.getElementById("sendEdit");
let idProductEdit = null;
function loadModal(id) {
  getFoods();
  idProductEdit = id;
  loadDataItem(idProductEdit);
  modalEdit.classList.remove("hidden");
  modalEdit.classList.add("flex");
  console.log(document.getElementById("fk_foodsEdit").value);
}

function getFoods() {
  fetch("/api/foods", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      data.forEach((data) => {
        document.getElementById(
          "fk_foodsEdit"
        ).innerHTML += `<option value="${data.id}">${data.name}</option>`;
      });
    })
    .catch((err) => console.log(err));
}

function loadDataItem(id) {
  fetch(`/api/products/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("nameEdit").value = data.name;
      document.getElementById("descriptionEdit").value = data.description;
      document.getElementById("prizeEdit").value = data.prize;
      document.getElementById("fk_foodsEdit").value = data.fk_foods;
    })
    .catch((err) => console.log(err));
}

abortEdit.addEventListener("click", () => {
  modalEdit.classList.remove("flex");
  modalEdit.classList.add("hidden");
  document.getElementById("fk_foodsEdit").value = "";
  document.getElementById("nameEdit").value = "";
  document.getElementById("descriptionEdit").value = "";
  document.getElementById("prizeEdit").value = "";
});

sendEdit.addEventListener("click", () => {
  const datesEdit = {
    name: document.getElementById("nameEdit").value,
    description: document.getElementById("descriptionEdit").value,
    prize: document.getElementById("prizeEdit").value,
    fk_foods: document.getElementById("fk_foodsEdit").value,
  };

  for (const key in datesEdit) {
    if (datesEdit[key] === "") {
      alert("El campo " + key + " es obligatorio");
      return;
    }
  }

  fetch(`/api/products/${idProductEdit}`, {
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
        window.location.href = "/admin/products";
        return;
      }
    })
    .catch((err) => console.log(err));
});
