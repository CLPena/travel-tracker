import Finder from './Finder';
import moment from 'moment'

class Agency extends Finder{
  constructor(tripsData, destinationsData, travelersData) {
    super(tripsData, destinationsData, travelersData);
    this.allTrips = tripsData;
    this.destinationsData = destinationsData;
    this.travelersToday = this.findTravelersToday();
    this.annualTrips = this.findAnnualTrips();
    this.annualIncome = this.calculateAnnualIncome().toFixed(2);
    this.pendingTrips = this.findPendingTrips();
  }

  findTravelersToday() {
    let currentDate = moment().format("YYYY/MM/DD");
    let currentTrips = this.allTrips.filter(trip =>
      (moment(trip.date).isBefore(currentDate, "day") &&  moment(trip.date).add(trip.duration, "days").isAfter(currentDate)))
    return currentTrips.reduce((travelers, trip) => {
      travelers += trip.travelers;
      return travelers;
    }, 0)
  }

  findAnnualTrips() {
    let year = new Date().getUTCFullYear();
    return this.allTrips.filter(trip => trip.date.includes(year));
  }

  calculateAnnualIncome() {
    return this.annualTrips.reduce((totalIncome, trip) => {
      let duration = trip.duration;
      let destination = this.destinationsData.find(destination => destination.id === trip.destinationID);
      let flightsCost = destination.estimatedFlightCostPerPerson * trip.travelers;
      let lodgingCost = destination.estimatedLodgingCostPerDay * trip.duration;
      let total = (flightsCost + lodgingCost);
      let commission = total * .1;
      totalIncome += commission;
      return totalIncome;
    }, 0)
  }

  findPendingTrips() {
    return this.allTrips.filter(trip => trip.status === "pending");
  }

}


export default Agency;
