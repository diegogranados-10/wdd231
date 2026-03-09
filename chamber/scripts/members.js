// Define the base URL for images and JSON data
const baseURL = 'https://diegog-ux10.github.io/wdd230/';

// Define the URL to fetch member data from JSON file
const linksURL = 'https://diegog-ux10.github.io/wdd230/chamber/data/members.json';

document.addEventListener('DOMContentLoaded', () => {
    // Get the container where member information will be displayed
    const directoryContainer = document.getElementById('directory-container');

    // Get the buttons for toggling between grid and list view
    const gridViewButton = document.getElementById('grid-view');
    const listViewButton = document.getElementById('list-view');

    // Check if all necessary elements are present in the document
    if (!directoryContainer || !gridViewButton || !listViewButton) {
        console.error('Error: One or more elements are not found in the document.');
        return;
    }

    // Fetch the member data from the JSON file
    fetch(linksURL)
        .then(response => {

            // Check if the network response is okay
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Parse the response to JSON
            return response.json();
        })
        .then(data => {
            console.log('Data fetched successfully:', data);

            // Display the members on the page
            displayMembers(data.members);
        })
        .catch(error => {

            // Log any errors that occur during fetching
            console.error('Error fetching data:', error);
        });

    // Function to display members in either grid or list view
    const displayMembers = (members) => {

        // Check if the current view is grid view
        if (directoryContainer.classList.contains('grid-view')) {

            // Clear the container before adding new content
            directoryContainer.innerHTML = '';

            // Display each member as a card in grid view
            members.forEach(member => {
                const memberCard = document.createElement('section');
                memberCard.innerHTML = `
                    <img src="${baseURL}chamber/images/${member.image}" alt="${member.name}" loading ="lazy" width="100" height="100">
                    <h3>${member.name}</h3>
                    <p>🖁 ${member.phone}</p>
                    <p>${member.address}</p>
                    <a href="${member.website}" target="_blank">${member.website}</a>
                `;
                directoryContainer.appendChild(memberCard);
            });
        } else {
            directoryContainer.innerHTML = '';

            // Display each member as a row in list view
            members.forEach(member => {
                const memberRow = document.createElement('section');
                memberRow.innerHTML = `
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">${member.website}</a>
                `;
                directoryContainer.appendChild(memberRow);
            });
        }
    };

    // Event listener for grid view button
    gridViewButton.addEventListener('click', () => {

        // Switch to grid view by adding the class
        directoryContainer.className = 'grid-view';

        // Fetch and display members in grid view
        fetch(linksURL)
            .then(response => response.json())
            .then(data => displayMembers(data.members))
            .catch(error => console.error('Error fetching data:', error));
    });

    // Event listener for list view button
    listViewButton.addEventListener('click', () => {

        // Switch to list view by adding the class
        directoryContainer.className = 'list-view';

        // Fetch and display members in list view
        fetch(linksURL)
            .then(response => response.json())
            .then(data => displayMembers(data.members))
            .catch(error => console.error('Error fetching data:', error));
    });
});