(function loadComponent() {
  fetch("/components/aside.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("aside").innerHTML = html;
    });
})();

document.addEventListener("DOMContentLoaded", function () {
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
