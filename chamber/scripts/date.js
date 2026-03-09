// Check if localStorage is supported
if (typeof Storage !== "undefined") {
  let lastVisit = localStorage.getItem("lastVisit");

  function calculateDaysBetweenVisits(visitDate) {
    const currentDate = Date.now();
    const millisecondsInADay = 24 * 60 * 60 * 1000;

    return Math.floor((currentDate - visitDate) / millisecondsInADay);
  }

  if (!lastVisit) {

    displayMessage("Welcome! Let us know if you have any questions.");
  } else {

    const daysBetweenVisits = calculateDaysBetweenVisits(lastVisit);

    if (daysBetweenVisits < 1) {

      displayMessage("Back so soon! Awesome!");
    } else {

      const dayMessage = daysBetweenVisits === 1 ? "day" : "days";
      displayMessage(
        `You last visited ${daysBetweenVisits} ${dayMessage} ago.`
      );
    }
  }

  // Store the current visit date in localStorage
  localStorage.setItem("lastVisit", Date.now());
} else {
  displayMessage("LocalStorage not supported. Cannot track last visit.");
}

function displayMessage(message) {
  document.getElementById("messageContainer").textContent = message;
}
