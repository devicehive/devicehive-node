'use strict';

const API = require('./API');

// API

class InfoAPI extends API {

    /**
     * TokenAPI
     */
    constructor(...args) {
        super(...args);
        this.type = API.INFO_TYPE;
    }

    /**
     * Get info
     */
    get() {
        return this.strategy.send();
    }
}


// Exports

module.exports = InfoAPI;