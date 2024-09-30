let slideIndex = 1;
let slideshowInterval;

showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot-indicator");

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].classList.remove("active");
    }

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = "flex";
    dots[slideIndex - 1].classList.add("active");

    slideIndex++;
}

function startSlideshow() {
    clearInterval(slideshowInterval);

    slideshowInterval = setInterval(() => {
        showSlides();
    }, 5000);
}

function switchSlide(index) {
    clearInterval(slideshowInterval); // Stop the automatic slideshow
    slideIndex = index;
    showSlides();
}

const slideshowContainer = document.getElementById("slideshow");

let timeoutID = null;

if (slideshowContainer) {
    slideshowContainer.addEventListener("mouseenter", () => {
        clearInterval(slideshowInterval);
    });

    slideshowContainer.addEventListener("mouseleave", () => {
        setTimeout(startSlideshow, 1000);
    });
}

startSlideshow();
