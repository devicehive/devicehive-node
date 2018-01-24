'use strict';

// Requirements

const Rest = require(`./rest`);
const WS = require(`./ws`);


// Source

class API {
    /**
     * @param {Object} options { authServiceURL, mainServiceURL, pluginServiceURL }
     */
    constructor(options) {
        const { authServiceURL, mainServiceURL, pluginServiceURL } = options;

        const SelectedAPI = this.getType(mainServiceURL);

        if (SelectedAPI) {
            this.schema = new SelectedAPI({
                authServiceURL,
                mainServiceURL,
                pluginServiceURL
            });
        } else {
            throw new Error('unexpected mainServiceURL, please use allowed protocol');
        }

        return this.schema;
    }

    /**
     * Returns current API
     * 
     * @returns 
     */
    getType(url) {
        let parsedURL;
        if (url) parsedURL = url.match(/^([a-z]{1,5}):\/\//);
        if (!parsedURL || !parsedURL[1]) return;
        const protocol = parsedURL[1].toLowerCase();
        switch (protocol) {
            case 'http': {
                return Rest;
                break;
            }

            case 'https': {
                return Rest;
                break;
            }

            case 'ws': {
                return WS;
                break;
            }

            default: {
                return;
                break;
            }
        }
    }
}


// Exports

module.exports = API;