'use strict';

const API = require('./API');

// API

class DeviceNotificationAPI extends API {

    /**
     * DeviceNotificationAPI
     */
    constructor(...args) {
        super(...args);
        this.type = API.DEVICE_TYPE;
        this.nestedType = API.DEVICENOTIFICATION_TYPE;
    }

    /**
     * Returns information about the current notification
     * @param {number} deviceId - Device ID
     * @param {number} notificationId - Notification ID
     * @returns {promise} selected notification
     */
    get(deviceId, notificationId) {
        return this.send({
            root: true,
            type: 'get',
            parameters: {
                deviceId,
                notificationId
            }
        });
    }

    /**
     * Return a list of notifications
     * @param {object} query params
     * @returns {promise} list of notifications
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
     * Registers a notification
     * @param {object} body notification data
     * @returns {promise} count of notifications
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
}


// Exports

module.exports = DeviceNotificationAPI;