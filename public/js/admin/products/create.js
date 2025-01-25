document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/foods", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      data.forEach((data) => {
        document.getElementById("fk_foods").innerHTML += `
        <option value="${data.id}">${data.name}</option>
      `;
      });
    })
    .catch((err) => console.log(err));
});

const abort = document.getElementById("abort");
const send = document.getElementById("send");

abort.addEventListener("click", () => {
  modal.classList.remove("flex");
  modal.classList.add("hidden");
  document.getElementById("fk_foods").value = "";
  document.getElementById("name").value = "";
  document.getElementById("description").value = "";
  document.getElementById("prize").value = "";
  document.getElementById("image").value = "";
});

send.addEventListener("click", () => {
  const dates = {
    fk_foods: document.getElementById("fk_foods").value,
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    prize: document.getElementById("prize").value,
    image: document.getElementById("image").value,
  };

  for (const key in dates) {
    if (dates[key] === "") {
      alert("El campo " + key + " es obligatorio");
      return;
    }
  }

  fetch("/api/products", {
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
        window.location.href = "/admin/products";
        return;
      }
    })
    .catch((err) => console.log(err));
});
