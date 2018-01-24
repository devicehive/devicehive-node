// Model

class User {

    /**
     * User model
     * @param {object} options ({ id, login, role, status, lastLogin, data, password, introReviewed, allDeviceTypesAvailable })
     */
    constructor({ id, login, role, status, lastLogin, data, password, introReviewed, allDeviceTypesAvailable }) {
        this._id = id;
        this._login = login;
        this._role = role;
        this._status = status;
        this._lastLogin = lastLogin;
        this._data = data;
        this._password = password;
        this._introReviewed = introReviewed;
        this._allDeviceTypesAvailable = allDeviceTypesAvailable;
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
     * @returns {string} login;
     */
    get login() {
        return this._login;
    }

    /**
     * @param {string} value;
     * @returns {string} login;
     */
    set login(value) {
        this._login = value;
    }

    /**
     * @returns {numner} role;
     */
    get role() {
        return this._role;
    }

    /**
     * @param {numner} value;
     * @returns {numner} role;
     */
    set role(value) {
        this._role = value;
    }

    /**
     * @returns {numner} status;
     */
    get status() {
        return this._status;
    }

    /**
     * @param {numner} value;
     * @returns {numner} status;
     */
    set status(value) {
        this._status = value;
    }

    /**
     * @returns {string} lastLogin;
     */
    get lastLogin() {
        return this._lastLogin;
    }

    /**
     * @param {string} value;
     * @returns {string} lastLogin;
     */
    set lastLogin(value) {
        this._lastLogin = value;
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
     * @returns {string} password;
     */
    get password() {
        return this._password;
    }

    /**
     * @param {string} value;
     * @returns {string} password;
     */
    set password(value) {
        this._password = value;
    }

    /**
     * @returns {boolean} introReviewed;
     */
    get introReviewed() {
        return this._introReviewed;
    }

    /**
     * @param {boolean} value;
     * @returns {boolean} introReviewed;
     */
    set introReviewed(value) {
        this._introReviewed = value;
    }

    /**
     * @returns {boolean} introReviewed;
     */
    get allDeviceTypesAvailable() {
        return this._allDeviceTypesAvailable;
    }

    /**
     * @param {boolean} value;
     * @returns {boolean} allDeviceTypesAvailable;
     */
    set allDeviceTypesAvailable(value) {
        this._allDeviceTypesAvailable = value;
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

module.exports = User;