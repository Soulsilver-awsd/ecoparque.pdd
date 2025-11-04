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

const track = document.querySelector('.carousel-track');
const items = Array.from(track.children);
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;

// Función para actualizar posición
function setSlide(index) {
  currentIndex = index;
  track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
}

// Detectar touch (swipe)
track.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

track.addEventListener('touchmove', e => {
  if (!isDragging) return;
  const deltaX = e.touches[0].clientX - startX;
  track.style.transform = `translateX(${-currentIndex * 100 + deltaX / track.offsetWidth * 100}%)`;
});

track.addEventListener('touchend', e => {
  isDragging = false;
  const endX = e.changedTouches[0].clientX;
  const deltaX = endX - startX;
  if (deltaX < -50 && currentIndex < items.length - 1) currentIndex++;
  if (deltaX > 50 && currentIndex > 0) currentIndex--;
  setSlide(currentIndex);
});

// Inicial
setSlide(0);