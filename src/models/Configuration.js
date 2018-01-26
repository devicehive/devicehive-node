// Model

class Configuration {

    /**
     * Configuration model
     * @param {object} options ({ name, value, entityVersion })
     */
    constructor({ name, value, entityVersion }) {
        this.name = name;
        this.value = value;
        this.entityVersion = entityVersion;
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
    get value() {
        return this._value;
    }

    /**
     * @param {string} value;
     * @returns {string} value;
     */
    set value(value) {
        this._value = value;
    }

    /**
     * @returns {number} entityVersion;
     */
    get entityVersion() {
        return this._entityVersion;
    }

    /**
    * @param {number} value;
    * @returns {number} entityVersion;
    */
    set entityVersion(value) {
        this._entityVersion = value;
    }

    /**
     * Returns a copy of instance
     * @returns {object} A copy of instance
     */
    toObject() {
        return {
            name: this.name,
            value: this.value,
            entityVersion: this.entityVersion
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

module.exports = Configuration;