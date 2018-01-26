'use strict';

// Requirements

const EventEmitter = require('events');
const randomstring = require('randomstring');
const path = require('path');
const Rest = require('./transports/Rest');
const WS = require('./transports/WS');
const API = require('./controllers/API');

// API Strategy

/**
* @event onMessage
*/
class APIStrategy extends EventEmitter {


    static get WS_STRATEGY() { return 'ws_strategy'; }
    static get HTTP_STRATEGY() { return 'http_strategy'; }

    /**
     * APIStrategy
     */
    constructor(urls) {
        super();

        const SelectedTransport = this.getType(urls.mainServiceURL);

        if (SelectedTransport) {
            this.strategy = new SelectedTransport(urls);
        } else {
            throw new Error('unexpected mainServiceURL, please use allowed protocol');
        }
    }

    /**
     * Init method
     * @returns {promise} when initialized
     */
    initTransport() {
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
    transportDataBuilder({ auth = true, service = 'mainServiceURL', apiType = '', type = '', nestedApiType = '', parameters, body, method = 'get', root = false }) {

        method = method.toUpperCase();

        let transferData = {};
        if (this.strategy.type === 'rest') {
            let pathParameter = '';
            let netsedPathParameter = '';
            let queryPart = '';
            if (parameters) pathParameter = String(parameters[Object.keys(parameters)[0]] || '');
            if (parameters) netsedPathParameter = String(parameters[Object.keys(parameters)[1]] || '');

            if (method === 'GET' && body) {
                let queryPart = '';
                Object.keys(body).forEach(key => {
                    queryPart += `${key}=${body[key]}&`;
                });
                queryPart = `?${queryPart}`;
            }

            // Generating endproint
            const fullURL = `${this.strategy.urls[service]}/${path.join(apiType, pathParameter, root ? '' : type, nestedApiType, netsedPathParameter, queryPart)}`;

            console.log(fullURL);

            transferData = {
                method,
                headers: {},
                url: fullURL
            }

            if (method === 'POST' || method === 'PUT') {
                // if it's a model
                if (body && typeof body.toObject === 'function') {
                    body = body.toObject();
                }

                transferData.json = true;
                transferData.body = body;
                transferData.headers['Accept'] = 'application/json';
                transferData.headers['Content-Type'] = 'application/json';
            }

            if (auth) {
                transferData.headers.Authorization = `Bearer ${this.accessToken}`;
            }
        } else if (this.strategy.type === 'ws') {
            const action = (nestedApiType || apiType) + (type && '/') + type;

            // if it's a model
            if (body && typeof body.toObject === 'function') {
                body = {
                    [nestedApiType || apiType]: body.toObject()
                }
            }

            transferData = {
                ...parameters,
                ...body,
                action
            };
            if (!transferData.requestId) {
                transferData.requestId = randomstring.generate();
            }
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