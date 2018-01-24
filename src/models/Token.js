// Model

class Token {

    /**
     * Token model
     * @param {object} options ({ login, password, accessToken, refreshToken })
     */
    constructor({ login, password, accessToken, refreshToken }) {
        this._login = login;
        this._password = password;
        this._accessToken = accessToken;
        this._refreshToken = refreshToken;
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
     * @returns {string} accessToken;
     */
    get accessToken() {
        return this._accessToken; 
    }

    /**
     * @param {string} value;
     * @returns {string} accessToken;
     */
    set accessToken(value) {
        this._accessToken = value;
    }

    /**
     * @returns {string} refreshToken;
     */
    get refreshToken() {
        return this._refreshToken;
    }

    /**
     * @param {string} value;
     * @returns {string} refreshToken;
     */
    set refreshToken(value) {
        this._refreshToken = value;
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

module.exports = Token;