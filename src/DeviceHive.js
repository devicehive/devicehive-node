'use strict';

// Requirements

const APIStrategy = require('./APIStrategy');

const Configuration = require('./models/Configuration');
const Device = require('./models/Device');
const DeviceType = require('./models/DeviceType');
const Command = require('./models/Command');
const Notification = require('./models/Notification');
const Network = require('./models/Network');
const Token = require('./models/Token');
const User = require('./models/User');

const InfoAPI = require('./controllers/InfoAPI');
const UserAPI = require('./controllers/UserAPI');
const DeviceAPI = require('./controllers/DeviceAPI');
const DeviceTypeAPI = require('./controllers/DeviceTypeAPI');
const TokenAPI = require('./controllers/TokenAPI');
const NetworkAPI = require('./controllers/NetworkAPI');
const ConfigurationAPI = require('./controllers/ConfigurationAPI');
const CommandAPI = require('./controllers/CommandAPI');
const NotificationAPI = require('./controllers/NotificationAPI');

//Source

class DeviceHive extends APIStrategy {

    /**
     * Returns an model of DeviceHive
     * 
     * @param {String} name (Configuration | Device | Command | Notification | Network | Token | User)
     * @return {Object} Entity 
     */
    static model(name) {
        // Entities
        const models = {
            Configuration,
            Device,
            DeviceType,
            Command,
            Notification,
            Network,
            Token,
            User
        };
        const model = models[name];

        if (!model) {
            throw new Error('no such model');
        }
        return model;
    }

    /**
     * DeviceHive module
     */
    constructor({ accessToken, refreshToken, login, password, mainServiceURL, authServiceURL, pluginServiceURL }) {

        // APIStrategy
        super({ mainServiceURL, authServiceURL, pluginServiceURL });

        // Credentials
        this.credentials = new Token({
            login,
            password,
            accessToken,
            refreshToken
        });


        // API`s
        this.info = new InfoAPI({ strategy: this });
        this.user = new UserAPI({ strategy: this });
        this.device = new DeviceAPI({ strategy: this });
        this.token = new TokenAPI({ strategy: this });
        this.network = new NetworkAPI({ strategy: this });
        this.configuration = new ConfigurationAPI({ strategy: this });
        this.command = new CommandAPI({ strategy: this });
        this.notification = new NotificationAPI({ strategy: this });
    }

    /**
     * Connect and authorize
     */
    connect() {
        const promise = new Promise((resolve, reject) => {
            if (this.credentials.refreshToken) {

                if (this.credentials.accessToken) {
                    this.initTransport()
                        .then(() => this.token.refresh(this.credentials))
                        .then(({ accessToken }) => {
                            this.credentials.accessToken = accessToken;
                        })
                        .then(() => this.authTransport(this.credentials))
                        .then(() => resolve(this))
                        .catch(reject);
                } else {

                    this.initTransport()
                        .then(() => this.authTransport(this.credentials))
                        .then(() => resolve(this))
                        .catch(reject);
                }
            } else if (this.credentials.login && this.credentials.password) {

                this.initTransport()
                    .then(() => this.token.auth(this.credentials))
                    .then(({ accessToken, refreshToken }) => {
                        this.credentials.accessToken = accessToken;
                        this.credentials.refreshToken = refreshToken;
                    })
                    .then(() => this.authTransport(this.credentials))
                    .then(() => resolve(this))
                    .catch(reject);
            }
            
        });

        return promise;
    }
}

// Exports

module.exports = DeviceHive;