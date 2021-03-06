import domUpdates from './domUpdates';
import Traveler from './traveler';
import Trip from './trip';
import TripFinder from './tripFinder';
import Agency from './agency';

import './css/base.scss';
import './images/login-background.jpg';
import './images/compass.png';
import './images/pin.png';

// FETCH DATA //
let travelersData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers')
  .then(response => response.json())
  .then(data => data.travelers)
  .catch(error => console.log(error.message))

let tripsData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips')
  .then(response => response.json())
  .then(data => data.trips)
  .catch(error => console.log(error.message));

let destinationsData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/destinations/destinations')
  .then(response => response.json())
  .then(data => data.destinations)
  .catch(error => console.log(error.message));

Promise.all([travelersData, tripsData, destinationsData])
  .then(data => {
    travelersData = data[0];
    tripsData = data[1];
    destinationsData = data[2];

    document.addEventListener('submit', preventReload);
    loginForm.addEventListener('submit', checkPassword);
    document.addEventListener('change', checkCompletion);
    document.addEventListener('change', checkSearchValidity);
  })
  .catch(error => console.log(error.message))

// DECLARE VARIABLES //
let traveler, pendingTripDivs, trip, agency, tripFinder, bookTripForm, searchTravelersForm, currentTravelerID;
let usernameInput = document.querySelector('.username-input');
let passwordInput = document.querySelector('.password-input');
let loginForm = document.querySelector('.login-form');


// LOGIN FUNCTIONS //

function preventReload(e) {
  e.preventDefault();
}

function checkPassword() {
  if (passwordInput.value === 'travel2020') {
    determineIfAgent()
  } else {
    domUpdates.displayError();
  }
}

function determineIfAgent() {
  if (usernameInput.value === 'agency') {
    domUpdates.clearMain();
    createAgency();
  } else {
    determineTravelerID();
  }
}

function determineTravelerID() {
  if (usernameInput.value.includes('traveler')) {
    let id = parseInt(usernameInput.value.replace('traveler', ''));
    checkRange(id);
  } else {
    domUpdates.displayError();
  }
}

function checkRange(id) {
  if (id >= 1 && id <= 50) {
    domUpdates.clearMain();
    createTraveler(id);
  } else {
    domUpdates.displayError();
  }
}

function createTraveler(id) {
  let foundTraveler = travelersData.find(traveler => traveler.id === id);
  traveler = new Traveler(foundTraveler.id, foundTraveler.name, foundTraveler.travelerType);
  tripFinder = new TripFinder(traveler, tripsData, destinationsData, travelersData);
  domUpdates.showTravelerDashboard(traveler);
  domUpdates.createCostOfTravelWidget(tripFinder);
  domUpdates.createCurrentTripWidget(tripFinder, destinationsData);
  domUpdates.createBookTripWidget(destinationsData);
  domUpdates.createUpcomingTripsWidget(tripFinder, destinationsData);
  domUpdates.createPastTripsWidget(tripFinder, destinationsData);
  domUpdates.createPendingTripsWidget(tripFinder, destinationsData);
}

function createAgency() {
  agency = new Agency(tripsData, destinationsData, travelersData);
  domUpdates.showAgentDashboard();
  domUpdates.createAgencyIncomeWidget(agency);
  domUpdates.createTravelersTodayWidget(agency);
  domUpdates.createPendingTripsAgencyWidget(agency, destinationsData, travelersData);
  domUpdates.createViewTravelerInfoWidget(travelersData);
  pendingTripDivs = document.querySelectorAll('.pending-trips');
  pendingTripDivs.forEach(div => div.addEventListener('click', handleApproveOrDeny))
}

function checkSearchValidity() {
  if (event.target.parentNode.classList.contains('find-traveler-form') && document.querySelector('.find-traveler-form').checkValidity()) {
    searchTravelersForm = document.querySelector('.find-traveler-form');
    searchTravelersForm.addEventListener('submit', handleSearchSubmit);
  }
}

function handleSearchSubmit(event) {
  domUpdates.displayTraveler(event, tripsData, destinationsData, travelersData);
  pendingTripDivs = document.querySelectorAll('.pending-trips');
  pendingTripDivs.forEach(div => div.addEventListener('click', handleApproveOrDeny))
}

function checkCompletion() {
  if (event.target.parentNode.classList.contains('book-trip-form') && document.querySelector('.book-trip-form').checkValidity()) {
    createTrip();
    domUpdates.showCost(destinationsData, trip);
    bookTripForm = document.querySelector('.book-trip-form');
    bookTripForm.addEventListener('submit', handleSubmit);
  }
}

function createTrip() {
  trip = new Trip(traveler, destinationsData);
  trip.findDestinationID(destinationsData);
  trip.getTravelers();
  trip.getDate();
  trip.calculateDuration();
}

function handleSubmit() {
  currentTravelerID = traveler.id;
  traveler.bookTrip(trip)
    .then(() => refreshData())
    .then(() => createTraveler(currentTravelerID))
}

function refreshData() {
  travelersData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers')
    .then(response => response.json())
    .then(data => data.travelers)
    .catch(error => console.log(error.message))

  tripsData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips')
    .then(response => response.json())
    .then(data => data.trips)
    .catch(error => console.log(error.message));

  destinationsData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/destinations/destinations')
    .then(response => response.json())
    .then(data => data.destinations)
    .catch(error => console.log(error.message));

  return Promise.all([travelersData, tripsData, destinationsData])
    .then(data => {
      travelersData = data[0];
      tripsData = data[1];
      destinationsData = data[2];
      domUpdates.clearMain();
    })
    .catch(error => console.log(error.message))
}

function handleApproveOrDeny() {
  if (event.target.classList.contains('approve')) {
    handleApproveTrip(event);
  } else if (event.target.classList.contains('deny')) {
    handleDenyTrip(event);
  }
}

function handleApproveTrip(event) {
  let tripID = parseInt(event.target.parentNode.id);
  agency.approveTrip(tripID)
    .then(() => refreshData())
    .then(() => domUpdates.clearMain())
    .then(() => createAgency())
}

function handleDenyTrip(event) {
  let tripID = parseInt(event.target.parentNode.id);
  agency.denyTrip(tripID)
    .then(() => refreshData())
    .then(() => domUpdates.clearMain())
    .then(() => createAgency())
}
