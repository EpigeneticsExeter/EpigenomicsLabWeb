mobileModeWidth = 1000;

if (globalThis.innerWidth < mobileModeWidth) {
    const filterText = document.getElementById("filter-text");
    const filterGrid = document.querySelector(".filter-grid");
    const filterContainer = document.querySelector(".filter-container");
    const searchBox = document.querySelector(".search-box");
    filterGrid.style.display = "none";
    searchBox.style.display = "none";
    filterContainer.style.height = "auto";

    filterText.onclick = function () {
        filterText.style.color = "grey";
        if (filterGrid.style.display == "none") {
            filterGrid.style.display = "grid";
            searchBox.style.display = "flex";
            filterContainer.style.height = "35vh";
        } else {
            filterGrid.style.display = "none";
            searchBox.style.display = "none";
            filterContainer.style.height = "auto";
        }
        setTimeout(() => {
            filterText.style.color = "white";
        }, 150);
    };
}
