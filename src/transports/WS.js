'use strict';

// Transport

class WS {

    /**
     * WS API
     */
    constructor({ mainServiceURL }) {
        this.type = 'ws';
        this.urls = { mainServiceURL };

        // if it's node.js environment
        if (typeof WebSocket === 'undefined') {
            this.WSClient = require('ws');
        } else {
            this.WSClient = WebSocket;
        }
    }

    /**
     * Initialize WS API
     * 
     * @returns {promise} when initialized
     */
    init(serverURL) {
        this.socket = new this.WSClient(this.urls.mainServiceURL);
        return new Promise(resolve => {
            this.socket.addEventListener('open', event => resolve(this));
        });
    }

    /**
     * WS API send method
     */
    send(params) {

        return new Promise((resolve, reject) => {
            this.socket.send(JSON.stringify(params));
            const listener = event => {
                const messageData = JSON.parse(event.data);
                if (messageData.action === params.action) {
                    if (messageData.requestId === params.requestId) {
                        this.socket.removeEventListener('message', listener);
                        if (messageData.status === 'success') {
                            resolve(messageData);
                        } else {
                            reject(messageData);
                        }
                    }
                }
            }

            this.socket.addEventListener('message', listener);
        })
    }

}


// Epxorts

module.exports = WS;