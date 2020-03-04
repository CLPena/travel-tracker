import { expect } from 'chai';
const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
import moment from 'moment';

import Traveler from '../src/traveler'

let trip, traveler;

describe('See if the tests are running', function() {
  beforeEach(() => {
    trip = {
      "id": 1,
      "userID": 44,
      "destinationID": 49,
      "travelers": 1,
      "date": "2019/09/16",
      "duration": 8,
      "status": "approved",
      "suggestedActivities": []
    };

    traveler = new Traveler(1, "Beyonce Knowles", "foodie")
  })

  it('should be a function', function() {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instantiation of the Traveler class', function() {
    expect(traveler).to.be.an.instanceof(Traveler);
  });

  it('Should have an ID number', () => {
    expect(traveler.id).to.be.a('number');
    expect(traveler.id).to.equal(1);
  });

  it('Should hold a users name', () => {
    expect(traveler.name).to.be.a('string');
    expect(traveler.name).to.equal("Beyonce Knowles");
  });

  it('Should hold a traveler type', () => {
    expect(traveler.travelerType).to.be.a('string');
    expect(traveler.travelerType).to.equal("foodie");
  });

  it('Should be able to book a trip', () => {
    global.window = {};
    chai.spy.on(window, 'fetch', () => new Promise((resolve, reject) => {}));
    traveler.bookTrip(trip)
    expect(window.fetch).to.be.called(1);
  });
});
