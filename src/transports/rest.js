// Requirements

const request = require('request');


// Transport

class Rest {

    /**
     * Rest API
     */
    constructor(urls) {
        this.type = 'rest';
        this.urls = urls;
    }

    /**
     * Init
     * 
     */
    init() {
        return new Promise(resolve => resolve());
    }

    /**
     * Rest API send method
     */
    send(options) {

        const promise = new Promise((resolve, reject) => {

            request(options, (err, res, body) => {
                if (err) {
                    return reject(err);
                }
                return resolve(body);
            });
    
        });

        return promise;
    }
}

module.exports = Rest;