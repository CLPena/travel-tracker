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

  showAgentDashboard(travelersData, tripsData, destinationsData){

  },

  displayError() {
      $('.error-message').removeClass('hidden');
  },

  clearMain() {
    $('.login-screen').addClass('hidden');
  },

}

export default domUpdates;
