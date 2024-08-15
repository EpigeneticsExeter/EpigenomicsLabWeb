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

function addBoxShadow(publicationDiv) {
    publicationDiv.style.boxShadow = '0px 5px 10px 0 rgba(0,0,0, 0.3)';
}

function removeBoxShadow(publicationDiv) {
    publicationDiv.style.boxShadow = '0px 5px 10px 0 rgba(0,0,0, 0.1)';
}

function openPublication(event) {
    const clickedPublicationDiv = event.currentTarget;

    setDisplay(clickedPublicationDiv, 'flex', 'flex', 'none');
    addBoxShadow(clickedPublicationDiv)

    const publicationDivs = document.querySelectorAll('div.publication');

    publicationDivs.forEach(div => {
        if (div !== clickedPublicationDiv) {
            closePublication(div);
        }
    });
}

function closePublication(div) {
    setDisplay(div, 'none', 'none', 'flex');
    removeBoxShadow(div)
}

const publicationDivs = document.querySelectorAll('div.publication');
publicationDivs.forEach(div => {
    closePublication(div);
});

publicationDivs.forEach(div => {
    div.addEventListener('click', openPublication);
});

document.addEventListener('click', (event) => {
    const isPublicationDivClicked = Array.from(publicationDivs).some(div => div.contains(event.target));

    if (!isPublicationDivClicked) {
        publicationDivs.forEach(div => {
            closePublication(div);
        });
    }
});
