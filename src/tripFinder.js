import Finder from './Finder';

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

  findUpcomingTrips() {
    let currentDate = new Date();
    console.log(currentDate)
    return this.trips.sort((a, b) => b.date - a.date)

    //SORT this.trips chronologically
    //FILTER dates with value greater than currentDate
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
