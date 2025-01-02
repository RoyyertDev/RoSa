(function loadComponent() {
  fetch("/components/asideAdmin.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("aside").innerHTML = html;

      const links = [
        {
          href: "/admin/users",
          src: "/svg/dashboard/usuario.svg",
          text: "Usuarios",
        },
        {
          href: "/admin/foods",
          src: "/svg/restaurante.svg",
          text: "Menu",
        },
        {
          href: "/admin/items",
          src: "/svg/dashboard/items.svg",
          text: "Rubros",
        },
        {
          href: "/admin/products",
          src: "/svg/dashboard/productos.svg",
          text: "Productos",
        },
      ];

      const section = document.querySelector("section");

      links.forEach((link) => {
        section.innerHTML += `
              <a href="${link.href}" class="flex flex-row w-full gap-2 py-3 px-4 hover:bg-slate-200 rounded-xl items-center transition-all duration-400">
                <img class="w-5" src="${link.src}" alt="" />
                ${link.text}
              </a>
            `;
      });

      const toggleAside = document.getElementById("toggleAside");
      const toggleAside2 = document.getElementById("toggleAside2");
      const aside = document.getElementById("aside");
      const body = document.body;

      toggleAside.addEventListener("click", () => {
        if (aside.classList.contains("sm:hidden")) {
          aside.classList.replace("sm:hidden", "sm:grid");
        } else {
          aside.classList.replace("sm:grid", "sm:hidden");
        }
        if (aside.classList.contains("-left-full")) {
          aside.classList.replace("-left-full", "left-0");
        } else {
          aside.classList.replace("left-0", "-left-full");
        }
        toggleAside2.classList.toggle("sm:hidden");
        body.classList.toggle("sm:grid");
      });

      toggleAside2.addEventListener("click", () => {
        if (aside.classList.contains("sm:hidden")) {
          aside.classList.replace("sm:hidden", "sm:grid");
        } else {
          aside.classList.replace("sm:grid", "sm:hidden");
        }
        if (aside.classList.contains("-left-full")) {
          aside.classList.replace("-left-full", "left-0");
        } else {
          aside.classList.replace("left-0", "-left-full");
        }
        toggleAside2.classList.toggle("sm:hidden");
        body.classList.toggle("sm:grid");
      });
    });
})();
