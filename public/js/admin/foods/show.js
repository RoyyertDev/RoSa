const tbody = document.querySelector("tbody");

fetch("/api/foods", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    data.forEach((data) => {
      tbody.innerHTML += `
          <tr class="my-1 h-12 border-b border-gray-200 hover:bg-gray-200 transition-colors duration-200">
            <td class="w-12 text-center">
              <input
                class="text-[#DE5976] focus:ring-0 w-5 h-5 rounded-md bg-gray-200 border-gray-300 cursor-pointer hover:bg-gray-300 hover:border-gray-200"
                type="checkbox"
                name=""
                id=""
              />
            </td>
            <td class="">${data.id}</td>
            <td class="">${data.name}</td>
            <td class="">${data.fk_categories}</td>
            <td class="flex h-12 gap-2 items-center">
              <button
                class="bg-yellow-400 text-black h-10 rounded-xl flex items-center justify-center gap-2 p-3"
              >
                Editar
              </button>
              <button
                class="bg-red-500 text-black h-10 rounded-xl flex items-center justify-center gap-2 p-3"
              >
                Eliminar
              </button>
            </td>
          </tr>
        `;
    });
  })
  .catch((error) => console.error(error));
