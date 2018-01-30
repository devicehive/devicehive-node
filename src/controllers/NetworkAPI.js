'use strict';

const API = require('./API');

// API

class NetworkAPI extends API {

    /**
     * NetworkAPI
     */
    constructor(...args) {
        super(...args);
        this.type = API.NETWORK_TYPE;
    }

    /**
     * Returns information about the current network
     * @param {number} networkId
     * @returns {promise} selected network
     */
    get(networkId) {
        return this.send({
            root: true,
            type: 'get',
            parameters: {
                networkId
            }
        });
    }

    /**
     * Return a list of networks
     * @param {object} query params
     * @returns {promise} list of networks
     */
    list(body) {
        return this.send({
            body,
            root: true,
            type: 'list'
        });
    }

    /**
     * Returns count of networks
     * @param {object} query params
     * @returns {promise} count of networks
     */
    count(query) {
        return this.send({
            type: 'count'
        });
    }

    /**
     * Registers a network
     * @param {object} body network data
     * @returns {promise} count of networks
     */
    insert(body) {
        return this.send({
            body,
            root: true,
            type: 'insert',
            method: 'POST'
        });
    }

    /**
     * Updates a network
     * @param {number} networkId
     * @param {object} body network data
     * @returns {promise} count of networks
     */
    update(networkId, body) {
        return this.send({
            body,
            root: true,
            type: 'update',
            method: 'PUT',
            parameters: {
                networkId
            }
        });
    }

    /**
     * Deletes an existing network
     * @param {number} networkId
     * @returns {promise}
     */
    delete(networkId) {
        return this.send({
            root: true,
            type: 'delete',
            method: 'DELETE',
            parameters: {
                networkId
            }
        });
    }
}


// Exports

module.exports = NetworkAPI;