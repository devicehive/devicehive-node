'use strict';

// Requirements

const APIStrategy = require('./APIStrategy');

const Device = require('./models/Device');
const DeviceCommand = require('./models/DeviceCommand');
const DeviceNotification = require('./models/DeviceNotification');
const Network = require('./models/Network');
const Token = require('./models/Token');
const User = require('./models/User');

const InfoAPI = require('./controllers/InfoAPI');
const DeviceAPI = require('./controllers/DeviceAPI');
const TokenAPI = require('./controllers/TokenAPI');

//Source

class DeviceHive extends APIStrategy {

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
        this.device = new DeviceAPI({ strategy: this });
        this.token = new TokenAPI({ strategy: this });
    }

    /**
     * Returns an model of DeviceHive
     * 
     * @param {String} name (Device | DeviceCommand | DeviceNotification | Network | Token | User)
     * @return {Object} Entity 
     */
    static model(name) {
        // Entities
        const models = {
            Device,
            DeviceCommand,
            DeviceNotification,
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