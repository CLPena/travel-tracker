import $ from 'jquery';
import moment from 'moment';

let domUpdates = {
  showTravelerDashboard(traveler){
    $('header').append(`<h2 class="banner-welcome"> Welcome, ${traveler.name}!</h2>`)
    $('main').append(
      `<div class="user-dashboard">
        <div class="traveler-info">
          <h3> PROFILE: </h3>
          <p class="bold">name:</p>
          <p class="info">${traveler.name}</p>
          <p class="bold space">id#: ${traveler.id}</p>
          <p class="bold">travel style:</p>
          <p class="info">${traveler.travelerType}</p>
        </div>
      </div>`
    )
  },

  createPendingTripsWidget(tripFinder, destinationsData) {
    let travelerPendingTrips;

    if (tripFinder.pendingTrips.length){
      travelerPendingTrips = (tripFinder.pendingTrips.map(trip => {
      return `<p class="bold destination">destination: ${(destinationsData.find(destination => destination.id === trip.destinationID)).destination}</p>
      <p class="trip-info">departure: ${trip.date} | duration: ${trip.duration} days</p>
      <p class="trip-info">travelers: ${trip.travelers}</p>
      `
      })).join(" ")
    } else {
      travelerPendingTrips = `<p class="bold destination">You have no pending trips!</p>`
    }

    $('.user-dashboard').append(
      `<div class="traveler-trips">
        <h3>PENDING TRIPS:</h3>
        <p class="info">${travelerPendingTrips}</p>
      </div>`
    )
  },

  createUpcomingTripsWidget(tripFinder, destinationsData) {
    let travelerUpcomingTrips;

    if (tripFinder.upcomingTrips.length){
      travelerUpcomingTrips = (tripFinder.upcomingTrips.map(trip => {
      return `<p class="bold destination">destination: ${(destinationsData.find(destination => destination.id === trip.destinationID)).destination}</p>
      <p class="trip-info">departure: ${trip.date} | duration: ${trip.duration} days</p>
      <p class="trip-info">travelers: ${trip.travelers}</p>
      `
      })).join(" ")
    } else {
      travelerUpcomingTrips = `<p class="bold destination">You have no upcoming trips!</p>`
    }

    $('.user-dashboard').append(
      `<div class="traveler-trips">
        <h3>UPCOMING TRIPS:</h3>
        <p class="info">${travelerUpcomingTrips}</p>
      </div>`
    )
  },

  createPastTripsWidget(tripFinder, destinationsData) {
    let travelerPastTrips;

    if (tripFinder.pastTrips.length){
      travelerPastTrips = (tripFinder.pastTrips.map(trip => {
      return `<p class="bold destination">destination: ${(destinationsData.find(destination => destination.id === trip.destinationID)).destination}</p>
      <p class="trip-info">departure: ${trip.date} | duration: ${trip.duration} days</p>
      <p class="trip-info">travelers: ${trip.travelers}</p>
      `
      })).join(" ")
    } else {
      travelerPastTrips = `<p class="bold destination">You haven't taken any trips yet!</p>`
    }

    $('.user-dashboard').append(
      `<div class="traveler-trips">
        <h3>PAST TRIPS:</h3>
        <p class="info">${travelerPastTrips}</p>
      </div>`
    )
  },

  createCurrentTripWidget(tripFinder, destinationsData) {
    let travelerCurrentTrip;

    if (tripFinder.currentTrip){
      let trip = tripFinder.currentTrip;
      travelerCurrentTrip = `<p class="bold destination">destination: ${(destinationsData.find(destination => destination.id === trip.destinationID)).destination}</p>
      <p class="trip-info">departure: ${trip.date} | duration: ${trip.duration} days</p>
      <p class="trip-info">travelers: ${trip.travelers}</p>
      `
    } else {
      travelerCurrentTrip = `<p class="bold destination">Sadly, you are not currently on a trip.</p>`
    }

    $('.user-dashboard').append(
      `<div class="traveler-trips">
        <h3>CURRENT TRIP:</h3>
        <p class="info">${travelerCurrentTrip}</p>
      </div>`
    )
  },

  createCostOfTravelWidget(tripFinder) {
    if (tripFinder.annualCost === 0) {
      $('.user-dashboard').append(
        `<div class="cost-widget">
          <h3>TRAVEL EXPENSES THIS YEAR:</h3>
          <p class="info">no travel expenses (yet)!</p>
        </div>`
      )
    } else {
      $('.user-dashboard').append(
        `<div class="cost-widget">
          <h3>ANNUAL TRAVEL EXPENSES:</h3>
          <p class="info">$${tripFinder.annualCost}</p>
        </div>`
      )
    }
  },

  createBookTripWidget(destinationsData) {
    let today = moment().format("YYYY-MM-DD");
    $('.user-dashboard').append(
      `<div class="book-trip-widget">
        <h3>BOOK A TRIP:</h3>
        <form class="book-trip-form">
          <label class="book-label" for="start date">start date:</label>
          <input class="book-input" type="date" aria-label="select start date here" name="start" min="${today}">
          </input>
          <label class="book-label" for="end date">end date:</label>
          <input class="book-input" type="date" aria-label="select end date here" name="end" min="${today}">
          </input>
          <label class="book-label" for="location">location:</label>
          <input class="book-input" aria-label="type location here" list="locations-data" placeholder="Enter location..." name="location">
          <label class="book-label" for="travelers">travelers:</label>
          <input class="book-input" type="number" min="1" max="100" aria-label="type number of travelers here" placeholder="Number of travelers" name="travelers">
          <p class="book-label booking-cost">total cost: </p>
          <button class="book-trip-button" type="submit">submit</button>
        </form>
      </div>
      <datalist id="locations-data">
      </datalist>`
    )
    this.createDataList(destinationsData);
  },

  createDataList(destinationsData){
    let destinationsList = destinationsData.map(destination => {
      return `<option value="${destination.destination}">`
    })
    $('#locations-data').append(
      `${destinationsList.join("")}`
    )
  },

  showAgentDashboard(){
    $('header').append(`<h2 class="banner-welcome"> Welcome, Travel Agent! </h2>`);
    $('main').append(
      `<div class="user-dashboard">
      </div>`
    )
  },

  createAgencyIncomeWidget(agency) {
    if (agency.annualIncome === 0) {
      $('.user-dashboard').append(
        `<div class="cost-widget">
          <h3>ANNUAL COMMISSION:</h3>
          <p class="info">no commission (yet)!</p>
        </div>`
      )
    } else {
      $('.user-dashboard').append(
        `<div class="cost-widget">
          <h3>YOUR ANNUAL COMMISSION:</h3>
          <p class="info">$${agency.annualIncome}</p>
        </div>`
      )
    }
  },

  createTravelersTodayWidget(agency) {
    if (agency.travelersToday.length === 0) {
      $('.user-dashboard').append(
        `<div class="cost-widget">
          <h3>NUMBER OF TRAVELERS TODAY:</h3>
          <p class="info">no travelers today!</p>
        </div>`
      )
    } else {
      $('.user-dashboard').append(
        `<div class="cost-widget">
          <h3>NUMBER OF TRAVELERS TODAY:</h3>
          <p class="info">${agency.travelersToday}</p>
        </div>`
      )
    }
  },

  createPendingTripsAgencyWidget(agency, destinationsData, travelersData) {
    let agencyPendingTrips;
    if (agency.pendingTrips.length){
      agencyPendingTrips = (agency.pendingTrips.map(trip => {
      return `<p class="bold destination">traveler: ${(travelersData.find(traveler => traveler.id === trip.userID)).name}</p>
      <p class="trip-info destination">destination: ${(destinationsData.find(destination => destination.id === trip.destinationID)).destination}</p>
      <p class="trip-info">departure: ${trip.date} | duration: ${trip.duration} days</p>
      <p class="trip-info">travelers: ${trip.travelers}</p>
      `
      })).join(" ")
    } else {
      agencyPendingTrips = `<p class="bold destination">no pending trips!</p>`
    }

    $('.user-dashboard').append(
      `<div class="traveler-trips">
        <h3>PENDING TRIPS:</h3>
        <p class="info">${agencyPendingTrips}</p>
      </div>`
    )
  },

  displayError() {
      $('.error-message').removeClass('hidden');
  },

  clearMain() {
    $('.login-screen').addClass('hidden');
  },

}

export default domUpdates;
