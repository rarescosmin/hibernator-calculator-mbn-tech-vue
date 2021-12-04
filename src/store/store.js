import { create_UUID } from '../utils/utils';

const turtleData = {
    measurements: {},
};

export const turtleStore = {
    add: data => {
        const uuid = create_UUID();
        data.uuid = uuid;

        turtleData.measurements[uuid] = data;
        turtleStore.syncToLocalStorage();

        const indexKey = Object.keys(turtleData.measurements).length - 1;
        const item = turtleData.measurements[uuid];

        return { item, indexKey };
    },

    remove: uuid => {
        delete turtleData.measurements[uuid];
        turtleStore.syncToLocalStorage();
    },

    clear: () => {
        turtleData.measurements = {};
        turtleStore.syncToLocalStorage();
    },

    syncToLocalStorage: () => {
        localStorage.setItem('measurements_data', JSON.stringify(turtleData.measurements));
    },

    syncFromLocalStorage: () => {
        let currentData = localStorage.getItem('measurements_data');
        if (!currentData) {
            return;
        }

        try {
            turtleData.measurements = JSON.parse(currentData);
        } catch (e) {
            console.log('[Store error]', e);
        }
    },

    measurements: () => {
        return turtleData.measurements;
    }
};