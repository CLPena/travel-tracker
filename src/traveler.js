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


// - [ ] All of my trips (past, present, upcoming)
// - [ ] Total amount I have spent on trips this year (including travel agent’s 10% fee)
