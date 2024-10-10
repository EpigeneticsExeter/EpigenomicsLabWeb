mobileModeWidth = 1000;

if (globalThis.innerWidth < mobileModeWidth) {
    const filterText = document.getElementById("filter-text");
    const filterGrid = document.querySelector(".filter-grid");
    const searchBox = document.querySelector(".search-box");
    const buttons = document.querySelectorAll(`button[type=button]`);

    const hideElements = () => {
        filterGrid.style.display = "none";
        // searchBox is not in all filter boxes, so a conditional check is
        // required here
        if (searchBox) {
            searchBox.style.display = "none";
        }
    };

    const showElements = () => {
        filterGrid.style.display = "grid";
        if (searchBox) {
            searchBox.style.display = "flex";
        }
    };

    hideElements();

    filterText.onclick = function () {
        filterText.style.color = "grey";
        if (filterGrid.style.display === "none") {
            showElements();
        } else {
            hideElements();
        }
        setTimeout(() => {
            filterText.style.color = "white";
        }, 150);
    };

    buttons.forEach((button) => {
        button.onclick = hideElements;
    });

    if (searchBox) {
        const searchInput = document.getElementById("searchInput");
        searchInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                console.log("happened");
                hideElements();
            }
        });
    }
}
