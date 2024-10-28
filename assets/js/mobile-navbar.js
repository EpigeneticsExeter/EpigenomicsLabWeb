import { mobileWidthThreshold } from "./global-variables.js";

const toggleMenuButton = document.getElementById("toggle-menu");
const navItems = document.querySelectorAll(".nav-item");
const mainNav = document.querySelector(".main-nav");
const allSubNavs = document.querySelectorAll(".sub-nav");

toggleMenuButton.addEventListener("click", toggleMenu);

function toggleMenu() {
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
        const selectedLink = item.querySelector(".nav-item-link");
        const selectedSubNav = item.querySelector(".sub-nav");

        selectedLink.addEventListener("click", function () {
            allSubNavs.forEach((item) => {
                item.style.display = "none";
            });
            if (selectedSubNav) {
                selectedSubNav.style.display = "flex";
            }
        });
    });
}
