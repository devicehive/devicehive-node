'use strict';

const API = require('./API');

// API

class DeviceCommandAPI extends API {

    /**
     * DeviceCommandAPI
     */
    constructor(...args) {
        super(...args);
        this.type = API.DEVICE_TYPE;
        this.nestedType = API.DEVICECOMMAND_TYPE;
    }

    /**
     * Returns information about the current command
     * @param {number} deviceId - Device ID
     * @param {number} [commandId] - Command ID
     * @returns {promise} selected command
     */
    get(deviceId, commandId) {
        return this.send({
            root: true,
            type: 'get',
            parameters: {
                deviceId,
                commandId
            }
        });
    }

    /**
     * Return a list of commands
     * @param {number} deviceId - Device ID
     * @param {object} body - Params
     * @returns {promise} list of commands
     */
    list(deviceId, body) {
        return this.send({
            body,
            root: true,
            type: 'list',
            parameters: {
                deviceId
            }
        });
    }

    /**
     * Registers a command
     * @param {number} deviceId - Device ID
     * @param {object} body command data
     * @returns {promise} count of commands
     */
    insert(deviceId, body) {
        return this.send({
            body,
            root: true,
            type: 'insert',
            method: 'POST',
            parameters: {
                deviceId
            }
        });
    }

    /**
     * Updates a command
     * @param {number} deviceId
     * @param {object} body command data
     * @returns {promise} count of commands
     */
    update(deviceId, commandId, body) {
        return this.send({
            body,
            root: true,
            type: 'update',
            method: 'PUT',
            parameters: {
                deviceId,
                commandId
            }
        });
    }
}


// Exports

module.exports = DeviceCommandAPI;