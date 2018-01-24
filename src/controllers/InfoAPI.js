'use strict';

const API = require('./API');

// API

class InfoAPI extends API {

    /**
     * TokenAPI
     */
    constructor(...args) {
        super(...args);
        this.startEndpoint = 'info';
    }

    /**
     * Get info
     */
    get() {
        return this.strategy.send({
            endpoint: `/${this.startEndpoint}`,
            action: `server/${this.startEndpoint}`
        });
    }
}


// Exports

module.exports = InfoAPI;