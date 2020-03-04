import {expect} from 'chai';
import moment from 'moment';

import Agency from '../src/agency'

let agency, tripsData, destinationsData, travelersData;

describe('Agency', function() {
  beforeEach(() => {
    tripsData = [{
      "id": 1,
      "userID": 1,
      "destinationID": 1,
      "travelers": 1,
      "date": "2019/09/16",
      "duration": 8,
      "status": "approved",
      "suggestedActivities": []
    },
    {
      "id": 2,
      "userID": 1,
      "destinationID": 2,
      "travelers": 5,
      "date": "2020/10/04",
      "duration": 18,
      "status": "pending",
      "suggestedActivities": []
    },
    {
      "id": 3,
      "userID": 2,
      "destinationID": 3,
      "travelers": 4,
      "date": "2020/05/22",
      "duration": 17,
      "status": "pending",
      "suggestedActivities": []
    }];

    destinationsData = [{
      "id": 1,
      "destination": "Lima, Peru",
      "estimatedLodgingCostPerDay": 70,
      "estimatedFlightCostPerPerson": 400,
      "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
      "alt": "overview of city buildings with a clear sky"
    },
    {
      "id": 2,
      "destination": "Stockholm, Sweden",
      "estimatedLodgingCostPerDay": 100,
      "estimatedFlightCostPerPerson": 780,
      "image": "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      "alt": "city with boats on the water during the day time"
    },
    {
      "id": 3,
      "destination": "Sydney, Austrailia",
      "estimatedLodgingCostPerDay": 130,
      "estimatedFlightCostPerPerson": 950,
      "image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      "alt": "opera house and city buildings on the water with boats"
    }];

    travelersData = [{
      "id": 1,
      "name": "Ham Leadbeater",
      "travelerType": "relaxer"
    },
    {
      "id": 2,
      "name": "Rachael Vaughten",
      "travelerType": "thrill-seeker"
    },
    {
      "id": 3,
      "name": "Sibby Dawidowitsch",
      "travelerType": "shopper"
    }];

    agency = new Agency(tripsData, destinationsData, travelersData);
  })

  it('should be a function', function() {
    expect(Agency).to.be.a('function');
  });

  it('should be an instantiation of the Agency class', function() {
    expect(agency).to.be.an.instanceof(Agency);
  });

  it('Should hold all tripsData', () => {
    expect(agency.allTrips).to.be.an('array');
    expect(agency.allTrips).to.equal(tripsData);
  });

  it('Should be able to find current travelers', () => {
    let today = moment().format("YYYY/MM/DD");
    let tripToday = {
      "id": 4,
      "userID": 1,
      "destinationID": 3,
      "travelers": 4,
      "date": today,
      "duration": 17,
      "status": "approved",
      "suggestedActivities": []
    }
    agency.allTrips.push(tripToday);
    expect(agency.findTravelersToday()).to.deep.equal(4);
  });

  it('Should be able to find total annual trips', () => {
    expect(agency.findAnnualTrips()).to.deep.equal(
      [{
        "id": 2,
        "userID": 1,
        "destinationID": 2,
        "travelers": 5,
        "date": "2020/10/04",
        "duration": 18,
        "status": "pending",
        "suggestedActivities": []
      },
      {
        "id": 3,
        "userID": 2,
        "destinationID": 3,
        "travelers": 4,
        "date": "2020/05/22",
        "duration": 17,
        "status": "pending",
        "suggestedActivities": []
      }]);
  });

  it('Should be able to find pending trips', () => {
    expect(agency.findPendingTrips()).to.deep.equal(
      [{
        "id": 2,
        "userID": 1,
        "destinationID": 2,
        "travelers": 5,
        "date": "2020/10/04",
        "duration": 18,
        "status": "pending",
        "suggestedActivities": []
      },
      {
        "id": 3,
        "userID": 2,
        "destinationID": 3,
        "travelers": 4,
        "date": "2020/05/22",
        "duration": 17,
        "status": "pending",
        "suggestedActivities": []
      }]);
  });

  it('Should be able to calculate annual income', () => {
    expect(agency.calculateAnnualIncome()).to.deep.equal(1171);
  });

});
