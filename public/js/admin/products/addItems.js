const modalAddItem = document.getElementById("modalAddItems");
const selectItem = document.getElementById("fk_item");
const contentItems = document.getElementById("contentItems");
let idProduct = null;
let items = [];

selectItem.addEventListener("change", () => {
  items.push([
    selectItem.value,
    selectItem.options[selectItem.selectedIndex].text,
  ]);
  selectItem.value = "";
  loadItems();
});

function loadItemsForDB(id) {
  fetch(`/api/productsItems/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      items = data;
      loadItems();
    })
    .catch((err) => console.log(err));
}

function loadItems() {
  contentItems.innerHTML = "";
  items.forEach((item) => {
    contentItems.innerHTML += `
        <span class="text-sm p-2 bg-slate-200 rounded-full flex gap-2 items-center justify-center">
          ${item[3] ?? item[1]}
          <button class="ml-2" onclick="event.preventDefault(); items.splice(${items.indexOf(
            item
          )}, 1); loadItems();">
            X
          </button>
        </span>
    `;
  });
}
function addItemModal(id, fk_foods) {
  fetch(`/api/items/${fk_foods}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      data.forEach((data) => {
        selectItem.innerHTML += `
        <option value="${data.id}">${data.name} | ${data.content_gr}Gr | ${data.prize_unit}$</option>
      `;
      });
    })
    .catch((err) => console.log(err));
  idProduct = id;
  loadItemsForDB(id);
  modalAddItem.classList.remove("hidden");
  modalAddItem.classList.add("flex");
}
function closeModalAddItems() {
  modalAddItem.classList.remove("flex");
  modalAddItem.classList.add("hidden");
  items = [];
  selectItem.innerHTML =
    "<option value='' disabled selected>Seleccionar rubro</option>";
  contentItems.innerHTML = "";
}
function saveItems() {
  fetch(`/api/productsItems`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fk_products: idProduct,
      items,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "error") {
        alert(data.message);
        return;
      } else if (data.status === "success") {
        alert(data.message);
        closeModalAddItems();
        return;
      }
    })
    .catch((err) => console.log(err));
}
