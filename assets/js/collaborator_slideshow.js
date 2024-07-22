let slideIndex = 0;
let slideshowInterval;

showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot-indicator");

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].classList.remove("active");
    }

    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = "flex";
    dots[slideIndex - 1].classList.add("active");

    slideshowInterval = setTimeout(showSlides, 5000); 
}

function switchSlide(index) {
    clearInterval(slideshowInterval); // Stop the automatic slideshow
    slideIndex = index; 
    showSlides();
}

document.addEventListener("DOMContentLoaded", function() {
    const slideshowContainer = document.getElementById("slideshow");

    if (slideshowContainer) {
        slideshowContainer.addEventListener("mouseenter", () => {
            clearInterval(slideshowInterval); 
        });

        slideshowContainer.addEventListener("mouseleave", () => {
            showSlides();
        });
    }
});

