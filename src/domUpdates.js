import $ from 'jquery';

let domUpdates = {
  showTravelerDashboard(travelersData, tripsData, destinationsData){

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
