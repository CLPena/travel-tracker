class Traveler {
  constructor(id, name, travelerType) {
    this.id = id;
    this.name = name;
    this.travelerType = travelerType;
    this.trips = [];
    this.approvedTrips = [];
    this.pendingTrips = [];
  }

  bookTrip(trip) {
    let tripObject = {
      id: trip.id,
      userID: trip.userID,
      destinationID: trip.destinationID,
      travelers: trip.travelers,
      date: trip.date,
      duration: trip.duration,
      status: trip.status,
      suggestedActivities: trip.suggestedActivities
    }
    return fetch("https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tripObject)
    })
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(error => console.log(error.message))
  }
}

export default Traveler;
