'use strict';

// Requirements

const EventEmitter = require('events');
const randomstring = require('randomstring');
const path = require('path');
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
                apiType: 'authenticate',
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
    getType(serviceURL) {
        let result;
        switch (true) {
            case serviceURL.startsWith('http'):
            case serviceURL.startsWith('https'):
                result = Rest;
                break;

            case serviceURL.startsWith('ws'):
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
    transportDataBuilder({ auth = true, service = 'mainServiceURL', apiType = '', type = '', parameters, body, method = 'get', root = false }) {
    // transportDataBuilder({ auth = true, url = 'mainServiceURL', accessToken, endpoint, query, body, bodyWS, method = 'GET', action }) {

        method = method.toUpperCase();

        let transferData = {};
        if (this.strategy.type === 'rest') {
            let pathParameter = '';
            let queryPart = '';
            if (parameters) pathParameter = parameters[Object.keys(parameters)[0]];
            
            if (method === 'GET' && body) {
                let queryPart = '';
                Object.keys(body).forEach(key => {
                    queryPart += `${key}=${body[key]}&`;
                });
                fullURL = `${fullURL}?${queryPart}`;
            }

            // Generating endproint
            const fullURL = `${this.strategy.urls[service]}/${path.join(apiType, root? '': type, pathParameter, queryPart)}`;

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
            const action = apiType + (type && '/') + type; 
            transferData = {
                ...parameters,
                ...body,
                action
            };
            if (!transferData.requestId) {
                transferData.requestId = randomstring.generate();
            }
            console.log(action, transferData);
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