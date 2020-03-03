import Finder from './Finder';
import moment from 'moment'

class Agency extends Finder {
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
      (moment(trip.date).isSameOrBefore(currentDate, "day") && moment(trip.date).add(trip.duration, "days").isSameOrAfter(currentDate)))
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

  approveTrip(tripID) {
    let tripObject = {
      id: tripID,
      status: "approved",
    }
    return fetch("https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/updateTrip", {
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

  denyTrip(tripID) {
    let tripObject = {
      id: tripID,
    }
    return fetch("https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips", {
        method: 'DELETE',
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


export default Agency;
