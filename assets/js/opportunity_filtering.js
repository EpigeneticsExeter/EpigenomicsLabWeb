const allButton = document.getElementById('all')
const graButton = document.getElementById('gra');
const phdButton = document.getElementById('phd');
const postdocButton = document.getElementById('postdoc');
const ptyButton = document.getElementById('pty');
const opportunities = document.querySelectorAll('div.opportunity');
const zeroOpportunities = document.querySelector('div.zero_opportunities')

allButton.addEventListener('click', () => filteropportunities('all'));
graButton.addEventListener('click', () => filteropportunities('gra'));
phdButton.addEventListener('click', () => filteropportunities('phd'));
postdocButton.addEventListener('click', () => filteropportunities('postdoc'));
ptyButton.addEventListener('click', () => filteropportunities('pty'));

if (noOpportunities()) {
    zeroOpportunities.style.display = 'flex';
}

function filteropportunities(category) {
    zeroOpportunities.style.display = 'none';
    opportunities.forEach(opportunity => {
        opportunity.style.display = 'none';
    });
    opportunities.forEach((opportunity, index) => {
        if (category === 'all' || opportunity.classList.contains(category)) {
            opportunity.style.display = 'flex';
        };
    });

    if (noOpportunities()) {
        zeroOpportunities.style.display = 'flex';
    }
};

function noOpportunities() {
    if (opportunities.length === 0) {
        return true;
    };
    const opportunitiesArray = [...opportunities]; 

    return !opportunitiesArray.some((opportunity) => 
        opportunity.style.display !== 'none'
    );
}

if (sessionStorage.getItem("pty-clicked") === "true" ) {
    filteropportunities('pty')
    sessionStorage.removeItem("pty-clicked")
}
