import { mobileWidthThreshold } from "./global-variables.js";

const toggleMenuButton = document.getElementById("toggle-menu");
const navItems = document.querySelectorAll(".nav-item");
const mainNav = document.querySelector(".main-nav");

toggleMenuButton.addEventListener("click", toggleMenu);

function toggleMenu() {
    const allSubNavs = document.querySelectorAll(".sub-nav");
    if (mainNav.style.display == "flex") {
        mainNav.style.display = "none";
    } else {
        mainNav.style.display = "flex";
        allSubNavs.forEach((item) => {
            item.style.display = "none";
        });
    }
}

if (globalThis.innerWidth < mobileWidthThreshold) {
    navItems.forEach((item) => {
        const link = item.querySelector(".nav-item-link");
        const subNav = item.querySelector(".sub-nav");
        const allSubNavs = document.querySelectorAll(".sub-nav");

        link.addEventListener("click", function () {
            allSubNavs.forEach((item) => {
                item.style.display = "none";
            });
            if (subNav) {
                subNav.style.display = "flex";
            }
        });
    });
}
