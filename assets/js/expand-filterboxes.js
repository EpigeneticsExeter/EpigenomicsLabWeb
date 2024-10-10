mobileModeWidth = 1000;

if (globalThis.innerWidth < mobileModeWidth) {
    const filterText = document.getElementById("filter-text");
    const filterGrid = document.querySelector(".filter-grid");
    const searchBox = document.querySelector(".search-box");

    const hideElements = () => {
        filterGrid.style.display = "none";
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
}
