import domUpdates from './domUpdates';
import Destination from './destination';
import Traveler from './traveler';
import Trip from './trip';
import TripFinder from './tripFinder';
import Finder from './Finder';
import Agency from './agency';

import $ from 'jquery';
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
  })
  .catch(error => console.log(error.message))

// DECLARE VARIABLES //
let traveler, trip, destination, agency, tripFinder, bookTripForm, currentTravelerID;
let loginMain = document.querySelector('.login-screen');
let loginSubmitButton = document.querySelector('.login-button');
let usernameInput = document.querySelector('.username-input');
let passwordInput = document.querySelector('.password-input');
let loginForm = document.querySelector('.login-form');


// LOGIN FUNCTIONS //

function preventReload(e) {
  e.preventDefault();
};

function checkPassword() {
  if (passwordInput.value === 'travel2020') {
    determineIfAgent();
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
  if(id >= 1 && id <= 50) {
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
  domUpdates.createBookTripWidget(destinationsData);
  domUpdates.createCurrentTripWidget(tripFinder, destinationsData);
  domUpdates.createUpcomingTripsWidget(tripFinder, destinationsData);
  domUpdates.createPastTripsWidget(tripFinder, destinationsData);
  domUpdates.createPendingTripsWidget(tripFinder, destinationsData);
  domUpdates.createCostOfTravelWidget(tripFinder);
}

function createAgency() {
  agency = new Agency(tripsData, destinationsData, travelersData);
  domUpdates.showAgentDashboard();
  domUpdates.createAgencyIncomeWidget(agency);
  domUpdates.createTravelersTodayWidget(agency);
  domUpdates.createPendingTripsAgencyWidget(agency, destinationsData, travelersData);
}

function checkCompletion() {
  if(event.target.parentNode.classList.contains('book-trip-form') && document.querySelector('.book-trip-form').checkValidity()) {
    createTrip();
    domUpdates.showCost(destinationsData, trip);
    bookTripForm = document.querySelector('.book-trip-form');
    bookTripForm.addEventListener('submit', handleSubmit);
  }
}

function createTrip() {
  trip = new Trip(traveler, destinationsData);
}

function handleSubmit() {
  currentTravelerID = traveler.id;
  submitTrip(currentTravelerID);
}

function submitTrip() {
  let tripObject = {
    id: trip.id,
    userID: trip.userID,
    destinationID: trip.destinationID,
    travelers: trip.travelers,
    date: trip.date,
    duration: trip.duration,
    status: trip.status,
    suggestedActivities: trip.suggestedActivities
  }
  fetch("https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tripObject)
  })
  .then(response => response.json())
  .then(() => refreshData())
  .catch(error => console.log(error.message))
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
      createTraveler(currentTravelerID);
    })
    .catch(error => console.log(error.message))
}
