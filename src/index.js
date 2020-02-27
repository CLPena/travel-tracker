import domUpdates from './domUpdates';
import Destination from './destination';
import Traveler from './traveler';
import Trip from './trip';
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

    loginSubmitButton.addEventListener('click', determineIfAgent);
    // loginSubmitButton.addEventListener('keyup', determineKey);
  })
  .catch(error => console.log(error.message))

// DECLARE VARIABLES //
let traveler, trip, destination, agency;

let loginMain = document.querySelector('.login-screen');
let loginSubmitButton = document.querySelector('.login-button');
let usernameInput = document.querySelector('.username-input');
let passwordInput = document.querySelector('.password-input');

// function determineKey(event) {
//   if(event.keyCode === 13) {
//     determineIfAgent();
//   }
// }

function determineIfAgent() {
  if (usernameInput.value === 'agency' && passwordInput.value === 'travel2020') {
    domUpdates.clearMain();
  } else {
    determineTravelerID();
  }
}

function determineTravelerID() {
  if (usernameInput.value.includes('traveler')) {
    let num = parseInt(usernameInput.value.replace('traveler', ''));
    checkRange(num)
  } else {
    domUpdates.displayError();
  }
}

function checkRange(num) {
  if(num >= 1 && num <= 50) {
    checkPassword();
  } else {
    domUpdates.displayError();
  }
}

function checkPassword() {
  if (passwordInput.value === 'travel2020') {
    domUpdates.clearMain()
  } else {
    domUpdates.displayError();
  }
}
