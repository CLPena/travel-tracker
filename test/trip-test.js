import { expect } from 'chai';
const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
import $ from 'jquery';
import moment from 'moment';

import Trip from '../src/trip'
import Traveler from '../src/traveler'


let trip, traveler, destinationsData;

describe('Agency', function() {
  beforeEach(() => {
    global.window = {};
    chai.spy.on(window, 'jQuery', () => new Promise((resolve, reject) => {}));

    traveler = new Traveler(1, "Lizzo", "thrill-seeker");
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
    trip = new Trip(traveler, destinationsData)
  })

  it('should be a function', function() {
    expect(Trip).to.be.a('function');
  });

  it('should be an instantiation of the Trip class', function() {
    expect(trip).to.be.an.instanceof(Trip);
  });

  // it('Should hold all tripsData', () => {
  //   expect(trip.allTrips).to.be.an('array');
  //   expect(trip.allTrips).to.equal(tripsData);
  // });
});
