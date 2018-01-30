'use strict';

const API = require('./API');

// API

class DeviceAPI extends API {

    /**
     * DeviceAPI
     */
    constructor(...args) {
        super(...args);
        this.type = API.DEVICE_TYPE;
    }

    /**
     * Returns information about the current device
     * @param {string} deviceId
     * @returns {promise} selected device
     */
    get(deviceId) {
        return this.send({
            root: true,
            type: 'get',
            parameters: {
                deviceId
            }
        });
    }

    /**
     * Return a list of devices
     * @param {object} query params
     * @returns {promise} list of devices
     */
    list(body) {
        return this.send({
            body,
            root: true,
            type: 'list'
        });
    }

    /**
     * Returns count of devices
     * @param {object} query params
     * @returns {promise} count of devices
     */
    count(query) {
        return this.send({
            type: 'count'
        });
    }

    /**
     * Registers or updates a device
     * @param {string} deviceId
     * @param {object} body device data
     * @returns {promise} count of devices
     */
    save(deviceId, body) {
        return this.send({
            body,
            root: true,
            type: 'save',
            method: 'PUT',
            parameters: {
                deviceId
            }
        });
    }

    /**
     * Deletes an existing device
     * @param {string} deviceId
     * @returns {promise}
     */
    delete(deviceId) {
        return this.send({
            root: true,
            type: 'delete',
            method: 'DELETE',
            parameters: {
                deviceId
            }
        });
    }
}


// Exports

module.exports = DeviceAPI;