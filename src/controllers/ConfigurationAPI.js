'use strict';

const API = require('./API');

// API

class ConfigurationAPI extends API {

    /**
     * ConfigurationAPI
     */
    constructor(...args) {
        super(...args);
        this.type = API.CONFIGURATION_TYPE;
    }

    /**
     * Returns information about the current configeration
     * @param {number} name
     * @returns {promise} selected configeration
     */
    get(name) {
        return this.send({
            root: true,
            type: 'get',
            parameters: {
                name
            }
        });
    }

    /**
     * Updates a configeration
     * @param {number} name
     * @param {object} body configeration data
     * @returns {promise} count of configerations
     */
    put(name, body) {

        // Specific to this method
        if (body && typeof body.toObject === 'function') {
            body = body.toObject();
        }

        return this.send({
            body,
            root: true,
            type: 'put',
            method: 'PUT',
            parameters: {
                name
            }
        });
    }

    /**
     * Deletes an existing configeration
     * @param {number} name
     * @returns {promise}
     */
    delete(name) {
        return this.send({
            root: true,
            type: 'delete',
            method: 'DELETE',
            parameters: {
                name
            }
        });
    }
}


// Exports

module.exports = ConfigurationAPI;