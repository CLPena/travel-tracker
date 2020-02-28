import Finder from './Finder';

class TripFinder extends Finder {
  constructor(traveler, tripsData, destinationsData, travelersData) {
    super(tripsData, destinationsData, travelersData)
    this.traveler = traveler;
    this.trips = super.findTripsForTraveler(this.traveler);
    this.approvedTrips = this.findApprovedTrips();
    this.pendingTrips = this.findPendingTrips();
    this.annualTrips = this.findAnnualTrips();
    this.annualCost = this.findCostOfTravel();
  }

  findApprovedTrips() {
    return this.trips.filter(trip => trip.status === "approved");
  }

  findPendingTrips() {
    return this.trips.filter(trip => trip.status === "pending");
  }

  findAnnualTrips() {
    return this.trips.filter(trip => trip.date.includes('2020'));
  }

  findCostOfTravel() {
    return this.annualTrips.reduce((acc, trip) => {
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
