const allButton = document.getElementById('All')
const graButton = document.getElementById('GRA');
const piButton = document.getElementById('PI');
const phdButton = document.getElementById('PhD');
const postdocButton = document.getElementById('Postdoc');
const profiles = document.querySelectorAll('div.person-profile');
const searchInput = document.getElementById('searchInput');

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
    }, 100 * (index + 1))
});

function filterProfiles(category) {
    // displays profiles sequentially depending on the button clicked
    let delay = 100;
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
                }, 50); 
            }, delay); 
            delay += 100
        }

    });
}

// displays profiles that contain the string in the search bar
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();

    profiles.forEach(profile => {
        const profileName = profile.id.toLowerCase();
  
        if (profileName.includes(searchTerm)) {
            profile.style.display = 'flex';
            profile.classList.add('show');
        } else {
            profile.style.display = 'none';
            profile.classList.remove('show');
        }
    });
});
