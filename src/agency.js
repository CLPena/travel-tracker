import Finder from './Finder';
import moment from 'moment'

class Agency extends Finder{
  constructor(tripsData, destinationsData, travelersData) {
    super(tripsData, destinationsData, travelersData);
    this.allTrips = tripsData;
    this.travelersToday = this.findTravelersToday();
    // this.annualIncome = calculateAnnualIncome();
  }

  findTravelersToday() {
    let currentDate = moment().format("YYYY/MM/DD");
    let currentTrips = this.allTrips.filter(trip =>
      (moment(trip.date).isBefore(currentDate, "day") &&  moment(trip.date).add(trip.duration, "days").isAfter(currentDate)))
    return currentTrips.reduce((travelersToday, trip) => {
      travelersToday += trip.travelers;
      return travelersToday;
    }, 0)
  }
}

export default Agency;

// "travelers": 1,
// "date": "2019/09/16",
// 2.1 - Agent Dashboard
// - [ ] As a travel agent, upon logging in:
// - [x] I should see a dashboard page that shows me:
// - [ ] New trip requests
// - [ ] Total income generated this year (should be 10% of user trip cost)
// - [ ] Number of travelers on trips for today’s date
