document.addEventListener('DOMContentLoaded', () => {

    // --- 1. FUNCIONALIDAD DEL MAPA DESPLEGABLE (Animación Suave) ---
    
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

    // --- 2. FUNCIONALIDAD DEL CARRUSEL (Circular con Swipe Completo) ---
    
    const track = document.querySelector('.carousel-track');
    const items = Array.from(track.children);
    const dots = document.querySelectorAll('.dot');
    const carouselContainer = document.querySelector('.carousel'); 

    if (!carouselContainer || items.length <= 1) {
        if (dots.length > 0) dots[0].classList.add('active'); 
        return; 
    } 

    let currentIndex = 0; 
    let startX = 0;
    let isDragging = false;
    let currentTranslate = 0; 
    const itemWidth = carouselContainer.offsetWidth; 

    function setSlide(index) {
        
        // Lógica circular (de 3 a 1, de 1 a 3)
        if (index < 0) index = items.length - 1; 
        if (index >= items.length) index = 0; 

        currentIndex = index;

        // Calculamos la posición final en PÍXELES y la guardamos en currentTranslate
        currentTranslate = -currentIndex * itemWidth; 

        track.style.transform = `translateX(${currentTranslate}px)`;

        // Actualiza los puntos
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    }

    // Inicializa el carrusel
    setSlide(0); 

    // --- Eventos Táctiles (Swipe) ---

    track.addEventListener('touchstart', e => {
        e.preventDefault(); 
        startX = e.touches[0].clientX;
        isDragging = true;
        track.style.transition = 'none'; 
    });

    track.addEventListener('touchmove', e => {
        if (!isDragging) return;
        e.preventDefault(); 
        const deltaX = e.touches[0].clientX - startX;
        // Movimiento temporal
        track.style.transform = `translateX(${currentTranslate + deltaX}px)`;
    });

    track.addEventListener('touchend', e => {
        isDragging = false;
        track.style.transition = 'transform 0.5s ease-in-out'; 
        
        const endX = e.changedTouches[0].clientX;
        const deltaX = endX - startX;

        // Si el movimiento horizontal es significativo (> 50px)
        if (deltaX < -50) setSlide(currentIndex + 1); // Avanza (Swipe Izquierda)
        else if (deltaX > 50) setSlide(currentIndex - 1); // Retrocede (Swipe Derecha)
        else setSlide(currentIndex); // Se queda en la misma
    });

    // Control por puntos
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => setSlide(i));
    });
});