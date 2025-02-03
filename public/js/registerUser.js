let idUserCreate = null;
export async function createUser() {
  const data = {
    names: document.getElementById("names").value,
    surnames: document.getElementById("surnames").value,
    identification_document: document.getElementById("identification_document")
      .value,
    email: document.getElementById("emailCreate").value,
    password: document.getElementById("passwordCreate").value,
    password_confirm: document.getElementById("password_confirm").value,
    sex: document.getElementById("sex").value,
  };

  for (const key in data) {
    if (data[key] === "") {
      alert("El campo " + key + " es obligatorio");
      return;
    }
  }

  fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        alert(data.message);
        idUserCreate = data.user_id;
        modalDetails();
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function modalDetails() {
  const modalDetails = document.getElementById("modalDetails");
  registerModal.classList.remove("flex");
  registerModal.classList.add("hidden");
  modalDetails.classList.remove("hidden");
  modalDetails.classList.add("flex");
}

export function createDetails() {
  const dataDetails = {
    fk_user: idUserCreate,
    fk_role: 2,
    fk_countries: document.getElementById("fk_countries").value,
    fk_provinces: document.getElementById("fk_provinces").value,
    fk_cities: document.getElementById("fk_cities").value,
    zip_code: document.getElementById("zip_code").value,
    site_reference: document.getElementById("site_reference").value,
    phone: document.getElementById("phone").value,
  };

  for (const key in dataDetails) {
    if (dataDetails[key] === "") {
      alert("El campo " + key + " es obligatorio");
      return;
    }
  }

  fetch("/api/userDetails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataDetails),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        alert(data.message);
        window.location.href = "/";
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export function obtainCountries() {
  fetch("/api/countries", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const selectCountries = document.getElementById("fk_countries");
      data.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.id;
        option.text = country.name;
        selectCountries.add(option);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export function obtainProvinces() {
  const selectCountries = document.getElementById("fk_countries");
  const fk_countries = selectCountries.value;
  fetch(`/api/provinces/${fk_countries}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const selectProvinces = document.getElementById("fk_provinces");
      selectProvinces.innerHTML =
        "<option value='' disabled selected>Seleccionar estado</option"; // Limpiar las opciones existentes
      data.forEach((province) => {
        const option = document.createElement("option");
        option.value = province.id;
        option.text = province.name;
        selectProvinces.add(option);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export function obtainCities() {
  const selectProvinces = document.getElementById("fk_provinces");
  const fk_provinces = selectProvinces.value;
  fetch(`/api/cities/${fk_provinces}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const selectCities = document.getElementById("fk_cities");
      selectCities.innerHTML =
        "<option value='' disabled selected>Seleccionar ciudad</option"; // Limpiar las opciones existentes
      data.forEach((city) => {
        const option = document.createElement("option");
        option.value = city.id;
        option.text = city.name;
        selectCities.add(option);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
