import { searchBarFilter } from "./search-bar.js";

const buttons = [
    { id: "all", type: "all" },
    { id: "gra", type: "gra" },
    { id: "pi", type: "pi" },
    { id: "phd", type: "phd" },
    { id: "postdoc", type: "postdoc" },
    { id: "lecturer", type: "lecturer" },
    { id: "research-fellow", type: "research-fellow" },
    { id: "lab-technician", type: "lab-technician" },
    { id: "research-assistant", type: "research-assistant" },
    { id: "gla", type: "gla" },
    { id: "pty", type: "pty" },
];

const profiles = document.querySelectorAll("div.person-profile");
const searchInput = document.getElementById("searchInput");

buttons.forEach((button) => {
    const btnElement = document.getElementById(button.id);
    btnElement.addEventListener("click", () => filterProfiles(button.type));
});

// Show all profiles with fade-in effect initially
profiles.forEach((profile, index) => {
    profile.classList.add("fade-in");
    setTimeout(() => {
        profile.classList.add("show");
    }, 100 * (index + 1));
});

function filterProfiles(category) {
    // displays profiles sequentially depending on the button clicked
    let delay = 100;
    profiles.forEach((profile) => {
        profile.classList.remove("show");
        profile.style.display = "none";
    });
    profiles.forEach((profile) => {
        if (category === "all" || profile.classList.contains(category)) {
            setTimeout(() => {
                profile.style.display = "flex";
                setTimeout(() => {
                    profile.classList.add("show");
                }, 50);
            }, delay);
            delay += 100;
        }
    });
}

searchInput.oninput = function () {
    const searchTerm = searchInput.value.toLowerCase();
    profiles.forEach((profile) => {
        const profileName = profile.id.toLowerCase();
        searchBarFilter(searchTerm, profile, profileName);
    });
};
