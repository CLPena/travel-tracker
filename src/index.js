import domUpdates from './domUpdates';
import $ from 'jquery';
import './css/base.scss';
import './images/login-background.jpg';
import './images/compass.png';
import './images/pin.png';


let loginMain = document.querySelector('.login-screen');
let loginSubmitButton = document.querySelector('.login-button');
let usernameInput = document.querySelector('.username-input');
let passwordInput = document.querySelector('.password-input');

loginSubmitButton.addEventListener('click', determineIfAgent);
loginSubmitButton.addEventListener('keyup', determineKey);

function determineKey(event) {
  if(event.keyCode === 13) {
    determineIfAgent();
  }
}

function determineIfAgent() {
  if(usernameInput.value === 'agency' && passwordInput.value === 'travel2020') {
    domUpdates.clearMain()
  } else {
    determineIfTraveler();
  }
}

function determineIfTraveler() {
  if(usernameInput.value === 'traveler50' && passwordInput.value === 'travel2020') {
    domUpdates.clearMain()
  } else {
    domUpdates.displayError();
  }
}
