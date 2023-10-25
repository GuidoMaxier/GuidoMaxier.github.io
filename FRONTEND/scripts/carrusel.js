const carouselContainer = document.querySelector('.carousel-container');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const items = document.querySelectorAll('.carousel-item');
let currentIndex = 0;

nextButton.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= items.length) {
        currentIndex = 0; // Reinicia al principio si llega al final
    }
    updateCarousel();
});

prevButton.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = items.length - 1; // Vuelve al final si está en el principio
    }
    updateCarousel();
});

function updateCarousel() {
    const itemWidth = items[0].offsetWidth;
    carouselContainer.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}
