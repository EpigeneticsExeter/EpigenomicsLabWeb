import { searchBarFilter } from "./search-bar.js";

const latestButton = document.getElementById("Latest");
const oldestButton = document.getElementById("Oldest");
const azButton = document.getElementById("A-Z");
const zaButton = document.getElementById("Z-A");
const publications = document.querySelectorAll("div.publication");
const searchInput = document.getElementById("searchInput");

// Initially show publications from latest to oldest
sequentiallyShowPublications(publications);
sortPublicationsByDate("latestToOldest");

function sequentiallyShowPublications(publications) {
    const parentDiv = publications[0].parentNode;

    publications.forEach((publication) => {
        publication.style.display = "none";

        parentDiv.appendChild(publication);

        publication.style.display = "flex";
    });
}

// ------- //
// SORTING //
// ------- //

function sortPublicationsByDate(sortOrder) {
    const publications = Array.from(
        document.querySelectorAll("div.publication"),
    );

    function parseDate(dateStr) {
        const months = {
            "JAN": 1,
            "FEB": 2,
            "MAR": 3,
            "APR": 4,
            "MAY": 5,
            "JUN": 6,
            "JUL": 7,
            "AUG": 8,
            "SEP": 9,
            "OCT": 10,
            "NOV": 11,
            "DEC": 12,
        };

        const [monthAbbreviation, year] = dateStr.split(" ");
        const month = months[monthAbbreviation.toUpperCase()];

        return new Date(year, month);
    }

    publications.sort((a, b) => {
        const dateA = parseDate(a.querySelector(".date")?.textContent || "");
        const dateB = parseDate(b.querySelector(".date")?.textContent || "");

        const yearA = dateA.getFullYear();
        const yearB = dateB.getFullYear();

        const monthA = dateA.getMonth();
        const monthB = dateB.getMonth();

        if (sortOrder === "latestToOldest") {
            if (yearA !== yearB) {
                return yearB - yearA;
            } else {
                return monthB - monthA;
            }
        } else if (sortOrder === "oldestToLatest") {
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
    const publications = Array.from(
        document.querySelectorAll("div.publication"),
    );
    publications.sort((a, b) => {
        const nameA = a.querySelector(".title").textContent?.toUpperCase() ||
            "";
        const nameB = b.querySelector(".title").textContent?.toUpperCase() ||
            "";

        if (sortOrder === "AtoZ") {
            return nameA.localeCompare(nameB);
        } else if (sortOrder === "ZtoA") {
            return nameB.localeCompare(nameA);
        }
    });
    sequentiallyShowPublications(publications);
}

// ------- //
// BUTTONS //
// ------- //

latestButton.onclick = function () {
    globalThis.scrollTo(0, 0);
    sortPublicationsByDate("latestToOldest");
};
oldestButton.onclick = function () {
    globalThis.scrollTo(0, 0);
    sortPublicationsByDate("oldestToLatest");
};
azButton.onclick = function () {
    globalThis.scrollTo(0, 0);
    sortPublicationsByName("AtoZ");
};
zaButton.onclick = function () {
    globalThis.scrollTo(0, 0);
    sortPublicationsByName("ZtoA");
};

searchInput.oninput = function () {
    const searchTerm = searchInput.value.toLowerCase();
    publications.forEach((publication) => {
        const publicationTitle =
            publication.querySelector(".title")?.textContent.toLowerCase() ||
            "";
        const allAuthors =
            publication.querySelector(".all-authors")?.textContent
                .toLowerCase() || "";

        const abstractText =
            publication.querySelector(".extra-information-container p")
                ?.textContent.toLowerCase() || "";
        const fullItemText = publicationTitle + allAuthors + abstractText;

        searchBarFilter(searchTerm, publication, fullItemText);
    });
};
