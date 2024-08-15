function openPublicationClick(div) {
    const clickedPublicationDiv = div.currentTarget;

    const extraInfoContainer = clickedPublicationDiv.querySelector('div.extra-information-container');
    const allAuthorsDiv = clickedPublicationDiv.querySelector('div.all-authors');
    const subsetAuthorsDiv = clickedPublicationDiv.querySelector('div.subset-authors');

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

    publicationDivs.forEach(div => {
        if (div !== clickedPublicationDiv) {
            closePublication(div); 
        }
    });
}

function closePublication(div) {
    const publicationDiv = div;

    const extraInfoContainer = publicationDiv.querySelector('div.extra-information-container');
    const allAuthorsDiv = publicationDiv.querySelector('div.all-authors');
    const subsetAuthorsDiv = publicationDiv.querySelector('div.subset-authors');

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

const publicationDivs = document.querySelectorAll('div.publication');
console.log(publicationDivs);

publicationDivs.forEach(div => {
    closePublication(div)
});

publicationDivs.forEach(div => {
    div.addEventListener('click', openPublicationClick);
});

