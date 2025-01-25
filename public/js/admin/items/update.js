const modalEdit = document.getElementById("modalEdit");
const abortEdit = document.getElementById("abortEdit");
const sendEdit = document.getElementById("sendEdit");
let idItemEdit = null;

function loadModal(id) {
  getFoods();
  idItemEdit = id;
  modalEdit.classList.remove("hidden");
  modalEdit.classList.add("flex");
  findItem(idItemEdit);
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
        document.getElementById("fk_foodsEdit").innerHTML += `
        <option value="${data.id}">${data.name}</option>
      `;
      });
    })
    .catch((err) => console.log(err));
}

function findItem(id) {
  fetch(`/api/items/find/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("nameEdit").value = data.name;
      document.getElementById("content_grEdit").value = data.content_gr;
      document.getElementById("extraEdit").value = data.extra;
      document.getElementById("prize_unitEdit").value = data.prize_unit;
      document.getElementById("fk_foodsEdit").value = data.fk_foods;
    })
    .catch((err) => console.log(err));
}

abortEdit.addEventListener("click", () => {
  modalEdit.classList.remove("flex");
  modalEdit.classList.add("hidden");
  document.getElementById("nameEdit").value = "";
  document.getElementById("content_grEdit").value = "";
  document.getElementById("extraEdit").value = "";
  document.getElementById("prize_unitEdit").value = "";
  document.getElementById("fk_foodsEdit").value = "";
});

sendEdit.addEventListener("click", () => {
  const datesEdit = {
    name: document.getElementById("nameEdit").value,
    content_gr: document.getElementById("content_grEdit").value,
    extra: document.getElementById("extraEdit").value,
    prize_unit: document.getElementById("prize_unitEdit").value,
    fk_foods: document.getElementById("fk_foodsEdit").value,
  };

  for (const key in datesEdit) {
    if (datesEdit[key] === "") {
      alert("El campo " + key + " es obligatorio");
      return;
    }
  }

  fetch(`/api/items/${idItemEdit}`, {
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
        window.location.href = "/admin/items";
        return;
      }
    })
    .catch((err) => console.log(err));
});
