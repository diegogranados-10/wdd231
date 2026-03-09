function getRandomElements(arr, count) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function displaySpotlights(members) {
    const sponsorsContainer = document.getElementById('sponsors-container');
    sponsorsContainer.innerHTML = ''; // Clear any existing content

    members.forEach(member => {
        const sponsorCard = document.createElement('div');
        sponsorCard.className = 'sponsor-card';
        
        const img = document.createElement('img');
        img.src = `./images/${member.image}`;
        img.alt = member.name;

        const name = document.createElement('h3');
        name.textContent = member.name;

        const description = document.createElement('p');
        description.textContent = member.description;

        sponsorCard.appendChild(img);
        sponsorCard.appendChild(name);
        sponsorCard.appendChild(description);
        sponsorsContainer.appendChild(sponsorCard);
    });
}

async function loadSpotlights() {
    try {
        const response = await fetch('/chamber/data/members.json');
        console.log(response);
        const data = await response.json();
        const qualifiedMembers = data.members.filter(member => 
            member.membership_level === 'Gold' || member.membership_level === 'Silver'
        );
        const spotlights = getRandomElements(qualifiedMembers, 3);
        displaySpotlights(spotlights);
    } catch (error) {
        console.error('Error fetching the members:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadSpotlights);
