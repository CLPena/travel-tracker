import Finder from './Finder';

class TripFinder extends Finder {
  constructor(traveler, tripsData, destinationsData, travelersData) {
    super(tripsData, destinationsData, travelersData)
    this.traveler = traveler;
    this.trips = super.findTripsForTraveler(this.traveler);
    this.approvedTrips = [];
    this.pendingTrips = [];
  }

  findApprovedTrips() {
    this.approvedTrips = this.trips.filter(trip => trip.status === "approved");
  }

  findPendingTrips() {
    this.pendingTrips = this.trips.filter(trip => trip.status === "pending");
  }

  findCostOfTravel() {
    //REDUCE:
    //go through trips array for dates this year and find duration of each trip
    //     FIND then find the matching destination from the destinationsData array and return the average cost per night
    // multiply the cost per night by the duration and add to ACC
    //return ACC
  }
}

export default TripFinder;
