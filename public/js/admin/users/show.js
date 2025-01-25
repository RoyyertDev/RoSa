const tbody = document.querySelector("tbody");

fetch("/api/users", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    data.forEach((data) => {
      tbody.innerHTML += `
          <tr class="my-1 border-b border-gray-200 dark:border-slate-500/40 hover:bg-gray-200 dark:hover:bg-[#444444] transition-colors duration-300">
            <td class="w-12 text-center">
              <input
                class="text-[#DE5976] focus:ring-0 w-5 h-5 rounded-md bg-gray-200 border-gray-300 cursor-pointer hover:bg-gray-300 hover:border-gray-200"
                type="checkbox"
                name=""
                id=""
              />
            </td>
            <td class="">${data.names}</td>
            <td class="">${data.surnames}</td>
            <td class="">${data.identification_document}</td>
            <td class="">${data.email}</td>
            <td class="">${data.sex}</td>
            <td class="flex h-full items-center">
              <button
                class="h-full rounded-xl flex items-center justify-center gap-2 p-3 hover:scale-125 transition-all duration-300"
                onclick="addDetails('${data.id}')"
              >
                <img class="w-4" src="/svg/dashboard/lapiz.svg" alt="" />
              </button>
              <button
                class="h-full rounded-xl flex items-center justify-center gap-2 p-3 hover:scale-125 transition-all duration-300"
                onclick="editUserModal('${data.id}')"
              >
                <img class="w-4" src="/svg/editar.svg" alt="" />
              </button>
            </td>
          </tr>
        `;
    });
  });
