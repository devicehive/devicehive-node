const { getAPI, getType } = require(`../src/api`);
const DeviceCommand = require(`./DeviceCommand`);
const DeviceNotification = require(`./DeviceNotification`);
let api;

class Device {
  constructor({ id, name = id, data = null, networkId = null, isBlocked = false }) {
    this.id = id;
    this.name = name;
    this.data = data;
    this.networkId = networkId;
    this.isBlocked = isBlocked;
    api = getAPI();

    this._commandsSubscribers = {};
    this._notificationsSubscribers = {};
  }

  /**
   * Returns Device's id.
   * 
   * @returns 
   * @memberof Device
   */
  getId() {
    return this.id;
  }

  /**
   * Returns Device's name
   * 
   * @returns 
   * @memberof Device
   */
  getName() {
    return this.name;
  }

  /**
   * Returns Device's data
   * 
   * @returns 
   * @memberof Device
   */
  getData() {
    return this.data;
  }

  /**
   * Returns Device's Network id.
   * 
   * @returns 
   * @memberof Device
   */
  getNetworkId() {
    return this.networkId;
  }

  /**
   * Returns Device's blocked state.
   * 
   * @returns 
   * @memberof Device
   */
  getBlocked() {
    return this.isBlocked;
  }

  /**
   * Sets Device's id.
   * 
   * @param {String} newID 
   * @memberof Device
   */
  setId(newID) {
    this.id = newID;
  }

  /**
   * Sets Device's name
   * 
   * @param {String} newName 
   * @memberof Device
   */
  setName(newName) {
    this.name = newName;
  }

  /**
   * Sets Device's data.
   * 
   * @param {Object | String} newData 
   * @memberof Device
   */
  setData(newData) {
    this.data = newData;
  }

  /**
   * Sets Device's Network id
   * 
   * @param {Number} newNetworkID 
   * @memberof Device
   */
  setNetworkId(newNetworkID) {
    this.networkId = newNetworkID;
  }

  /**
   * Sets Device's blocked state
   * 
   * @param {Boolean} newBlocked 
   * @memberof Device
   */
  setBlocked(newBlocked) {
    this.isBlocked = newBlocked;
  }

  /**
   * Saves Device's state.
   * 
   * @returns 
   * @memberof Device
   */
  save() {
    return api.callAuthorized(api.saveDevice, this.id, {
      name: this.name,
      data: this.data,
      networkId: this.networkId,
      isBlocked: this.isBlocked
    });
  }

  /**
   * Gets list of Commands that has been received in specified time range.
   * 
   * @typedef DeviceCommandsFilter
   * @property {String} start - Start timestamp
   * @property {String} end - End timestamp
   * @property {String} command - Command name
   * @property {String} status - Command status
   * @property {String} sortField - Sort field
   * @property {String} sortOrder - Sort order
   * @property {Number} take - Limit param
   * @property {Number} skip - Skip param
   * 
   * @param {DeviceCommandsFilter} filter 
   * @returns 
   * @memberof Device
   */
  getCommands(filter) {
    return api.callAuthorized(api.getDeviceCommands, this.id, filter)
      .then(commands => commands.map(command => new DeviceCommand(command)));
  }

  /**
   * Returns Notifications by provided parameters
   * 
   * @typedef DeviceNotificationsFilter
   * @property {String} start - Start timestamp
   * @property {String} end - End timestamp
   * @property {String} notification - Notification name
   * @property {String} sortField - Notification name
   * @property {String} sortOrder - Sort order
   * @property {Number} take - Limit param
   * @property {Number} skip - Skip param
   * 
   * @param {DeviceNotificationsFilter} filter 
   * @returns
   * 
   * @memberof Device
   */
  getNotifications(filter) {
    return api.callAuthorized(api.getDeviceNotifications, this.id, filter)
      .then(notifications => notifications.map(notification => new DeviceNotification(notification)));
  }

  /**
   * Creates new Device's Command, stores and returns Command with generated id.
   * Also allows to pass callback for subscription on Command's updates.
   * 
   * @typedef CommandParams
   * @property {String} timestamp
   * @property {Object} parameters
   * @property {Number} lifetime
   * @property {String} status
   * @property {String} result
   * 
   * @param {String} command
   * @param {CommandParams} commandParams 
   * @param {Function} updateSubscriber
   * @returns
   * 
   * @memberof Device
   */
  sendCommand(command, parameters = {}, updateSubscriber) {
    return api.callAuthorized(api.createDeviceCommand, this.id, { command, parameters })
      .then(createdCommand => {
        const newCommand = new DeviceCommand(createdCommand);
        if (updateSubscriber) {
          newCommand.subscribeUpdates(updateSubscriber);
        }
        return newCommand;
      });
  }

  /**
   * Creates Notification.
   * 
   * @typedef DeviceNotificationParams
   * @property {String} timestamp
   * @property {Object} parameters
   * 
   * @param {String} notification
   * @param {DeviceNotificationParams} parameters 
   * @returns
   * 
   * @memberof Device
   */
  sendNotification(notification, parameters = {}) {
    return api.callAuthorized(api.createDeviceNotification, this.id, { notification, parameters })
      .then(createdNotification => new DeviceNotification(createdNotification));
  }

  /**
   * Subscribes to all Commands for this Device by particular filter.
   * 
   * @param {Function} subscriber 
   * @param {Object} [commandFilter={}] 
   * @returns 
   * @memberof Device
   */
  subscribeCommands(subscriber, commandFilter = {}) {
    if (getType() === `ht`) {
      const filterKey = JSON.stringify(commandFilter);
      this._commandsSubscribers[filterKey] = {
        subscriber,
        lastTime: null
      };
      this._pollCommands(commandFilter);
      return Promise.resolve();
    } else {
      commandFilter.deviceId = this.id;
      return api.commandsSubscribe(commandFilter, subscriber, DeviceCommand);
    }
  }

  /**
   * Unsubscribe from this Device's Commands by particular filter
   * 
   * @param {Object} commandFilter 
   * @returns 
   * @memberof Device
   */
  unsubscribeCommands(commandFilter = {}) {
    if (getType() === `ht`) {
      const filterKey = JSON.stringify(commandFilter);
      delete this._commandsSubscribers[filterKey];
      return Promise.resolve();
    } else {
      commandFilter.deviceId = this.id;
      return api.commandsUnsubscribe(commandFilter);
    }
  }

  /**
   * Subscribe to all Notifications for this Device by particular filter.
   * 
   * @param {Function} subscriber 
   * @param {Object} [notificationFilter={}] 
   * @returns 
   * @memberof Device
   */
  subscribeNotifications(subscriber, notificationFilter = {}) {
    if (getType() === `ht`) {
      const filterKey = JSON.stringify(notificationFilter);
      this._notificationsSubscribers[filterKey] = {
        subscriber,
        lastTime: null
      };
      this._pollNotifications(notificationFilter);
      return Promise.resolve();
    } else {
      notificationFilter.deviceId = this.id;
      return api.notificationsSubscribe(notificationFilter, subscriber, DeviceNotification);
    }
  }

  /**
   * Unsubscribe from this Device's Notifications by particular filter.
   * 
   * @param {any} notificationFilter 
   * @returns 
   * @memberof Device
   */
  unsubscribeNotifications(notificationFilter = {}) {
    if (getType() === `ht`) {
      const filterKey = JSON.stringify(notificationFilter);
      delete this._notificationsSubscribers[filterKey];
      return Promise.resolve();
    } else {
      notificationFilter.deviceId = this.id;
      return api.notificationsUnsubscribe(notificationFilter);
    }
  }

  /**
   * Internal function for Commands polling
   * 
   * @param {Object} commandFilter 
   * @returns 
   * @memberof Device
   */
  _pollCommands(commandFilter) {
    if (this._commandsSubscribers[JSON.stringify(commandFilter)].lastTime) {
      const updatedFilter = Object.assign({}, commandFilter);
      updatedFilter.timestamp = this._commandsSubscribers[JSON.stringify(commandFilter)].lastTime;
      return this.api.callAuthorized(this.api.getDeviceCommandsPoll, this.id, updatedFilter)
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
        });
    } else {
      return this.api.getInfo()
        .then(info => {
          const updatedFilter = Object.assign({}, commandFilter);
          updatedFilter.timestamp = info.serverTimestamp;
          this._commandsSubscribers[JSON.stringify(commandFilter)].lastTime = info.serverTimestamp;
          return updatedFilter;
        })
        .then(updatedFilter => this.api.callAuthorized(this.api.getDeviceCommandsPoll, this.id, updatedFilter))
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
        });
    }
  }

  /**
   * Internal function for Notifications polling
   * 
   * @param {Object} notificationFilter 
   * @returns 
   * @memberof Device
   */
  _pollNotifications(notificationFilter) {
    if (this._notificationsSubscribers[JSON.stringify(notificationFilter)].lastTime) {
      const updatedFilter = Object.assign({}, notificationFilter);
      updatedFilter.timestamp = this._notificationsSubscribers[JSON.stringify(notificationFilter)].lastTime;
      return api.callAuthorized(api.getDevicesNotificationsPoll, updatedFilter)
        .then(notifications => {
          if (notifications.length) {
            const timestamps = notifications.map(notification => notification.timestamp).sort((a, b) => a < b);
            this._notificationsSubscribers[JSON.stringify(notificationFilter)].lastTime = timestamps[0];
          }
          const subscriber = this._notificationsSubscribers[JSON.stringify(notificationFilter)].subscriber;
          if (subscriber) {
            subscriber(notifications.map(notification => new DeviceCommand(notification)));
            this._pollCommands(notificationFilter);
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
        .then(updatedFilter => this.api.callAuthorized(this.api.getDeviceNotificationPoll, this.id, updatedFilter))
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

module.exports = Device;