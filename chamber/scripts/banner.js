// Function to check the current day and display the banner accordingly
function displayBanner() {
    const banner = document.getElementById('meet-greet-banner');
    const closeButton = document.getElementById('close-banner-btn');
    const today = new Date().getDay(); // Get the current day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

    if (today === 1 || today === 2 || today === 3) { // Monday, Tuesday, Wednesday
        banner.style.display = 'block';
    }

    closeButton.addEventListener('click', () => {
        banner.style.display = 'none';
    });
}

// Initialize the page when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    displayBanner();
    loadSpotlights();
});
