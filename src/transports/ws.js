// Requirements
let WSClient;

// if it's node.js environment
if (typeof WebSocket === 'undefined') {
    WSClient = require('ws');
} else {
    WSClient = WebSocket;
}

// Transport

class WS {

    /**
     * WS API
     */
    constructor({ mainServiceURL }) {
        this.type = 'ws';
        this.urls = { mainServiceURL };
    }

    /**
     * Initialize WS API
     * 
     * @returns {promise} when initialized
     */
    init(serverURL) {
        this.socket = new WSClient(this.urls.mainServiceURL);
        // const sendWS = sendWS.bind(this, socket);
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