mobileModeWidth = 1000;

// This functionality is only required in mobile mode as the filter box
// takes up a lot of space on smaller screens.
if (globalThis.innerWidth < mobileModeWidth) {
    const filterContainer = document.querySelector(".filter-container");
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
        filterText.style.color = "grey";
        filterGrid.style.display = "grid";
        if (searchBox) {
            searchBox.style.display = "flex";
        }
        setTimeout(() => {
            filterText.style.color = "white";
        }, 150);
    };

    hideElements();

    filterContainer.onclick = function () {
        if (filterGrid.style.display === "none") {
            showElements();
        }
    };
    filterText.onclick = function (event) {
        if (filterGrid.style.display === "grid") {
            // This is required so that the onclick event for `filterContainer`
            // doesn't activate right after (as this is a child element of
            // the container).
            event.stopPropagation();
            hideElements();
        }
    };

    buttons.forEach((button) => {
        button.onclick = function (event) {
            event.stopPropagation();
            hideElements();
        };
    });

    if (searchBox) {
        const searchInput = document.getElementById("searchInput");
        searchInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                hideElements();
            }
        });
    }
}
