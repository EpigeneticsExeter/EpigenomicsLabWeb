// Function to handle the click event on publication divs
function openPublicationClick(div) {
    // Get the clicked publication div
    const clickedPublicationDiv = div.currentTarget;

    // Find child divs with the specified class names
    const extraInfoContainer = clickedPublicationDiv.querySelector('div.extra-information-container');
    const allAuthorsDiv = clickedPublicationDiv.querySelector('div.all-authors');
    const subsetAuthorsDiv = clickedPublicationDiv.querySelector('div.subset-authors');

    // Set display properties
    if (extraInfoContainer) {
        extraInfoContainer.style.display = 'flex';
    }
    if (allAuthorsDiv) {
        allAuthorsDiv.style.display = 'flex';
    }
    if (subsetAuthorsDiv) {
        subsetAuthorsDiv.style.display = 'none';
    }
    const publicationDivs = document.querySelectorAll('.publication');

    // Call closePublication on all other publication divs
    publicationDivs.forEach(div => {
        if (div !== clickedPublicationDiv) {
            closePublication(div); // Call your function to close other publications
        }
    });
}

function closePublication(div) {
    const publicationDiv = div;

    // Find child divs with the specified class names
    const extraInfoContainer = publicationDiv.querySelector('div.extra-information-container');
    const allAuthorsDiv = publicationDiv.querySelector('div.all-authors');
    const subsetAuthorsDiv = publicationDiv.querySelector('div.subset-authors');

    // Set display properties
    if (extraInfoContainer) {
        extraInfoContainer.style.display = 'none';
    }
    if (allAuthorsDiv) {
        allAuthorsDiv.style.display = 'none';
    }
    if (subsetAuthorsDiv) {
        subsetAuthorsDiv.style.display = 'flex';
    }

}

// Get all divs with the class 'publication'
const publicationDivs = document.querySelectorAll('div.publication');
console.log(publicationDivs);

publicationDivs.forEach(div => {
    closePublication(div)
});

// Add click event listener to each publication div
publicationDivs.forEach(div => {
    div.addEventListener('click', openPublicationClick);
});

