'use strict';

const API = require('./API');

// API

class DeviceAPI extends API {

    /**
     * DeviceAPI
     */
    constructor(...args) {
        super(...args);
        this.startEndpoint = 'device'
    }

    /**
     * Returns information about the current device
     * @param {string} deviceId
     * @returns {promise} selected device
     */
    get(deviceId) {
        return this.strategy.send({
            endpoint: `/${this.startEndpoint}/${deviceId}`,
            action: `${this.startEndpoint}/get`,
            body: {
                deviceId
            }
        });
    }

    /**
     * Return a list of devices
     * @param {object} query params
     * @returns {promise} list of devices
     */
    list(query) {
        return this.strategy.send({
            endpoint: `/${this.startEndpoint}`,
            action: `${this.startEndpoint}/list`,
            body: query,
            query
        });
    }

    /**
     * Returns count of devices
     * @param {object} query params
     * @returns {promise} count of devices
     */
    count(query) {
        return this.strategy.send({
            endpoint: `/${this.startEndpoint}/count`,
            action: `${this.startEndpoint}/count`,
            body: query,
            query
        });
    }

    /**
     * Registers or updates a device
     * @param {string} deviceId
     * @param {object} body device data
     * @returns {promise} count of devices
     */
    save(deviceId, body) {
        return this.strategy.send({
            endpoint: `/${this.startEndpoint}/${deviceId}`,
            action: `${this.startEndpoint}/save`,
            method: 'PUT',
            bodyWS: {
                deviceId,
                device: body
            },
            body
        });
    }

    /**
     * Deletes an existing device
     * @param {string} deviceId
     * @returns {promise}
     */
    delete(deviceId) {
        return this.strategy.send({
            endpoint: `/${this.startEndpoint}/${deviceId}`,
            action: `${this.startEndpoint}/delete`,
            method: 'DELETE',
            body: {
                deviceId
            }
        });
    }
}


// Exports

module.exports = DeviceAPI;