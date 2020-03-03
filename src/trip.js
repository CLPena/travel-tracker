import $ from 'jquery';
import moment from 'moment';

class Trip {
  constructor(traveler, destinationsData) {
    this.id = Date.now();
    this.userID = traveler.id;
    this.destinationID = this.findDestinationID(destinationsData);
    this.travelers = this.getTravelers();
    this.date = this.getDate();
    this.duration = this.calculateDuration();
    this.status = "pending";
    this.suggestedActivities = [];
  }

  findDestinationID(destinationsData) {
    let foundDestination = destinationsData.find(destination => destination.destination === $('.location-input').val());
    return foundDestination.id;
  }

  getTravelers() {
    return parseInt($('.travelers-number').val())
  }

  getDate() {
    let date = $('.departure-date').val()
    return moment(date).format('YYYY/MM/DD');
  }

  calculateDuration() {
    let start = new Date($('.departure-date').val());
    let end = new Date($('.return-date').val());
    let diff = new Date(end - start);
    return diff / 1000 / 60 / 60 / 24;
  }

  calculateTripCost(destinationsData) {
    let foundDestination = destinationsData.find(destination => destination.id === this.destinationID);
    let lodgingCost = foundDestination.estimatedLodgingCostPerDay * this.duration;
    let flightsCost = foundDestination.estimatedFlightCostPerPerson * this.travelers;
    return ((lodgingCost + flightsCost) * 1.10).toFixed(2);
  }
}

export default Trip;
