// Model

class DeviceCommand {

    /**
     * DeviceCommand model
     * @param {object} options ({ id, command, timestamp, lastUpdated, userId, deviceId, networkId, deviceTypeId, parameters, lifetime, status, result })
     */
    constructor({ id, command, timestamp, lastUpdated, userId, deviceId, networkId, deviceTypeId, parameters, lifetime, status, result }) {
        this.id = id;
        this.command = command;
        this.timestamp = timestamp;
        this.lastUpdated = lastUpdated;
        this.userId = userId;
        this.deviceId = deviceId;
        this.networkId = networkId;
        this.deviceTypeId = deviceTypeId;
        this.parameters = parameters;
        this.lifetime = lifetime;
        this.status = status;
        this.result = result;
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
     * @returns {string} lastUpdated;
     */
    get lastUpdated() {
        return this._lastUpdated;
    }

    /**
     * @param {string} value;
     * @returns {string} lastUpdated;
     */
    set lastUpdated(value) {
        this._lastUpdated = value;
    }

    /**
     * @returns {number} userId;
     */
    get userId() {
        return this._userId;
    }

    /**
    * @param {number} value;
    * @returns {number} userId;
    */
    set userId(value) {
        this._userId = value;
    }

    /**
     * @returns {number} deviceId;
     */
    get deviceId() {
        return this._deviceId;
    }

    /**
    * @param {number} value;
    * @returns {number} deviceId;
    */
    set deviceId(value) {
        this._deviceId = value;
    }

    /**
     * @returns {number} networkId;
     */
    get networkId() {
        return this._networkId;
    }

    /**
    * @param {number} value;
    * @returns {number} networkId;
    */
    set networkId(value) {
        this._networkId = value;
    }

    /**
     * @returns {number} deviceTypeId;
     */
    get deviceTypeId() {
        return this._deviceTypeId;
    }

    /**
    * @param {number} value;
    * @returns {number} deviceTypeId;
    */
    set deviceTypeId(value) {
        this._deviceTypeId = value;
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
     * @returns {number} lifetime;
     */
    get lifetime() {
        return this._lifetime;
    }

    /**
    * @param {number} value;
    * @returns {number} lifetime;
    */
    set lifetime(value) {
        this._lifetime = value;
    }

    /**
     * @returns {string} status;
     */
    get status() {
        return this._status;
    }

    /**
    * @param {string} value;
    * @returns {string} status;
    */
    set status(value) {
        this._status = value;
    }

    /**
     * Returns a copy of instance
     * @returns {object} A copy of instance
     */
    toObject() {
        return {
            id: this.id,
            command: this.command,
            timestamp: this.timestamp,
            lastUpdated: this.lastUpdated,
            userId: this.userId,
            deviceId: this.deviceId,
            networkId: this.networkId,
            deviceTypeId: this.deviceTypeId,
            parameters: this.parameters,
            lifetime: this.lifetime,
            status: this.status,
            result: this.result,
        }
    }

    /**
     * Returns a stringified instance
     * @returns {object} A stringified instance
     */
    toString() {
        return JSON.stringify(this.toObject());
    }
}


// Exports

module.exports = DeviceCommand;