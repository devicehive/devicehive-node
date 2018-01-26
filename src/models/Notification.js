// Model

class DeviceNotification {

    /**
     * DeviceNotification model
     * @param {object} options ({ id, notification, timestamp, parameters })
     */
    constructor({ id, notification, timestamp, parameters }) {
        this.id = id;
        this.notification = notification;
        this.timestamp = timestamp;
        this.parameters = parameters;
    }

    /**
     * @returns {number} id;
     */
    get id() {
        return this._id;
    }

    /**
    * @param {number} value;
    * @returns {number} id;
    */
    set id(value) {
        this._id = value;
    }

    /**
     * @returns {string} name;
     */
    get name() {
        return this._name;
    }

    /**
     * @param {string} value;
     * @returns {string} name;
     */
    set name(value) {
        this._name = value;
    }

    /**
     * @returns {string} notification;
     */
    get notification() {
        return this._notification;
    }

    /**
     * @param {string} value;
     * @returns {string} notification;
     */
    set notification(value) {
        this._notification = value;
    }

    /**
     * @returns {string} timestamp;
     */
    get timestamp() {
        return this._timestamp;
    }

    /**
     * @param {string} value;
     * @returns {string} timestamp;
     */
    set timestamp(value) {
        this._timestamp = value;
    }

    /**
     * @returns {object} parameters;
     */
    get parameters() {
        return this._parameters;
    }

    /**
     * @param {object} value;
     * @returns {object} parameters;
     */
    set parameters(value) {
        this._parameters = value;
    }

    /**
     * Returns a copy of instance
     * @returns {object} A copy of instance
     */
    toObject() {
        return {
            id: this.id,
            notification: this.notification,
            timestamp: this.timestamp,
            parameters: this.parameters
        }
    }

    /**
     * Returns a stringified instance
     * @returns {object} A stringified instance
     */
    toString() {
        JSON.stringify(this.toObject());
    }
}


// Exports

module.exports = DeviceNotification;