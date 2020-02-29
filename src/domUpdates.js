import $ from 'jquery';

let domUpdates = {
  showTravelerDashboard(traveler){
    $('header').append(`<h2 class="banner-welcome"> Welcome, ${traveler.name}! </h2>`)
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

  showAgentDashboard(travelersData, tripsData, destinationsData){
    $('main').append(
      `<div class="user-dashboard">
        <h2> Welcome! </h2>
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
