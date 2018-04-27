const randomString = require(`randomstring`);
const chai = require(`chai`);
const assert = chai.assert;
const config = require('../config');
const DeviceHive = require('../../../index');
const DeviceType = DeviceHive.models.DeviceType;
const DeviceTypeListQuery = DeviceHive.models.query.DeviceTypeListQuery;
const DeviceTypeCountQuery = DeviceHive.models.query.DeviceTypeCountQuery;
const DeviceTypeDeleteQuery = DeviceHive.models.query.DeviceTypeDeleteQuery;

const httpDeviceHive = new DeviceHive(config.server.http);
const wsDeviceHive = new DeviceHive(config.server.ws);


const TEST_DEVICE_TYPE_NAME_PREFIX = `DH-JS-LIB-DEVICE-TYPE-NAME-`;
const TEST_DEVICE_TYPE_DESCRIPTION_PREFIX = `DH-JS-LIB-DEVICE-TYPE-NAME-`;
const TEST_DEVICE_TYPES = {
    HTTP: {
        name: `${TEST_DEVICE_TYPE_NAME_PREFIX}${randomString.generate()}`,
        description: `${TEST_DEVICE_TYPE_DESCRIPTION_PREFIX}${randomString.generate()}`
    },
    WS: {
        name: `${TEST_DEVICE_TYPE_NAME_PREFIX}${randomString.generate()}`,
        description: `${TEST_DEVICE_TYPE_DESCRIPTION_PREFIX}${randomString.generate()}`
    }
};

describe('DeviceTypeAPI', () => {

    before(done => {
        Promise.all([httpDeviceHive.connect(), wsDeviceHive.connect()])
            .then(() => done());
    });

    it(`should insert new device type with next configuration: ${JSON.stringify(TEST_DEVICE_TYPES.HTTP)} via HTTP`, done => {
        const deviceTypeModel = new DeviceType(TEST_DEVICE_TYPES.HTTP);

        httpDeviceHive.deviceType.insert(deviceTypeModel)
            .then(({ id }) => {
                TEST_DEVICE_TYPES.HTTP.id = id;
                done();
            })
            .catch(done);
    });

    it(`should insert new device type with next configuration: ${JSON.stringify(TEST_DEVICE_TYPES.WS)} via WS`, done => {
        const deviceTypeModel = new DeviceType(TEST_DEVICE_TYPES.WS);

        wsDeviceHive.deviceType.insert(deviceTypeModel)
            .then(({ id }) => {
                TEST_DEVICE_TYPES.WS.id = id;
                done();
            })
            .catch(done);
    });

    it(`should list all device types with the next name pattern: ${TEST_DEVICE_TYPE_NAME_PREFIX}% via HTTP`, done => {
        const deviceTypeListQuery = new DeviceTypeListQuery({ namePattern: `${TEST_DEVICE_TYPE_NAME_PREFIX}%` });

        httpDeviceHive.deviceType.list(deviceTypeListQuery)
            .then(deviceTypes => {
                assert(deviceTypes.length, Object.keys(TEST_DEVICE_TYPES).length);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should list all device types with the next name pattern: ${TEST_DEVICE_TYPE_NAME_PREFIX}% via WS`, done => {
        const deviceTypeListQuery = new DeviceTypeListQuery({ namePattern: `${TEST_DEVICE_TYPE_NAME_PREFIX}%` });

        wsDeviceHive.deviceType.list(deviceTypeListQuery)
            .then(deviceTypes => {
                assert(deviceTypes.length, Object.keys(TEST_DEVICE_TYPES).length);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should get device type with name: ${TEST_DEVICE_TYPES.HTTP.name} via HTTP`, done => {
        httpDeviceHive.deviceType.get(TEST_DEVICE_TYPES.HTTP.id)
            .then(deviceType => {
                assert.equal(deviceType.id, TEST_DEVICE_TYPES.HTTP.id);
                assert.equal(deviceType.name, TEST_DEVICE_TYPES.HTTP.name);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should get device type with name: ${TEST_DEVICE_TYPES.WS.name} via WS`, done => {
        wsDeviceHive.deviceType.get(TEST_DEVICE_TYPES.WS.id)
            .then(deviceType => {
                assert.equal(deviceType.id, TEST_DEVICE_TYPES.WS.id);
                assert.equal(deviceType.name, TEST_DEVICE_TYPES.WS.name);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should update device type with name: ${TEST_DEVICE_TYPES.HTTP.name} via HTTP`, done => {
        TEST_DEVICE_TYPES.HTTP.description = `${TEST_DEVICE_TYPE_DESCRIPTION_PREFIX}-${randomString.generate()}`;

        const deviceTypeModel = new DeviceType(TEST_DEVICE_TYPES.HTTP);

        httpDeviceHive.deviceType.update(deviceTypeModel)
            .then(() => httpDeviceHive.deviceType.get(TEST_DEVICE_TYPES.HTTP.id))
            .then((deviceType) => {
                assert.equal(deviceType.description, TEST_DEVICE_TYPES.HTTP.description);
            })
            .then(() => done())
            .catch(done);

    });

    it(`should update device type with name: ${TEST_DEVICE_TYPES.WS.name} via WS`, done => {
        TEST_DEVICE_TYPES.WS.description = `${TEST_DEVICE_TYPE_DESCRIPTION_PREFIX}-${randomString.generate()}`;

        const deviceTypeModel = new DeviceType(TEST_DEVICE_TYPES.WS);

        wsDeviceHive.deviceType.update(deviceTypeModel)
            .then(() => wsDeviceHive.deviceType.get(TEST_DEVICE_TYPES.WS.id))
            .then((deviceType) => {
                assert.equal(deviceType.description, TEST_DEVICE_TYPES.WS.description);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should count device types with the next name pattern: ${TEST_DEVICE_TYPE_NAME_PREFIX}% via HTTP`, done => {
        const deviceTypeCountQuery = new DeviceTypeCountQuery({ namePattern: `${TEST_DEVICE_TYPE_NAME_PREFIX}%` });

        httpDeviceHive.deviceType.count(deviceTypeCountQuery)
            .then(({ count }) => {
                assert.equal(count, Object.keys(TEST_DEVICE_TYPES).length);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should count device types with the next name pattern: ${TEST_DEVICE_TYPE_NAME_PREFIX}% via WS`, done => {
        const deviceTypeCountQuery = new DeviceTypeCountQuery({ namePattern: `${TEST_DEVICE_TYPE_NAME_PREFIX}%` });

        wsDeviceHive.deviceType.count(deviceTypeCountQuery)
            .then(({ count }) => {
                assert.equal(count, Object.keys(TEST_DEVICE_TYPES).length);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should delete device type with name: ${TEST_DEVICE_TYPES.HTTP.name} via HTTP`, done => {
        const deviceTypeDeleteQuery = new DeviceTypeDeleteQuery({ deviceTypeId: TEST_DEVICE_TYPES.HTTP.id });
        httpDeviceHive.deviceType.delete(deviceTypeDeleteQuery)
            .then(() => done())
            .catch(done);
    });

    it(`should delete device type with name: ${TEST_DEVICE_TYPES.WS.name} via WS`, done => {
        const deviceTypeDeleteQuery = new DeviceTypeDeleteQuery({ deviceTypeId: TEST_DEVICE_TYPES.WS.id });
        wsDeviceHive.deviceType.delete(deviceTypeDeleteQuery)
            .then(() => done())
            .catch(done);
    });

    after(done => {
        httpDeviceHive.disconnect();
        wsDeviceHive.disconnect();

        done();
    });
});