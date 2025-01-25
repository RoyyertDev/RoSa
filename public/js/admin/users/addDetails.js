const modalDetails = document.getElementById("modalDetails");
let idUser = null;
let detailsUsers = null;
const countriesSelec = document.getElementById("fk_countries");
const provincesSelec = document.getElementById("fk_provinces");
const citiesSelec = document.getElementById("fk_cities");
function addDetails(id) {
  selectUp();
  modalDetails.classList.remove("hidden");
  modalDetails.classList.add("flex");
  idUser = id;
  loadDetails(idUser);
}

function applyDetails() {
  document.getElementById("fk_role").value = detailsUsers.userDetails.fk_role;
  document.getElementById("fk_countries").value =
    detailsUsers.userDetails.fk_countries;
  document.getElementById("fk_provinces").value =
    detailsUsers.userDetails.fk_provinces;
  document.getElementById("fk_cities").value =
    detailsUsers.userDetails.fk_cities;
  document.getElementById("zip_code").value = detailsUsers.userDetails.zip_code;
  document.getElementById("site_reference").value =
    detailsUsers.userDetails.site_reference;
  document.getElementById("phone").value = detailsUsers.userDetails.phone;
}
function abortDetails() {
  modalDetails.classList.remove("flex");
  modalDetails.classList.add("hidden");
  idUser = null;
  document.getElementById("fk_role").value = "";
  countriesSelec.value = "";
  document.getElementById("fk_provinces").value = "";
  document.getElementById("fk_cities").value = "";
  document.getElementById("zip_code").value = "";
  document.getElementById("site_reference").value = "";
  document.getElementById("phone").value = "";
  detailsUsers = null;
  document.getElementById("fk_role").innerHTML =
    "<option value='' disabled selected>Seleccionar rol</option>";
  countriesSelec.innerHTML =
    "<option value='' disabled selected>Seleccionar pais</option>";
  document.getElementById("fk_provinces").innerHTML =
    "<option value='' disabled selected>Seleccionar estado</option>";
  document.getElementById("fk_cities").innerHTML =
    "<option value='' disabled selected>Seleccionar ciudad</option>";
}
function loadDetails(id) {
  fetch(`/api/userDetails/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      detailsUsers = data;
      applyDetails();
    })
    .catch((err) => console.log(err));
}

function selectUp() {
  fetch(`/api/rol_users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      data.forEach((rol) => {
        document.getElementById("fk_role").innerHTML += `
        <option value="${rol.id}">${rol.name}</option>
      `;
      });
    });

  fetch(`/api/countries`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      data.forEach((country) => {
        countriesSelec.innerHTML = `<option value=''selected disabled>Seleccionar pais</option>`;
        countriesSelec.innerHTML += `
        <option value="${country.id}">${country.name}</option>
      `;
      });
    });
}
function changeCountriesSelect() {
  document.getElementById("fk_provinces").innerHTML =
    "<option value='' disabled selected>Seleccionar estado</option>";
  fetch(`/api/provinces/${countriesSelec.value}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      data.forEach((province) => {
        document.getElementById("fk_provinces").innerHTML += `
          <option value="${province.id}">${province.name}</option>
        `;
      });
    });
}

countriesSelec.addEventListener("change", () => {
  changeCountriesSelect();
});

function changeProvincesSelect() {
  document.getElementById("fk_cities").innerHTML =
    "<option value='' disabled selected>Seleccionar ciudad</option>";
  fetch(`/api/cities/${provincesSelec.value}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      data.forEach((city) => {
        document.getElementById("fk_cities").innerHTML += `
          <option value="${city.id}">${city.name}</option>
        `;
      });
    });
}

provincesSelec.addEventListener("change", () => {
  changeProvincesSelect();
});

function saveDetails() {
  const dates = {
    fk_user: idUser,
    fk_role: document.getElementById("fk_role").value,
    fk_countries: document.getElementById("fk_countries").value,
    fk_provinces: document.getElementById("fk_provinces").value,
    fk_cities: document.getElementById("fk_cities").value,
    zip_code: document.getElementById("zip_code").value,
    site_reference: document.getElementById("site_reference").value,
    phone: document.getElementById("phone").value,
  };
  for (const key in dates) {
    if (dates[key] === "") {
      alert("El campo " + key + " es obligatorio");
      return;
    }
  }
  fetch("/api/userDetails", {
    method: detailsUsers.userDetails ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dates),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        alert(data.message);
        window.location.href = "/admin/users";
        return;
      } else if (data.status === "error") {
        alert(data.message);
        return;
      }
    })
    .catch((err) => console.log(err));
}
