'use strict';

const API = require('./API');

// API

class TokenAPI extends API {

    /**
     * TokenAPI
     */
    constructor(...args) {
        super(...args);
        this.startEndpoint = 'token';
    }

    /**
     * Authentificate using login and password
     * @param {object} credentials { login, password }
     */
    auth({ login, password }) {
        return this.strategy.send({
            auth: false,
            url: 'authServiceURL',
            endpoint: `/${this.startEndpoint}`,
            action: this.startEndpoint,
            method: 'POST',
            body: {
                login,
                password
            }
        });
    }

    /**
     * Refresg token
     * @param {object} { refreshToken }
     */
    refresh({ refreshToken }) {
        return this.strategy.send({
            auth: false,
            url: 'authServiceURL',
            endpoint: `/${this.startEndpoint}/refresh`,
            action: `${this.startEndpoint}/refresh`,
            method: 'POST',
            body: {
                a, e, t, tpc
            }
        });
    }

    /**
     * Create token
     * @param {object} { a, e, t, tpc }
     */
    create({ a, e, t, tpc }) {
        return this.strategy.send({
            auth: true,
            url: 'authServiceURL',
            endpoint: `/${this.startEndpoint}/create`,
            action: `${this.startEndpoint}/create`,
            method: 'POST',
            body: {
                a, e, t, tpc
            }
        });
    }
}


// Exports

module.exports = TokenAPI;