import {expect} from 'chai';

import Finder from '../src/finder';
import Traveler from '../src/traveler'

let finder, traveler, tripsData, destinationsData, travelersData;

describe('Traveler', function() {
  beforeEach(() => {
    tripsData = [{
      "id": 1,
      "userID": 1,
      "destinationID": 49,
      "travelers": 1,
      "date": "2019/09/16",
      "duration": 8,
      "status": "approved",
      "suggestedActivities": []
    },
    {
      "id": 2,
      "userID": 1,
      "destinationID": 25,
      "travelers": 5,
      "date": "2020/10/04",
      "duration": 18,
      "status": "pending",
      "suggestedActivities": []
    },
    {
      "id": 3,
      "userID": 2,
      "destinationID": 22,
      "travelers": 4,
      "date": "2020/05/22",
      "duration": 17,
      "status": "pending",
      "suggestedActivities": []
    }];
    destinationsData = [];
    travelersData = [];
    traveler = new Traveler(1, 'Biggie Smalls', 'thrill seeker');
    finder = new Finder(tripsData, destinationsData, travelersData)
  })

  it('should be a function', function() {
    expect(Finder).to.be.a('function');
  });

  it('should be an instantiation of the Finder class', function() {
    expect(finder).to.be.an.instanceof(Finder);
  });

  it('Should hold all tripsData', () => {
    expect(finder.tripsData).to.be.an('array');
    expect(finder.tripsData).to.equal(tripsData);
  });

  it('Should be able to find trips for a specific traveler', () => {
    expect(finder.findTripsForTraveler(traveler)).to.deep.equal([{
      "id": 1,
      "userID": 1,
      "destinationID": 49,
      "travelers": 1,
      "date": "2019/09/16",
      "duration": 8,
      "status": "approved",
      "suggestedActivities": []
    },
    {
      "id": 2,
      "userID": 1,
      "destinationID": 25,
      "travelers": 5,
      "date": "2020/10/04",
      "duration": 18,
      "status": "pending",
      "suggestedActivities": []
    }]);
  });

});
