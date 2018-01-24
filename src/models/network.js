// Model

class Network {

    /**
     * Network model
     * @param {object} options ({ id, name, description })
     */
    constructor({ id, name, description }) {
        this._id = id;
        this._name = name;
        this._description = description;
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
     * @returns {string} description;
     */
    get description() {
        return this._description;
    }

    /**
     * @param {string} value;
     * @returns {string} description;
     */
    set description(value) {
        this._description = value;
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

module.exports = Network;