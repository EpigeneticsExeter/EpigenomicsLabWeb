const allButton = document.getElementById("all");
const graButton = document.getElementById("gra");
const piButton = document.getElementById("pi");
const phdButton = document.getElementById("phd");
const postdocButton = document.getElementById("postdoc");
const lecturerButton = document.getElementById("lecturer");
const researchFellowButton = document.getElementById("research-fellow");
const labTechnicianButton = document.getElementById("lab-technician");
const researchAssistantButton = document.getElementById("research-assistant");
const glaButton = document.getElementById("gla");
const ptyButton = document.getElementById("pty");
const profiles = document.querySelectorAll("div.person-profile");
const searchInput = document.getElementById("searchInput");

allButton.addEventListener(
    "click",
    () => filterProfiles("all"),
);
graButton.addEventListener(
    "click",
    () => filterProfiles("gra"),
);
piButton.addEventListener(
    "click",
    () => filterProfiles("pi"),
);
phdButton.addEventListener(
    "click",
    () => filterProfiles("phd"),
);
postdocButton.addEventListener(
    "click",
    () => filterProfiles("postdoc"),
);
lecturerButton.addEventListener(
    "click",
    () => filterProfiles("lecturer"),
);
researchFellowButton.addEventListener(
    "click",
    () => filterProfiles("research-fellow"),
);
labTechnicianButton.addEventListener(
    "click",
    () => filterProfiles("lab-technician"),
);
researchAssistantButton.addEventListener(
    "click",
    () => filterProfiles("research-assistant"),
);
glaButton.addEventListener(
    "click",
    () => filterProfiles("gla"),
);
ptyButton.addEventListener(
    "click",
    () => filterProfiles("pty"),
);

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

// displays profiles that contain the string in the search bar
searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();

    profiles.forEach((profile) => {
        const profileName = profile.id.toLowerCase();

        if (profileName.includes(searchTerm)) {
            profile.style.display = "flex";
            profile.classList.add("show");
        } else {
            profile.style.display = "none";
            profile.classList.remove("show");
        }
    });
});
