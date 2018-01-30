'use strict';

const API = require('./API');

// API

class DeviceTypeAPI extends API {

    /**
     * DeviceTypeAPI
     */
    constructor(...args) {
        super(...args);
        this.type = API.DEVICETYPE_TYPE;
    }

    /**
     * Returns information about the current deviceType
     * @param {number} deviceTypeId
     * @returns {promise} selected deviceType
     */
    get(deviceTypeId) {
        return this.send({
            root: true,
            type: 'get',
            parameters: {
                deviceTypeId
            }
        });
    }

    /**
     * Return a list of deviceTypes
     * @param {object} query params
     * @returns {promise} list of deviceTypes
     */
    list(body) {
        return this.send({
            body,
            root: true,
            type: 'list'
        });
    }

    /**
     * Returns count of deviceTypes
     * @param {object} query params
     * @returns {promise} count of deviceTypes
     */
    count(query) {
        return this.send({
            type: 'count'
        });
    }

    /**
     * Registers a deviceType
     * @param {object} body deviceType data
     * @returns {promise} count of deviceTypes
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
     * Updates a deviceType
     * @param {number} deviceTypeId
     * @param {object} body deviceType data
     * @returns {promise} count of deviceTypes
     */
    update(deviceTypeId, body) {
        return this.send({
            body,
            root: true,
            type: 'update',
            method: 'PUT',
            parameters: {
                deviceTypeId
            }
        });
    }

    /**
     * Deletes an existing deviceType
     * @param {number} deviceTypeId
     * @returns {promise}
     */
    delete(deviceTypeId) {
        return this.send({
            root: true,
            type: 'delete',
            method: 'DELETE',
            parameters: {
                deviceTypeId
            }
        });
    }
}


// Exports

module.exports = DeviceTypeAPI;