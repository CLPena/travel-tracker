import $ from 'jquery';

let domUpdates = {
  showTravelerDashboard(traveler){
    console.log(traveler.id, traveler.name, traveler.travelerType)
    $('main').append(
      `<div class="user-dashboard">
        <h2> adfasads </h2>
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
