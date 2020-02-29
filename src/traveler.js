class Traveler {
  constructor(id, name, travelerType) {
    this.id = id;
    this.name = name;
    this.travelerType = travelerType;
    this.trips = [];
    this.approvedTrips = [];
    this.pendingTrips = [];
  }

}

export default Traveler;
