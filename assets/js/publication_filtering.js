const latestButton = document.getElementById('Latest')
const oldestButton = document.getElementById('Oldest');
const azButton = document.getElementById('A-Z');
const zaButton = document.getElementById('Z-A');
const publications = document.querySelectorAll('div.publication');
const searchInput = document.getElementById('searchInput');

latestButton.addEventListener('click', () => sortPublicationsByDate('latestToOldest'));
oldestButton.addEventListener('click', () => sortPublicationsByDate('oldestToLatest'));
azButton.addEventListener('click', () => sortPublicationsByName('AtoZ'));
zaButton.addEventListener('click', () => sortPublicationsByName('ZtoA'));

// Show all publications with fade-in effect initially
sequentiallyShowPublications(publications);

function sequentiallyShowPublications(publications) {
    const parentDiv = publications[0].parentNode;
    
    publications.forEach((publication, index) => {
        publication.classList.remove('show');
        publication.style.display = 'none';

        parentDiv.appendChild(publication);

        publication.style.display = 'flex';
        publication.classList.add('fade-in')
        publication.classList.add('show');
    });
}

// ------- //
// SORTING //
// ------- //

function sortPublicationsByDate(sortOrder) {
    const publications = Array.from(document.querySelectorAll('div.publication'));

    function getMonthNumber(month) {
        return new Date(Date.parse(month + " 1, 2000")).getMonth();
    }

    publications.sort((a, b) => {
        const classListA = a.className.split(' ');
        const classListB = b.className.split(' ');

        // Get the date part from the second class name
        const dateA = classListA.length > 1 ? classListA[1] : '';
        const yearA = parseInt(dateA.slice(3));
        const dateB = classListB.length > 1 ? classListB[1] : '';
        const yearB = parseInt(dateB.slice(3));

        if (sortOrder === 'latestToOldest') {
            if (yearA !== yearB) {
                return yearB - yearA;
            } else {
                return getMonthNumber(dateB) - getMonthNumber(dateA);
            }
        } else if (sortOrder === 'oldestToLatest') {
            if (yearA !== yearB) {
                return yearA - yearB;
            } else {
                return getMonthNumber(dateA) - getMonthNumber(dateB);
            }
        }
    });
    sequentiallyShowPublications(publications);
}

function sortPublicationsByName(sortOrder) {
    const publications = Array.from(document.querySelectorAll('div.publication'));
    publications.sort((a, b) => {
        const nameA = a.id.toUpperCase();
        const nameB = b.id.toUpperCase();

        if (sortOrder === 'AtoZ') {
            return nameA.localeCompare(nameB);
        } else if (sortOrder === 'ZtoA') {
            return nameB.localeCompare(nameA);
        }
    });
    sequentiallyShowPublications(publications);
}

// --------- //
// SEARCHING //
// --------- //

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();

    publications.forEach(publication => {
        const publicationName = publication.id.toLowerCase();
  
        if (publicationName.includes(searchTerm)) {
            publication.style.display = 'flex';
            publication.classList.add('show');
        } else {
            publication.style.display = 'none';
            publication.classList.remove('show');
        }
    });
});
