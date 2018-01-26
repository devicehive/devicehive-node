class API {

    static get INFO_TYPE() { return 'info'; }
    static get CONFIGURATION_TYPE() { return 'configuration'; }
    static get DEVICE_TYPE() { return 'device'; }
    static get DEVICECOMMAND_TYPE() { return 'command'; }
    static get DEVICENOTIFICATION_TYPE() { return 'notification'; }
    static get DEVICETYPE_TYPE() { return 'devicetype'; }
    static get NETWORK_TYPE() { return 'network'; }
    static get TOKEN_TYPE() { return 'token'; }
    static get USER_TYPE() { return 'user'; }

    /**
     * API
     */
    constructor({ strategy }) {
        this.send = data => {
            return strategy.send({
                apiType: this.type,
                nestedApiType: this.nestedType,
                ...data,
            });
        }
    }
}

module.exports = API;