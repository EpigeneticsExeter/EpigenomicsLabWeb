const subTeamPhotos = document.querySelectorAll(".sub-team-photo");
const subTeamInfo = document.querySelectorAll(".sub-team-info");

const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
};

const observer = new IntersectionObserver(function (elements, observer) {
    elements.forEach((element) => {
        if (element.isIntersecting) {
            element.target.classList.add("show");
        }
    });
}, observerOptions);

subTeamPhotos.forEach((photo) => {
    observer.observe(photo);
});

subTeamInfo.forEach((info) => {
    observer.observe(info);
});
