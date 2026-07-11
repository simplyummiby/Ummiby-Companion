const menuButton = document.getElementById("menuButton");
const sidebar = document.getElementById("sidebar");
const backdrop = document.getElementById("sidebarBackdrop");

function setMenu(open) {
  sidebar.classList.toggle("open", open);
  backdrop.hidden = !open;
  menuButton.setAttribute("aria-expanded", String(open));
}

menuButton?.addEventListener("click", () => {
  setMenu(!sidebar.classList.contains("open"));
});

backdrop?.addEventListener("click", () => setMenu(false));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenu(false);
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    setMenu(false);
  }
});
