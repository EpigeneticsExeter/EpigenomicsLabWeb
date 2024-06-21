// Get all the filter buttons
const allButton = document.getElementById('All')
const graButton = document.getElementById('GRA');
const piButton = document.getElementById('PI');
const phdButton = document.getElementById('PhD');
const postdocButton = document.getElementById('Postdoc');

// Get all the profiles
const profiles = document.querySelectorAll('div.person-profile');

allButton.addEventListener('click', () => filterProfiles('all'));
graButton.addEventListener('click', () => filterProfiles('GRA'));
piButton.addEventListener('click', () => filterProfiles('PI'));
phdButton.addEventListener('click', () => filterProfiles('PhD'));
postdocButton.addEventListener('click', () => filterProfiles('PostDoc'));

// Show all profiles with fade-in effect initially
profiles.forEach((profile,index) => {
    profile.classList.add('fade-in');
    setTimeout(() => {
    profile.classList.add('show');
    }, 200 * (index + 1))
});

// Function to filter profiles based on the link clicked with fade-in effect
function filterProfiles(category) {
    let delay = 200;
    profiles.forEach(profile => {
        profile.classList.remove('show');
        profile.style.display = 'none';
    })
    profiles.forEach((profile, index) => {
        if (category === 'all' || profile.classList.contains(category)) {
            setTimeout(() => {
                profile.style.display = 'flex';
                setTimeout(() => {
                    profile.classList.add('show');
                }, 50); // Adjust this delay as needed for the fade-in effect
            }, delay); // Initial delay for each profile
            delay += 200
        }

    });
}

