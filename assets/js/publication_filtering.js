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

// Initially show publications from latest to oldest
sequentiallyShowPublications(publications);
sortPublicationsByDate("latestToOldest")

function sequentiallyShowPublications(publications) {
    const parentDiv = publications[0].parentNode;

    publications.forEach((publication, index) => {
        publication.style.display = 'none';

        parentDiv.appendChild(publication);

        publication.style.display = 'flex';
    });
}

// ------- //
// SORTING //
// ------- //

function sortPublicationsByDate(sortOrder) {
    const publications = Array.from(document.querySelectorAll('div.publication'));

    function parseDate(dateStr) {
        const months = {
            'JAN': 1,
            'FEB': 2,
            'MAR': 3,
            'APR': 4,
            'MAY': 5,
            'JUN': 6,
            'JUL': 7,
            'AUG': 8,
            'SEP': 9,
            'OCT': 10,
            'NOV': 11,
            'DEC': 12
        };

        const [monthAbbr, year] = dateStr.split(' ');
        const month = months[monthAbbr.toUpperCase()];

        return new Date(year, month);
    }

    publications.sort((a, b) => {
        const dateA = parseDate(a.querySelector(".date")?.textContent || '');
        const dateB = parseDate(b.querySelector(".date")?.textContent || '');

        const yearA = dateA.getFullYear();
        const yearB = dateB.getFullYear();

        const monthA = dateA.getMonth();
        const monthB = dateB.getMonth();

        if (sortOrder === 'latestToOldest') {
            if (yearA !== yearB) {
                return yearB - yearA;
            } else {
                return monthB - monthA; 
            }
        } else if (sortOrder === 'oldestToLatest') {
            if (yearA !== yearB) {
                return yearA - yearB;
            } else {
                return monthA - monthB; 
            }
        }
    });
    sequentiallyShowPublications(publications);
}

function sortPublicationsByName(sortOrder) {
    const publications = Array.from(document.querySelectorAll('div.publication'));
    publications.sort((a, b) => {
        const nameA = a.querySelector('.title').textContent?.toUpperCase() || '';
        const nameB = b.querySelector('.title').textContent?.toUpperCase() || '';

        if (sortOrder === 'AtoZ') {
            return nameA.localeCompare(nameB);
        } else if (sortOrder === 'ZtoA') {
            return nameB.localeCompare(nameA);
        }
    });
    sequentiallyShowPublications(publications);
}

// ----------- //
// BACK TO TOP //
// ----------- //


latestButton.onclick = function() { window.scrollTo(0,0); };
oldestButton.onclick = function(){ window.scrollTo(0,0); };
azButton.onclick = function(){ window.scrollTo(0,0); };
zaButton.onclick = function(){ window.scrollTo(0,0); };


// --------- //
// SEARCHING //
// --------- //

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();

    publications.forEach(publication => {
        const publicationTitle = publication.querySelector('.title')?.textContent.toLowerCase() || '';
        const allAuthors = publication.querySelector('.all-authors')?.textContent.toLowerCase() || '';

        const abstractText = publication.querySelector('.extra-information-container p')?.textContent.toLowerCase() || '';

        if (publicationTitle.includes(searchTerm) || 
            allAuthors.includes(searchTerm) || 
            abstractText.includes(searchTerm)) {
            publication.style.display = 'flex';
        } else {
            publication.style.display = 'none';
        }
    });
});
