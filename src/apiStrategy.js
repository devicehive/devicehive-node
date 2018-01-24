'use strict';

// Requirements

const EventEmitter = require('events');
const randomstring = require('randomstring');
const Rest = require('./transports/Rest');
const WS = require('./transports/WS');


// API Strategy

/**
* @event onMessage
*/
class APIStrategy extends EventEmitter {

    /**
     * APIStrategy
     */
    constructor(urls) {
        super();

        const SelectedAPI = this.getType(urls.mainServiceURL);

        if (SelectedAPI) {
            this.strategy = new SelectedAPI(urls);
        } else {
            throw new Error('unexpected mainServiceURL, please use allowed protocol');
        }
    }

    /**
     * Init method
     * @returns {promise} when initialized
     */
    initTransport () {
        return this.strategy.init();
    }

    /**
     * Authorize method
     * @param {object} credentials { accessToken }
     * @returns {promise} when authorized
     */
    authTransport({ accessToken }) {
        this.accessToken = accessToken;

        let promise;

        if (this.strategy.type === 'ws') {
            promise = this.send({
                action: 'authenticate',
                body: {
                    token: this.accessToken
                }
            });
        } else {
            promise = new Promise(resolve => resolve());
        }


        return promise;
    }
    
    /**
     * Returns current API
     * 
     * @returns {function} new model
     */
    getType(url) {
        let result;
        switch (true) {
            case url.startsWith('http'):
            case url.startsWith('https'):
                result = Rest;
                break;

            case url.startsWith('ws'):
                result = WS;
                break;

            default:
                break;
        }

        return result;
    }

    /**
     * TransportDataBuilder
     */
    transportDataBuilder({ auth = true, url = 'mainServiceURL', accessToken, endpoint, query, body, bodyWS, method = 'GET', action }) {
        let transferData = {};
        if (this.strategy.type === 'rest') {
            let fullURL = this.strategy.urls[url] + endpoint;

            if (method === 'GET' && query) {
                let queryPart = '';
                Object.keys(query).forEach(key => {
                    queryPart += `${key}=${query[key]}&`;
                });
                fullURL = `${fullURL}?${queryPart}`;
            }

            transferData = {
                method,
                headers: {},
                url: fullURL
            }

            if (method === 'POST' || method === 'PUT') {
                transferData.json = true;
                transferData.body = body;
                transferData.headers['Accept'] = 'application/json';
                transferData.headers['Content-Type'] = 'application/json';
            }

            if (auth) {
                transferData.headers.Authorization = `Bearer ${this.accessToken}`;
            }
        } else if (this.strategy.type === 'ws') {
            if (!action) throw new Error('no action');
            if (!bodyWS) bodyWS = body;
            transferData = {
                ...bodyWS,
                action
            };
            if (!transferData.requestId) {
                transferData.requestId = randomstring.generate();
            }
            console.log(transferData);
        }

        return transferData;
    }


    /**
     * Sending data
     * @param {object} data 
     */
    send(data) {
        return this.strategy.send(this.transportDataBuilder(data));
    }

}

module.exports = APIStrategy;