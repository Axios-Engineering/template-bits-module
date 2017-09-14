
(() => {
  'use strict';

  const logger = global.helper.LoggerFactory.getLogger();

  <% if (generateMessageCenter) { %>
  const Messenger = global.helper.Messenger;
  <% } %>
  

  class <%= this.upCase(name) %>App {
    /**
     * Called when the module is constructed.
     */
    constructor() {
      <% if (generateMessageCenter) { %>
      this._counter = 0;
      this._messenger = new Messenger();
      <% } %>
    }

    /**
     * Called by BITS when the module is loaded.
     *
     * @param {object} messageCenter - the BITS message center object
     */
    load(messageCenter) {
      logger.info('Loading <%= this.startCase(name) %>!');

      <% if (generateMessageCenter) { %>
      // Add a request listener to handle the reset request
      this._messenger.addRequestListener('<%= this.kebabCase(name) %>#reset', { scopes: [ "public" ] }, (metadata, value) => {
        logger.info(`resetting counter to ${value}`);
        const origValue = this._counter;
        if (value) {
          this._counter = value;
        } else {
          this._counter = 0;
        }
        return origValue;
      });

      // Add an event listener that responds to the counter event and resets
      // it to 0 whenever it reaches >= 100 using a request
      this._messenger.addEventListener('<%= this.kebabCase(name) %>#counter', { scopes: [ "public" ] }, (value) => {
        if (value >= 100) {
          messageCenter.sendRequest('<%= this.kebabCase(name) %>#reset', { scope: "public" }, 0).then(() => {
            logger.info('reset counter');
          }).catch((err) => {
            logger.error('failed to reset counter')
          });
        }
      });
    
      // Load all the listeners registered to the messenger
      // with the message center, then start the counter event
      this._messenger.load(messageCenter)
        .then(() => this.startCounter(messageCenter))
      <% } %>
    }

    /**
     * Called by BITS when the module is unloaded.
     *
     * @return {any} - the return value is ununsed
     */
    unload() {
      logger.info('Unloading Duckshot Ui Module!');
     
      // Unload all listeners and clear the timer interval
      <% if (generateMessageCenter) { %>
      return Promise.resolve()
        .then(() => this._messenger.unload())
        .then(() => clearInterval(this._counterIntervalId));
      <% } else { %>
      return Promise.resolve();
      <% } %>
    }

    <% if (generateMessageCenter) { %>
    /**
     * Start's an interval timer to send the counter event
     *
     * @param {object} messageCenter - the BITS message center object
     */
    startCounter(messageCenter) {
      this._counterIntervalId = setInterval(() => {
        messageCenter.sendEvent('<%= this.kebabCase(name) %>#counter', {scopes: [ "public" ] }, this._counter)
        this._counter++;
      }, 1000);
    }
    <% } %>
  }

  module.exports = new <%= this.upCase(name) %>App();

})();
