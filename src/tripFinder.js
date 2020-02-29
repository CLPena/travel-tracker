import Finder from './Finder';
import moment from 'moment'

class TripFinder extends Finder {
  constructor(traveler, tripsData, destinationsData, travelersData) {
    super(tripsData, destinationsData, travelersData)
    this.traveler = traveler;
    this.trips = super.findTripsForTraveler(this.traveler);
    this.approvedTrips = this.findApprovedTrips();
    this.pendingTrips = this.findPendingTrips();
    this.annualTrips = this.findAnnualTrips();
    this.annualCost = this.findCostOfTravel().toFixed(2);
    this.upcomingTrips = this.findUpcomingTrips();
    this.pastTrips = this.findPastTrips();
    this.currentTrip = this.findCurrentTrip();
  }

  findApprovedTrips() {
    return this.trips.filter(trip => trip.status === "approved");
  }

  findPendingTrips() {
    return this.trips.filter(trip => trip.status === "pending");
  }

  findAnnualTrips() {
    let year = new Date().getUTCFullYear();
    return this.trips.filter(trip => trip.date.includes(year));
  }

  findUpcomingTrips() {
    let currentDate = moment().format("YYYY/MM/DD");
    return this.trips.reduce((upcoming, trip) => {
      if(moment(trip.date).isAfter(currentDate, "day")){
        upcoming.push(trip);
      }
      return upcoming;
    }, [])
  }

  findPastTrips() {
    let currentDate = moment().format("YYYY/MM/DD");
    return this.trips.reduce((past, trip) => {
      if(moment(trip.date).add(trip.duration, "days").isBefore(currentDate, "day")){
        past.push(trip);
      }
      return past;
    }, [])
  }

  findCurrentTrip() {
    let currentDate = moment().format("YYYY/MM/DD");
    let currentTrip = this.trips.find(trip =>
      (moment(trip.date).isBefore(currentDate, "day") &&  moment(trip.date).add(trip.duration, "days").isAfter(currentDate))
    )
    return currentTrip
  }

  findCostOfTravel() {
    return this.annualTrips.reduce((acc, trip) => {
      let duration = trip.duration;
      let destination = this.destinationsData.find(destination => destination.id === trip.destinationID);
      let flightsCost = destination.estimatedFlightCostPerPerson * trip.travelers;
      let lodgingCost = destination.estimatedLodgingCostPerDay * trip.duration;
      let total = (flightsCost + lodgingCost) * 1.10;
      return acc += total;
    }, 0)
  }
}

export default TripFinder;
