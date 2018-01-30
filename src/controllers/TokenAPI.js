'use strict';

const API = require('./API');

// API

class TokenAPI extends API {

    /**
     * TokenAPI
     */
    constructor(...args) {
        super(...args);
        this.type = API.TOKEN_TYPE;
    }

    /**
     * Authentificate using login and password
     * @param {object} credentials { login, password }
     */
    auth({ login, password }) {
        return this.send({
            auth: false,
            service: 'authServiceURL',
            method: 'POST',
            body: {
                login,
                password
            }
        });
    }

    /**
     * Refresg token
     * @param {object} credentials { refreshToken }
     */
    refresh({ refreshToken }) {
        return this.send({
            auth: false,
            service: 'authServiceURL',
            method: 'POST',
            type: 'refresh',
            body: {
                refreshToken
            }
        });
    }

    /**
     * Create token
     * @param {object} credentials
     */
    create(body) {
        return this.send({
            auth: false,
            service: 'authServiceURL',
            method: 'POST',
            type: 'create',
            body
        });
    }
}


// Exports

module.exports = TokenAPI;