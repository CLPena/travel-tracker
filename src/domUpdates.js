import $ from 'jquery';
import moment from 'moment';
import TripFinder from './tripFinder';


let domUpdates = {
  showTravelerDashboard(traveler) {
    $('header').append(`<h2 class="banner-welcome"> Welcome, ${traveler.name}!</h2>`)
    $('main').append(
      `<div class="user-dashboard">
        <div class="widget">
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

    if (tripFinder.pendingTrips.length) {
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
      `<div class="widget">
        <h3>PENDING TRIPS:</h3>
        <p class="info">${travelerPendingTrips}</p>
      </div>`
    )
  },

  createUpcomingTripsWidget(tripFinder, destinationsData) {
    let travelerUpcomingTrips;

    if (tripFinder.upcomingTrips.length) {
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
      `<div class="widget">
        <h3>UPCOMING TRIPS:</h3>
        <p class="info">${travelerUpcomingTrips}</p>
      </div>`
    )
  },

  createPastTripsWidget(tripFinder, destinationsData) {
    let travelerPastTrips;

    if (tripFinder.pastTrips.length) {
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
      `<div class="widget">
        <h3>PAST TRIPS:</h3>
        <p class="info">${travelerPastTrips}</p>
      </div>`
    )
  },

  createCurrentTripWidget(tripFinder, destinationsData) {
    let travelerCurrentTrip;

    if (tripFinder.currentTrip) {
      let trip = tripFinder.currentTrip;
      travelerCurrentTrip = `<p class="bold destination">destination: ${(destinationsData.find(destination => destination.id === trip.destinationID)).destination}</p>
      <p class="trip-info">departure: ${trip.date} | duration: ${trip.duration} days</p>
      <p class="trip-info">travelers: ${trip.travelers}</p>
      `
    } else {
      travelerCurrentTrip = `<p class="bold destination">Sadly, you are not currently on a trip.</p>`
    }

    $('.user-dashboard').append(
      `<div class="widget">
        <h3>CURRENT TRIP:</h3>
        <p class="info">${travelerCurrentTrip}</p>
      </div>`
    )
  },

  createCostOfTravelWidget(tripFinder) {
    if (tripFinder.annualCost === 0) {
      $('.user-dashboard').append(
        `<div class="widget">
          <h3>TRAVEL EXPENSES THIS YEAR:</h3>
          <p class="info">no travel expenses (yet)!</p>
        </div>`
      )
    } else {
      $('.user-dashboard').append(
        `<div class="widget">
          <h3>ANNUAL TRAVEL EXPENSES:</h3>
          <p class="info">$${tripFinder.annualCost}</p>
        </div>`
      )
    }
  },

  createBookTripWidget(destinationsData) {
    let today = moment().format("YYYY-MM-DD");
    $('.user-dashboard').append(
      `<div class="widget">
        <h3>BOOK A TRIP:</h3>
        <form class="book-trip-form">
          <label class="book-label" for="start date">start date:</label>
          <input class="book-input departure-date" type="date" aria-label="select start date here" name="start" min="${today}" required>
          </input>
          <label class="book-label" for="end date">end date:</label>
          <input class="book-input return-date" type="date" aria-label="select end date here" name="end" min="${today}" required>
          </input>
          <label class="book-label" for="location">location:</label>
          <input class="book-input location-input" aria-label="type location here" list="locations-data" placeholder="Enter location..." name="location" required>
          <label class="book-label" for="travelers">travelers:</label>
          <input class="book-input travelers-number" type="number" step="1" min="1" max="100" aria-label="type number of travelers here" placeholder="Number of travelers" name="travelers" required>
          <p class="book-label booking-cost">total cost: </p>
          <button class="book-trip-button" type="submit">submit</button>
        </form>
      </div>
      <datalist id="locations-data">
      </datalist>`
    )
    this.createDataList(destinationsData);
  },

  createDataList(destinationsData) {
    let destinationsList = destinationsData.map(destination => {
      return `<option value="${destination.destination}">`
    })
    $('#locations-data').append(
      `${destinationsList.join("")}`
    )
  },

  showCost(destinationsData, trip) {
    let totalCost = trip.calculateTripCost(destinationsData);
    $('.booking-cost').append(
      `$${totalCost}`
    )
  },

  showAgentDashboard() {
    $('header').append(`<h2 class="banner-welcome"> Welcome, Travel Agent! </h2>`);
    $('main').append(
      `<div class="user-dashboard">
      </div>`
    )
  },

  createAgencyIncomeWidget(agency) {
    if (agency.annualIncome === 0) {
      $('.user-dashboard').append(
        `<div class="widget">
          <h3>ANNUAL COMMISSION:</h3>
          <p class="info">no commission (yet)!</p>
        </div>`
      )
    } else {
      $('.user-dashboard').append(
        `<div class="widget">
          <h3>YOUR ANNUAL COMMISSION:</h3>
          <p class="info">$${agency.annualIncome}</p>
        </div>`
      )
    }
  },

  createTravelersTodayWidget(agency) {
    if (agency.travelersToday.length === 0) {
      $('.user-dashboard').append(
        `<div class="widget">
          <h3>NUMBER OF TRAVELERS TODAY:</h3>
          <p class="info">no travelers today!</p>
        </div>`
      )
    } else {
      $('.user-dashboard').append(
        `<div class="widget">
          <h3>NUMBER OF TRAVELERS TODAY:</h3>
          <p class="info">${agency.travelersToday}</p>
        </div>`
      )
    }
  },

  createPendingTripsAgencyWidget(agency, destinationsData, travelersData) {
    let agencyPendingTrips;
    if (agency.pendingTrips.length) {
      agencyPendingTrips = (agency.pendingTrips.map(trip => {
        return `
      <div class="pending-trips" id="${trip.id}">
        <p class="bold destination">traveler: ${(travelersData.find(traveler => traveler.id === trip.userID)).name}</p>
        <p class="trip-info destination">destination: ${(destinationsData.find(destination => destination.id === trip.destinationID)).destination}</p>
        <p class="trip-info">departure: ${trip.date} | duration: ${trip.duration} days</p>
        <p class="trip-info">travelers: ${trip.travelers}</p>
          <button type="button" class="approve"></button>
          <button type="button" class="deny"></button>
      </div>
      `
      })).join(" ")
    } else {
      agencyPendingTrips = `<p class="bold destination">no pending trips!</p>`
    }
    $('.user-dashboard').append(
      `<div class="widget">
        <h3>PENDING TRIPS:</h3>
        <p class="info">${agencyPendingTrips}</p>
      </div>`
    )
  },

  createViewTravelerInfoWidget(travelersData) {
    $('.user-dashboard').append(
      `<div class="widget">
        <h3>VIEW TRAVELER INFORMATION:</h3>
        <form class="find-traveler-form">
          <label class="traveler-label" for="traveler">traveler name:</label>
          <input class="book-input traveler-input" aria-label="type traveler here" list="travelers-data" placeholder="Enter traveler name..." name="traveler" required>
          <button class="find-traveler-button" type="submit">submit</button>
        </form>
        <div class="trips-list"></div>
      </div>
      <datalist id="travelers-data">
      </datalist>`
    )
    this.createTravelerData(travelersData);
  },

  createTravelerData(travelersData) {
    let travelersList = travelersData.map(traveler => {
      return `<option value="${traveler.name}">`
    })
    $('#travelers-data').append(
      `${travelersList.join("")}`
    )
  },

  displayError() {
    $('.error-message').removeClass('hidden');
  },

  clearMain() {
    if ($('.user-dashboard')) {
      $('.user-dashboard').remove();
      $('.banner-welcome').remove();
    }
    $('.login-screen').addClass('hidden');
  },

  displayTraveler(event, tripsData, destinationsData, travelersData) {
    let foundTraveler = travelersData.find(traveler => traveler.name === $('.traveler-input').val());
    let tripFinder = new TripFinder(foundTraveler, tripsData, destinationsData, travelersData);

    $('.trips-list').empty()
    $('.trips-list').append(
      `<div class="traveler-snapshot">
        <p class="bold">id: ${foundTraveler.id}</p>
        <p class="bold">traveler type: ${foundTraveler.travelerType}</p>
        <p class="bold">yearly travel spending: $${tripFinder.annualCost}</p>
        <p class="bold">all trips: ${this.displayAllTrips(foundTraveler, destinationsData, tripFinder)}</p>
      </div>
      `)
  },

  displayAllTrips(foundTraveler, destinationsData, tripFinder) {
    let tripsList = tripFinder.findTripsForTraveler(foundTraveler);
    return (tripsList.map(trip => {
      if (trip.status === "approved") {
        return `<div class="pending-trips" id="${trip.id}">
          <p class="bold">destination: ${(destinationsData.find(destination => destination.id === trip.destinationID)).destination}</p>
          <p class="trip-info">departure: ${trip.date} | duration: ${trip.duration} days</p>
          <p class="trip-info">travelers: ${trip.travelers}</p>
          <p class="trip-info">status: ${trip.status}</p>
        </div>
          `
      } else {
        return `<div class="pending-trips" id="${trip.id}">
        <p class="bold">destination: ${(destinationsData.find(destination => destination.id === trip.destinationID)).destination}</p>
        <p class="trip-info">departure: ${trip.date} | duration: ${trip.duration} days</p>
        <p class="trip-info">travelers: ${trip.travelers}</p>
        <p class="trip-info">status: ${trip.status}</p>
        <button type="button" class="approve"></button>
        <button type="button" class="deny"></button>
        </div>
        `
      }
    })).join("")
  }
}

export default domUpdates;
