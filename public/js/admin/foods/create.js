document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      data.forEach((data) => {
        document.getElementById("category").innerHTML += `
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
  document.getElementById("name").value = "";
  document.getElementById("category").value = "";
});

send.addEventListener("click", () => {
  const dates = {
    name: document.getElementById("name").value,
    fk_categories: document.getElementById("category").value,
  };

  for (const key in dates) {
    if (dates[key] === "") {
      alert("El campo " + key + " es obligatorio");
      return;
    }
  }

  fetch("/api/foods", {
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
        window.location.href = "/admin/foods";
        return;
      }
    })
    .catch((err) => console.log(err));
});
