// Menú desplegable
const menuToggle = document.querySelector(".menu-toggle");
const closeMenu = document.querySelector(".close-menu");
const menu = document.querySelector(".menu");

menuToggle.addEventListener("click", () => {
  menu.style.display = "flex";
});

closeMenu.addEventListener("click", () => {
  menu.style.display = "none";
});

// Sección mapa desplegable
const mapToggle = document.querySelector(".map-toggle");
const mapContent = document.querySelector(".map-content");
const arrow = document.querySelector(".arrow");

mapToggle.addEventListener("click", () => {
  if (mapContent.style.display === "block") {
    mapContent.style.display = "none";
    arrow.textContent = "keyboard_arrow_down";
  } else {
    mapContent.style.display = "block";
    arrow.textContent = "keyboard_arrow_up";
  }
});