function setDisplay(publicationDiv, extraInfoDisplay, allAuthorsDisplay, subsetAuthorsDisplay) {
    const elementsToDisplay = [
        { element: publicationDiv.querySelector('div.extra-information-container'), display: extraInfoDisplay },
        { element: publicationDiv.querySelector('div.all-authors'), display: allAuthorsDisplay },
        { element: publicationDiv.querySelector('div.subset-authors'), display: subsetAuthorsDisplay },
    ];

    elementsToDisplay.forEach(({ element, display }) => {
        if (element) {
            element.style.display = display;
        }
    });
}

function openPublication(event) {
    const clickedPublicationDiv = event.currentTarget;

    setDisplay(clickedPublicationDiv, 'flex', 'flex', 'none');

    const publicationDivs = document.querySelectorAll('div.publication');

    publicationDivs.forEach(div => {
        if (div !== clickedPublicationDiv) {
            closePublication(div);
        }
    });
}

function closePublication(div) {
    setDisplay(div, 'none', 'none', 'flex');
}

const publicationDivs = document.querySelectorAll('div.publication');
publicationDivs.forEach(div => {
    closePublication(div);
});

publicationDivs.forEach(div => {
    div.addEventListener('click', openPublication);
});

