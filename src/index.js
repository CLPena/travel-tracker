import domUpdates from './domUpdates';
import Destination from './destination';
import Traveler from './traveler';
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

    loginForm.addEventListener('submit', preventReload)
  })
  .catch(error => console.log(error.message))

// DECLARE VARIABLES //
let traveler, trip, destination, agency;

let loginMain = document.querySelector('.login-screen');
let loginSubmitButton = document.querySelector('.login-button');
let usernameInput = document.querySelector('.username-input');
let passwordInput = document.querySelector('.password-input');
let loginForm = document.querySelector('.login-form');


// LOGIN FUNCTIONS //

function preventReload(e) {
  e.preventDefault();
  checkPassword();
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
    domUpdates.showAgentDashboard(travelersData, tripsData, destinationsData);
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
  let tripFinder = new TripFinder(traveler, tripsData, destinationsData, travelersData);
  // tripFinder.findTrips();
  tripFinder.findApprovedTrips();
  tripFinder.findPendingTrips();
  domUpdates.showTravelerDashboard(traveler);
  domUpdates.createPendingTripsWidget(tripFinder, destinationsData);
}
