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
    return this.trips.reduce((acc, trip) => {
      let duration = trip.duration;
      let destination = this.destinationsData.find(destination => destination.id === trip.destinationID);
      let flightsCost = destination.estimatedFlightCostPerPerson * trip.travelers;
      let lodgingCost = destination.estimatedLodgingCostPerDay * trip.duration;
      let total = flightsCost + lodgingCost;
      return acc += total;
    }, 0)
  }
}

export default TripFinder;
