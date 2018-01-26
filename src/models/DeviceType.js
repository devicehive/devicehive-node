// Model

class DeviceType {

    /**
     * DeviceType model
     * @param {object} options ({ id, name, description })
     */
    constructor({ id, name, description }) {
        this.id = id;
        this.name = name;
        this.description = description;
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
        return {
            id: this.id,
            name: this.name,
            description: this.description
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

module.exports = DeviceType;