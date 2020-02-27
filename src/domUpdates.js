import $ from 'jquery';

let domUpdates = {
  // showTravelerDashboard(){
  //
  // },
  //
  // showAgentDashboard(){
  //
  // },

  displayError() {
      $('.error-message').removeClass('hidden');
  },

  clearMain() {
    $('.login-screen').addClass('hidden');
  },

}

export default domUpdates;
