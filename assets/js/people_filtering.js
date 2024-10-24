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

function filterProfiles(category) {
    // displays profiles sequentially depending on the button clicked
    profiles.forEach((profile) => {
        profile.style.display = "none";
    });
    profiles.forEach((profile) => {
        if (category === "all" || profile.classList.contains(category)) {
            profile.style.display = "flex";
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

filterProfiles("all");
