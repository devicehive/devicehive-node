// Model

class Device {

    /**
     * Device model
     * @param {object} options ({ id, name, data, networkId, deviceTypeId, blocked })
     */
    constructor({ id, name, data, networkId, deviceTypeId, blocked }) {
        this._name = name;
        this._data = data;
        this._networkId = networkId;
        this._deviceTypeId = deviceTypeId;
        this._blocked = blocked;
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
     * @returns {object} data;
     */
    get data() {
        return this._data;
    }

    /**
     * @param {object} value;
     * @returns {object} data;
     */
    set data(value) {
        this._data = value;
    }

    /**
     * @returns {string} networkId;
     */
    get networkId() {
        return this._networkId;
    }

    /**
     * @param {string} value;
     * @returns {string} networkId;
     */
    set networkId(value) {
        this._networkId = value;
    }

    /**
     * @returns {string} deviceTypeId;
     */
    get deviceTypeId() {
        return this._deviceTypeId;
    }

    /**
     * @param {string} value;
     * @returns {string} deviceTypeId;
     */
    set deviceTypeId(value) {
        this._deviceTypeId = value;
    }

    /**
     * @returns {string} blocked;
     */
    get blocked() {
        return this._blocked;
    }

    /**
     * @param {boolean} value;
     * @returns {boolean} blocked;
     */
    set blocked(value) {
        this._blocked = value;
    }

    /**
     * Returns a copy of instance
     * @returns {object} A copy of instance
     */
    toObject() {
        return Object.assign({}, this);
    }

    /**
     * Returns a stringified instance
     * @returns {object} A stringified instance
     */
    toString() {
        JSON.stringify(this);
    }
}


// Exports

module.exports = Device;