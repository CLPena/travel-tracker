import { expect } from 'chai';
const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
import moment from 'moment';

import Trip from '../src/trip'

describe('See if the tests are running', function() {
  it('should return true', function() {
    expect(true).to.equal(true);
  });
});
