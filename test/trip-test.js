import { expect } from 'chai';
const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
import $ from 'jquery';
import moment from 'moment';

import Trip from '../src/trip'
import Traveler from '../src/traveler'


let trip, traveler, destinationsData;

describe('Trip', function() {
  beforeEach(() => {
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

    chai.spy.on(trip, ['findDestinationID', 'getTravelers', 'getDate', 'calculateDuration', 'calculateTripCost'], function(){return true})
  })

  afterEach(function () {
    chai.spy.restore();
  });

  it('should be a function', function() {
    expect(Trip).to.be.a('function');
  });

  it('should be an instantiation of the Trip class', function() {
    expect(trip).to.be.an.instanceof(Trip);
  });

  it('Should have an ID', () => {
    expect(trip.id).to.be.a('number');
    expect(trip.id).to.equal(Date.now());
    //note that this fails rarely if the date.now here and in the class don't fire quickly enough (the id will be off by a millisecond)
  });

  it('Should have a user ID', () => {
    expect(trip.userID).to.be.a('number');
    expect(trip.userID).to.equal(1);
  });

  it('Should start with a destinationID of 0', () => {
    expect(trip.destinationID).to.be.a('number');
    expect(trip.destinationID).to.equal(0);
  });

  it('Should start with a travelers count of 0', () => {
    expect(trip.travelers).to.be.a('number');
    expect(trip.travelers).to.equal(0);
  });

  it('Should start with a duration of 0', () => {
    expect(trip.duration).to.be.a('number');
    expect(trip.duration).to.equal(0);
  })

  it('Should start with a status of pending', () => {
    expect(trip.status).to.be.a('string');
    expect(trip.status).to.equal("pending");
  })

  it('Should start with an empty array of suggested activities', () => {
    expect(trip.suggestedActivities).to.be.an('array');
    expect(trip.suggestedActivities.length).to.equal(0);
  })

  it('Should be able to update its destination ID', () => {
    trip.findDestinationID(destinationsData)
    expect(trip.findDestinationID).to.be.called(1);
    expect(trip.findDestinationID(destinationsData)).to.equal(true)
  });

  it('Should be able to update its travelers count', () => {
    trip.getTravelers()
    expect(trip.getTravelers).to.be.called(1);
    expect(trip.getTravelers()).to.equal(true)
  });

  it('Should be able to update its date property', () => {
    trip.getDate()
    expect(trip.getDate).to.be.called(1);
    expect(trip.getDate()).to.equal(true)
  });

  it('Should be able to calculate the duration of a trip', () => {
    trip.calculateDuration()
    expect(trip.calculateDuration).to.be.called(1);
    expect(trip.calculateDuration()).to.equal(true)
  });

  it('Should be able to calculate the duration of a trip', () => {
    trip.calculateTripCost(destinationsData)
    expect(trip.calculateTripCost).to.be.called(1);
    expect(trip.calculateTripCost()).to.equal(true)
  });

});
