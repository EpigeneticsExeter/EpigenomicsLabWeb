document.addEventListener("DOMContentLoaded", function () {
    const navItems = document.querySelectorAll(".nav-item");
    const allSubNavs = document.querySelectorAll(".sub-nav");
    const mainNav = document.querySelector(".main-nav");

    navItems.forEach((item) => {
        const link = item.querySelector(".nav-item-link");
        const subNav = item.querySelector(".sub-nav");

        link.addEventListener("mouseenter", function () {
            allSubNavs.forEach((item) => {
                item.style.opacity = "0";
                item.style.visibility = "hidden";
                item.style.transition = "opacity 0s, visibility 0s";
            });
            if (subNav) {
                subNav.style.opacity = "1";
                subNav.style.visibility = "visible";
                subNav.style.transition = "opacity 0.5s, visibility 1s";
            }
        });

        link.addEventListener("mouseleave", function () {
            setTimeout(() => {
                if (subNav && !subNav.style.opacity == 1) {
                    subNav.style.opacity = "0";
                    subNav.style.visibility = "hidden";
                    subNav.style.transition = "opacity 0.5s, visibility 1s";
                }
            }, 100);
        });
    });

    mainNav.addEventListener("mouseleave", function () {
        allSubNavs.forEach((item) => {
            item.style.opacity = "0";
            item.style.visibility = "hidden";
            item.style.transition = "opacity 0.5s, visibility 1s";
        });
    });
});
