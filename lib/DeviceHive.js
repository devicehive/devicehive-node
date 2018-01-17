'use strict';

const { init, getType } = require('../src/api');
const Device = require('./Device');
const DeviceCommand = require('./DeviceCommand');
const DeviceNotification = require('./DeviceNotification');
const User = require('./User');
const Network = require('./Network');
const API = require('../src/api');

class DeviceHive {

  /**
   * @param {Object} options { accessToken, refreshToken, login, password, mainServiceURL, authServiceURL, pluginServiceURL }
   */
  constructor({ accessToken, refreshToken, login, password, mainServiceURL, authServiceURL, pluginServiceURL }) {
    this._commandsSubscribers = {};
    this._notificationsSubscribers = {};
    this._entities = {
      Device,
      DeviceCommand,
      DeviceNotification,
      User,
      Network
    };
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.login = login;
    this.password = password;
    this.mainServiceURL = mainServiceURL;
    this.authServiceURL = authServiceURL;
    this.pluginServiceURL = pluginServiceURL;

    this.api = new API({
      mainServiceURL,
      authServiceURL,
      pluginServiceURL
    });

  }

  /**
   * Connect method
   * @returns {Promise}
   */
  connect() {

    const connectPromice = new Promise((resolve, reject) => {
      if (this.accessToken && this.refreshToken) {
        this.api.setTokens({
            accessToken: this.accessToken,
            refreshToken: this.refreshToken
          })
          .then(resolve(this))
          .catch(reject);
      } else if (this.refreshToken) {
        this.api.refreshToken(this.refreshToken)
          .then(({ accessToken }) => this.api.setTokens({
            refreshToken,
            accessToken
          }))
          .then(resolve(this))
          .catch(reject);
      } else if (this.login && this.password) {
        this.api.createTokenByLoginInfo({
            login: this.login,
            password: this.password
          })
          .then(({ accessToken, refreshToken }) => this.api.setTokens({ accessToken, refreshToken }))
          .then(resolve(this))
          .catch(reject);
      } else {
        return reject(new Error('Authentication info not passed.'))
      }
    });

    return connectPromice;
  }

  /**
   * Returns an entity of DeviceHive
   * 
   * @param {String} name (Device | DeviceCommand | DeviceNotification | User | Network)
   * @return {Object} Entity 
   */
  entity(name) {
    return this._entities[name] || {};
  }

  /**
   * Returns version of API, server timestamp and WebSocket base uri
   * 
   * @returns 
   * @memberof DeviceHive
   */
  getInfo() {
    return this.api.getInfo();
  }

  /**
   * Returns information about cluster (Kafka, Zookeeper etc.)
   * 
   * @returns 
   * @memberof DeviceHive
   */
  getClusterInfo() {
    return this.api.getInfoConfigCluster();
  }

  /**
   * Create token by system params and returns a session-level JWT token.
   * 
   * @param {Number} userId 
   * @param {String[]} actions 
   * @param {String[]} networkIds 
   * @param {String[]} deviceIds 
   * @param {String} expiration 
   * @returns 
   * @memberof DeviceHive
   */
  createToken(userId, actions, networkIds, deviceIds, expiration) {
    return this.api.callAuthorized(this.api.createTokenBySystemParams, { userId, actions, networkIds, deviceIds, expiration });
  }

  /**
   * Refresh JWT access token.
   * 
   * @returns 
   * @memberof DeviceHive
   */
  refreshToken() {
    return this.api.refreshToken();
  }

  /**
   *  Returns requested property value
   * 
   * @param {String} name 
   * @returns 
   * @memberof DeviceHive
   */
  getConfigurationProperty(name) {
    return this.api.callAuthorized(this.api.getConfiguration, name);
  }

  /**
   * Sets configuration property value
   * 
   * @param {String} name 
   * @param {String} value 
   * @returns 
   * @memberof DeviceHive
   */
  setConfigurationProperty(name, value) {
    return this.api.callAuthorized(this.api.saveConfiguration, name, value);
  }

  /**
   * Deletes property
   * 
   * @param {String} name 
   * @returns 
   * @memberof DeviceHive
   */
  removeConfigurationProperty(name) {
    return this.api.callAuthorized(this.api.deleteConfiguration, name);
  }

  /**
   * Gets list of Networks the client has access to.
   * 
   * @typedef NetworkFilter
   * @property {String} name - Filter by network name.
   * @property {String} namePattern - Filter by network name pattern.
   * @property {String} sortField - Result list sort field.
   * @property {String} sortOrder - Result list sort order.
   * @property {Number} take - Number of records to take from the result list.
   * @property {Number} skip - Number of records to skip from the result list.
   * 
   * @param {NetworkFilter} filter 
   * @returns 
   * @memberof DeviceHive
   */
  listNetworks(filter) {
    return this.api.callAuthorized(this.api.getNetworks, filter)
      .then(networks => networks.map(network => new Network(network)));
  }

  /**
   * Gets information about Network.
   * 
   * @param {String} networkId 
   * @returns 
   * @memberof DeviceHive
   */
  getNetwork(networkId) {
    return this.api.callAuthorized(this.api.getNetwork, networkId)
      .then(network => new Network(network));
  }

  /**
   * Deletes an existing Network.
   * 
   * @param {String} id 
   * @returns 
   * @memberof DeviceHive
   */
  removeNetwork(id) {
    return this.api.callAuthorized(this.api.deleteNetwork, id);
  }

  /**
   * Creates new Network.
   * 
   * @param {String} name 
   * @param {String} description 
   * @returns 
   * @memberof DeviceHive
   */
  createNetwork(name, description) {
    return this.api.callAuthorized(this.api.createNetwork, { name, description })
      .then(network => new Network(network));
  }

  /**
   * Gets list of Devices.
   * @typedef DeviceFilter
   * @property {String} name - Filter by device name.
   * @property {String} namePattern - Filter by device name pattern.
   * @property {Number} networkId - Filter by associated network identifier.
   * @property {String} networkName - Filter by associated network name.
   * @property {String} sortField - Result list sort field.
   * @property {String} sortOrder - Result list sort order.
   * @property {Number} take - Number of records to take from the result list.
   * @property {Number} skip - Number of records to skip from the result list.
   * 
   * @param {DeviceFilter} filter 
   * @returns 
   * @memberof DeviceHive
   */
  listDevices(filter) {
    return this.api.callAuthorized(this.api.getDevices, filter)
      .then(devices => devices.map(device => new Device(device)));
  }

  /**
   * Deletes an existing Device.
   * 
   * @param {String} id 
   * @returns 
   * @memberof DeviceHive
   */
  removeDevice(id) {
    return this.api.callAuthorized(this.api.deleteDevice, id);
  }

  /**
   * Gets information about Device.
   * 
   * @param {String} id 
   * @returns 
   * @memberof DeviceHive
   */
  getDevice(id) {
    return this.api.callAuthorized(this.api.getDevice, id)
      .then(device => new Device(device));
  }

  /**
   * Registers or updates a Device. For initial Device registration, only 'name' property is required.
   * 
   * @typedef DeviceParams
   * @property {String} id
   * @property {String} name
   * @property {String} data
   * @property {Number} networkId
   * @property {Boolean} blocked
   * 
   * @param {String} id 
   * @param {DeviceParams} [params={}] 
   * @returns 
   * @memberof DeviceHive
   */
  putDevice(id, params = {}) {
    params.id = id;
    return this.api.callAuthorized(this.api.saveDevice, id, new Device(params));
  }

  /**
   * Get information about the current User.
   * 
   * @returns 
   * @memberof DeviceHive
   */
  getCurrentUser() {
    return this.api.callAuthorized(this.api.getCurrentUser)
      .then(currentUser => new User(currentUser));
  }

  /**
 * Gets list of Users.
 * 
 * @typedef UsersFilter
 * @property {String} login - Filter by user login.
 * @property {String} loginPattern - Filter by user login pattern.
 * @property {Number} role - Filter by user role. 0 is Administrator, 1 is Client.
 * @property {Number} status - Filter by user status. 0 is Active, 1 is Locked Out, 2 is Disabled.
 * @property {String} sortField - Result list sort field.
 * @property {String} sortOrder - Result list sort order. Available values are ASC and DESC.
 * @property {Number} take - Number of records to take from the result list.
 * @property {Number} skip - Number of records to skip from the result list.
 * 
 * @param {UsersFilter} filter 
 * @returns {Promise}
 * 
 * @memberof DeviceHive
 */
  getUsers(filter) {
    return this.api.callAuthorized(this.api.getUsers, filter)
      .then(users => users.map(user => new User(user)));
  }

  /**
 * Creates new User.
 * 
 * @typedef UserParams
 * @property {String} login
 * @property {Number} role
 * @property {Number} status
 * @property {String} password
 * @property {String} oldPassword
 * @property {String} data
 * @property {Boolean} introReviewed
 * 
 * @param {UserParams} userParams 
 * @returns {Promise}
 * 
 * @memberof DeviceHive
 */
  createUser(params) {
    return this.api.callAuthorized(this.api.createUser, new User(params))
      .then(newUser => new User(newUser));
  }

  /**
   * Delete User.
   * 
   * @param {String} id 
   * @returns 
   * @memberof DeviceHive
   */
  removeUser(id) {
    return this.api.callAuthorized(this.api.deleteUser, id);
  }


  /**
   * Allows subscribe for Commands to particular Devices with filter
   * @typedef DeviceCommandFilter
   * @property {String} names - Command names
   * @property {String} timestamp - Timestamp to start from
   * @property {Number} waitTimeout - Wait timeout in seconds
   * @property {Number} limit - Limit number of commands
   * 
   * @param {[String]} deviceIds 
   * @param {Function} subscriber 
   * @param {DeviceCommandFilter} commandFilter 
   * @returns 
   * @memberof DeviceHive
   */
  subscribeCommands(deviceIds, subscriber, commandFilter) {
    commandFilter.deviceIds = deviceIds;
    if (api.getType() === 'http') {
      const filterKey = JSON.stringify(commandFilter);
      this._commandsSubscribers[filterKey] = {
        subscriber,
        lastTime: null
      };
      this._pollCommands(commandFilter);
      return Promise.resolve();
    } else {
      return this.api.commandsSubscribe(commandFilter, subscriber, DeviceCommand);
    }
  }

  /**
   * Allows unsubscribe from Commands to particular Devices with filter
   * 
   * @param {[String]} deviceIds 
   * @param {DeviceCommandFilter} commandFilter 
   * @returns 
   * @memberof DeviceHive
   */
  unsubscribeCommands(deviceIds, commandFilter) {
    commandFilter.deviceIds = deviceIds;
    if (api.getType() === 'http') {
      const filterKey = JSON.stringify(commandFilter);
      delete this._commandsSubscribers[filterKey];
      return Promise.resolve();
    } else {
      return this.api.commandsUnsubscribe(commandFilter);
    }
  }

  /**
   * Allows subscribe for Notifications to particular Devices with filter
   * @typedef DeviceNotificationFilter
   * @property {Number} waitTimeout - Wait timeout
   * @property {String} names - Notification names
   * @property {String} timestamp - Timestamp to start from
   * 
   * @param {[String]} deviceIds 
   * @param {Function} subscriber 
   * @param {DeviceNotificationFilter} notificationFilter 
   * @returns 
   * @memberof DeviceHive
   */
  subscribeNotifications(deviceIds, subscriber, notificationFilter) {
    notificationFilter.deviceIds = deviceIds;
    if (api.getType() === 'http') {
      const filterKey = JSON.stringify(notificationFilter);
      this._notificationsSubscribers[filterKey] = {
        subscriber,
        lastTime: null
      };
      this._pollNotifications(notificationFilter);
      return Promise.resolve();
    } else {
      return this.api.notificationsSubscribe(notificationFilter, subscriber, DeviceNotification);
    }
  }

  /**
   * Allows unsubscribe from Notifications to particular Devices with filter
   * 
   * @param {[String]} deviceIds 
   * @param {DeviceNotificationFilter} notificationFilter 
   * @returns 
   * @memberof DeviceHive
   */
  unsubscribeNotifications(deviceIds, notificationFilter) {
    notificationFilter.deviceIds = deviceIds;
    if (api.getType() === 'http') {
      const filterKey = JSON.stringify(notificationFilter);
      delete this._notificationsSubscribers[filterKey];
      return Promise.resolve();
    } else {
      return this.api.notificationsUnsubscribe(notificationFilter);
    }
  }

  /**
   * Internal function for polling Commands with particular filter
   * 
   * @param {DeviceCommandFilter} commandFilter 
   * @returns 
   * @memberof DeviceHive
   */
  _pollCommands(commandFilter) {
    if (this._commandsSubscribers[JSON.stringify(commandFilter)].lastTime) {
      const updatedFilter = Object.assign({}, commandFilter);
      updatedFilter.timestamp = this._commandsSubscribers[JSON.stringify(commandFilter)].lastTime;
      return this.api.callAuthorized(this.api.getDevicesCommandPoll, updatedFilter)
        .then(commands => {
          if (commands.length) {
            const timestamps = commands.map(command => command.timestamp).sort((a, b) => a < b);
            this._commandsSubscribers[JSON.stringify(commandFilter)].lastTime = timestamps[0];
          }
          const subscriber = this._commandsSubscribers[JSON.stringify(commandFilter)].subscriber;
          if (subscriber) {
            subscriber(commands.map(command => new DeviceCommand(command)));
            this._pollCommands(commandFilter);
          }
        })
    } else {
      return this.api.getInfo()
        .then(info => {
          const updatedFilter = Object.assign({}, commandFilter);
          updatedFilter.timestamp = info.serverTimestamp;
          this._commandsSubscribers[JSON.stringify(commandFilter)].lastTime = info.serverTimestamp;
          return updatedFilter;
        })
        .then(updatedFilter => this.api.callAuthorized(this.api.getDevicesCommandPoll, updatedFilter))
        .then(commands => {
          if (commands.length) {
            const timestamps = commands.map(command => command.timestamp).sort((a, b) => a < b);
            this._commandsSubscribers[JSON.stringify(commandFilter)].lastTime = timestamps[0];
          }
          const subscriber = this._commandsSubscribers[JSON.stringify(commandFilter)].subscriber;
          if (subscriber) {
            subscriber(commands.map(command => new DeviceCommand(command)));
            this._pollCommands(commandFilter);
          }
        })
    }
  }

  /**
   * Internal function for polling Notifications with particular filter
   * 
   * @param {DeviceNotificationFilter} notificationFilter 
   * @returns 
   * @memberof DeviceHive
   */
  _pollNotifications(notificationFilter) {
    if (this._notificationsSubscribers[JSON.stringify(notificationFilter)].lastTime) {
      const updatedFilter = Object.assign({}, notificationFilter);
      updatedFilter.timestamp = this._notificationsSubscribers[JSON.stringify(notificationFilter)].lastTime;
      return this.api.callAuthorized(this.api.getDevicesNotificationsPoll, updatedFilter)
        .then(notifications => {
          if (notifications.length) {
            const timestamps = notifications.map(notification => notification.timestamp).sort((a, b) => a < b);
            this._notificationsSubscribers[JSON.stringify(notificationFilter)].lastTime = timestamps[0];
          }
          const subscriber = this._notificationsSubscribers[JSON.stringify(notificationFilter)].subscriber;
          if (subscriber) {
            subscriber(notifications.map(notification => new DeviceNotification(notification)));
            this._pollNotifications(notificationFilter);
          }
        })
    } else {
      return this.api.getInfo()
        .then(info => {
          const updatedFilter = Object.assign({}, notificationFilter);
          updatedFilter.timestamp = info.serverTimestamp;
          this._notificationsSubscribers[JSON.stringify(notificationFilter)].lastTime = info.serverTimestamp;
          return updatedFilter;
        })
        .then(updatedFilter => this.api.callAuthorized(this.api.getDevicesNotificationsPoll, updatedFilter))
        .then(notifications => {
          if (notifications.length) {
            const timestamps = notifications.map(notification => notification.timestamp).sort((a, b) => a < b);
            this._notificationsSubscribers[JSON.stringify(notificationFilter)].lastTime = timestamps[0];
          }
          const subscriber = this._notificationsSubscribers[JSON.stringify(notificationFilter)].subscriber;
          if (subscriber) {
            subscriber(notifications.map(notification => new DeviceNotification(notification)));
            this._pollNotifications(notificationFilter);
          }
        })
    }
  }
}

module.exports = DeviceHive;