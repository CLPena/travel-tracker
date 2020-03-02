import $ from 'jquery';

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
    let foundDestination = destinationsData.find(destination => destination.destination === $('.location-input').val()
    );
    return foundDestination.id;
  }

  getTravelers() {
    return parseInt($('.travelers-number').val())
  }

  getDate() {
    return $('.departure-date').val()
  }

  calculateDuration() {
    let start = new Date($('.departure-date').val());
    let end = new Date($('.return-date').val());
    let diff = new Date(end - start);
    return diff/1000/60/60/24;
  }

}

export default Trip;
