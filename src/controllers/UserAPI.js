'use strict';

const API = require('./API');

// API

class UserAPI extends API {

    /**
     * UserAPI
     */
    constructor(...args) {
        super(...args);
        this.type = API.USER_TYPE;
    }

    /**
     * Returns information about the current user
     * @param {number} userId
     * @returns {promise} selected user
     */
    get(userId) {
        return this.send({
            root: true,
            type: 'get',
            parameters: {
                userId
            }
        });
    }

    /**
     * Returns information about the current user
     * @param {number} userId
     * @returns {promise} selected user
     */
    getCurrent() {
        return this.send({
            type: 'current',
            alternativeType: 'getCurrent'
        });
    }

    /**
     * Return a list of users
     * @param {object} query params
     * @returns {promise} list of users
     */
    list(body) {
        return this.send({
            body,
            root: true,
            type: 'list'
        });
    }

    /**
     * Returns count of users
     * @param {object} query params
     * @returns {promise} count of users
     */
    count(query) {
        return this.send({
            type: 'count'
        });
    }

    /**
     * Registers a user
     * @param {object} body user data
     * @returns {promise} count of users
     */
    insert(body) {
        return this.send({
            body,
            root: true,
            type: 'insert',
            method: 'POST'
        });
    }

    /**
     * Updates a user (only for administrators)
     * @param {number} userId
     * @param {object} body user data
     * @returns {promise} count of users
     */
    update(userId, body) {
        return this.send({
            body,
            root: true,
            type: 'update',
            method: 'PUT',
            parameters: {
                userId
            }
        });
    }

    /**
     * Updates a user (only for administrators)
     * @param {object} body user data
     * @returns {promise} count of users
     */
    updateCurrent(body) {
        return this.send({
            body,
            type: 'current',
            alternativeType: 'updateCurrent',
            method: 'PUT'
        });
    }

    /**
     * Deletes an existing user
     * @param {number} userId - User ID
     * @returns {promise}
     */
    delete(userId) {
        return this.send({
            root: true,
            type: 'delete',
            method: 'DELETE',
            parameters: {
                userId
            }
        });
    }

    /**
     * Gets information about user/network association
     * @param {number} userId - User ID
     * @param {number} networkId - Network ID
     * @returns {promise}
     */
    getNetwork(userId, networkId) {
        return this.send({
            type: 'network',
            alternativeType: 'getNetwork',
            parameters: {
                userId,
                networkId
            }
        });
    }

    /**
     * Associates network with the user
     * @param {number} userId - User ID
     * @param {number} networkId - Network ID
     * @returns {promise}
     */
    assignNetwork(userId, networkId) {
        return this.send({
            method: 'PUT',
            type: 'network',
            alternativeType: 'assignNetwork',
            parameters: {
                userId,
                networkId
            }
        });
    }

    /**
     * Removes association between network and user
     * @param {number} userId - User ID
     * @param {number} networkId - Network ID
     * @returns {promise}
     */
    unassignNetwork(userId, networkId) {
        return this.send({
            method: 'Delete',
            type: 'network',
            alternativeType: 'unassignNetwork',
            parameters: {
                userId,
                networkId
            }
        });
    }

}


// Exports

module.exports = UserAPI;