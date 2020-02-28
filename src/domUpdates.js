import $ from 'jquery';

let domUpdates = {
  showTravelerDashboard(traveler){
    $('main').append(
      `<div class="user-dashboard">
        <h2> Welcome, ${traveler.name}! </h2>
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

  createPendingTripsWidget(traveler, destinationsData) {
    let travelerPendingTrips;

    if (traveler.pendingTrips.length){
      travelerPendingTrips = (traveler.pendingTrips.map(trip => {
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
