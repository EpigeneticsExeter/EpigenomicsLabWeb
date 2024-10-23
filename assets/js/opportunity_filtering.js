const buttons = [
    { id: "all", type: "all" },
    { id: "gra", type: "gra" },
    { id: "phd", type: "phd" },
    { id: "postdoc", type: "postdoc" },
    { id: "pty", type: "pty" },
];

const opportunities = document.querySelectorAll("div.opportunity");
const zeroOpportunities = document.querySelector("div.zero_opportunities");

buttons.forEach((button) => {
    const btnElement = document.getElementById(button.id);
    btnElement.addEventListener(
        "click",
        () => filteropportunities(button.type),
    );
});

if (noOpportunities()) {
    zeroOpportunities.style.display = "flex";
}

function filteropportunities(category) {
    zeroOpportunities.style.display = "none";
    opportunities.forEach((opportunity) => {
        opportunity.style.display = "none";
    });
    opportunities.forEach((opportunity) => {
        if (category === "all" || opportunity.classList.contains(category)) {
            opportunity.style.display = "flex";
        }
    });

    if (noOpportunities()) {
        zeroOpportunities.style.display = "flex";
    }
}

function noOpportunities() {
    if (opportunities.length === 0) {
        return true;
    }
    const opportunitiesArray = [...opportunities];

    return !opportunitiesArray.some((opportunity) =>
        opportunity.style.display !== "none"
    );
}

if (sessionStorage.getItem("pty-clicked") === "true") {
    filteropportunities("pty");
    sessionStorage.removeItem("pty-clicked");
}
