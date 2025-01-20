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
  document.getElementById("name").value = "";
  document.getElementById("content_gr").value = "";
  document.getElementById("extra").value = "";
  document.getElementById("prize_unit").value = "";
  document.getElementById("fk_foods").value = "";
});

send.addEventListener("click", () => {
  const dates = {
    name: document.getElementById("name").value,
    content_gr: document.getElementById("content_gr").value,
    extra: document.getElementById("extra").value,
    prize_unit: document.getElementById("prize_unit").value,
    fk_foods: document.getElementById("fk_foods").value,
  };

  for (const key in dates) {
    if (dates[key] === "") {
      alert("El campo " + key + " es obligatorio");
      return;
    }
  }

  fetch("/api/items", {
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
        window.location.href = "/admin/items";
        return;
      }
    })
    .catch((err) => console.log(err));
});
