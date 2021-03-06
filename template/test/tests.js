(() => {
  'use strict';

  // Unittest libraries
  const chai = require('chai');
  const expect = chai.expect;

  // BITS Test Stubs
  global.helper = {};

  class LoggerFactoryStub {
    static getLogger() {
    }
  }
  global.helper.LoggerFactory = LoggerFactoryStub;

  <% if (generateMessageCenter) { %>
  class MessengerStub {
    constructor() {
    }
  }
  global.helper.Messenger = MessengerStub;
  <% } %>

  // The module under test
  const Module = require('./../index');

  describe('<%= this.upCase(name) %>', () => {
    it('should export load/unload methods', () => {
      return expect(Module).to.have.property('load') && expect(Module).to.have.property('unload'); 
    });
  });

})();
