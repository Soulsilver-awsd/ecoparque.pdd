document.addEventListener('DOMContentLoaded', () => {

    // --- 1. FUNCIONALIDAD DEL MENÚ HAMBURGUESA ---

    const menuToggle = document.querySelector(".menu-toggle");
    const mainMenu = document.querySelector(".main-menu");
    const header = document.querySelector("header");

    menuToggle.addEventListener("click", () => {
        // Toggle de la clase 'open' para mostrar/ocultar el menú
        mainMenu.classList.toggle("open");
        
        // Opcional: Cambiar el icono del botón hamburguesa
        menuToggle.classList.toggle("is-active"); 
        
        // Accesibilidad: Actualizar el atributo ARIA
        const isExpanded = mainMenu.classList.contains("open");
        menuToggle.setAttribute("aria-expanded", isExpanded);
    });

    // --- 2. FUNCIONALIDAD DEL MAPA DESPLEGABLE ---

    const mapToggle = document.querySelector(".map-toggle");
    const mapContent = document.querySelector(".map-content");
    const arrow = document.querySelector(".arrow");

    mapToggle.addEventListener("click", () => {
        // Toggle de la clase 'map-open' (controlado por max-height en CSS)
        mapContent.classList.toggle("map-open");

        // Cambia el ícono de la flecha
        if (mapContent.classList.contains("map-open")) {
            arrow.textContent = "keyboard_arrow_up";
            mapToggle.setAttribute("aria-expanded", "true");
        } else {
            arrow.textContent = "keyboard_arrow_down";
            mapToggle.setAttribute("aria-expanded", "false");
        }
    });

    // --- 3. FUNCIONALIDAD DEL CARRUSEL TÁCTIL (SWIPE) ---
    
    const track = document.querySelector('.carousel-track');
    const items = Array.from(track.children);
    const dots = document.querySelectorAll('.dot');
    
    // Si no hay elementos o solo hay uno, detener la ejecución del carrusel
    if (items.length <= 1) {
        if (dots[0]) dots[0].classList.add('active'); // Muestra el punto si solo hay 1
        return; 
    } 

    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;
    let currentTranslate = 0; // Posición base del transform (en píxeles)

    // Necesitamos el ancho de un ítem para calcular el desplazamiento
    const itemWidth = items[0].offsetWidth; 

    function setSlide(index) {
        // Limita el índice y crea un loop (circular)
        if (index < 0) index = items.length - 1; 
        if (index >= items.length) index = 0; 

        currentIndex = index;

        // Calcula la posición exacta en PIXELES
        currentTranslate = -currentIndex * itemWidth;

        // Aplica la transformación
        track.style.transform = `translateX(${currentTranslate}px)`;

        // Actualiza los puntos
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    }

    // --- Eventos Táctiles (Touch Events) ---

    track.addEventListener('touchstart', e => {
        e.preventDefault(); 
        startX = e.touches[0].clientX;
        isDragging = true;
        // Deshabilita la transición mientras arrastras
        track.style.transition = 'none'; 
    });

    track.addEventListener('touchmove', e => {
        if (!isDragging) return;
        e.preventDefault(); 
        const deltaX = e.touches[0].clientX - startX;
        // Muestra la nueva posición temporal (base + cuánto se ha movido el dedo)
        track.style.transform = `translateX(${currentTranslate + deltaX}px)`;
    });

    track.addEventListener('touchend', e => {
        isDragging = false;
        // Restaura la transición para el efecto de "snap"
        track.style.transition = 'transform 0.5s ease-in-out'; 
        
        const endX = e.changedTouches[0].clientX;
        const deltaX = endX - startX;

        // Decide si mover al siguiente slide (umbral de 50px de movimiento)
        if (deltaX < -50) setSlide(currentIndex + 1); // Swipe Izquierda (Avanza)
        else if (deltaX > 50) setSlide(currentIndex - 1); // Swipe Derecha (Retrocede)
        else setSlide(currentIndex); // Se queda en la misma
    });

    // Control por puntos
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => setSlide(i));
    });

    // Inicializa el carrusel
    setSlide(0); 
});