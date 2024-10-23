export function searchBarFilter(searchTerm, item, itemText) {
    if (itemText.includes(searchTerm)) {
        item.style.display = "flex";
    } else {
        item.style.display = "none";
    }
}
