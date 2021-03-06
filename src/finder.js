class Finder {
  constructor(tripsData, destinationsData, travelersData) {
    this.tripsData = tripsData;
    this.destinationsData = destinationsData;
    this.travelersData = travelersData;
  }

  findTripsForTraveler(traveler) {
    return this.tripsData.filter(trip => trip.userID === traveler.id);
  }

}

export default Finder;
