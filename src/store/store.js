import { create_UUID } from '../utils/utils';
import Web3 from 'web3';
import HibernationCalculatorContractInterface from '../../blockchain/build/contracts/HibernationCalculator.json';

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

    getHibernationContract: () => {
        console.debug('Attempting web3 object creation');
        const web3 = new Web3(process.env.VUE_APP_WEB3_PROVIDER);
        console.debug('Web3 object aquired');
        console.dir(web3);

        console.debug('Fetching contract...');
        const contract = new web3.eth.Contract(HibernationCalculatorContractInterface.abi, process.env.VUE_APP_WEB3_CONTRACT_ADDRESS);
        console.dir(contract);

        return contract;
    },

    syncFromBlockChain: () => {
        const contract = turtleStore.getHibernationContract();

        console.debug('Fetching animal uuids');
        const animalUUIDs = contract.methods.getAnimalUUIDs().call({ from: process.env.VUE_APP_WEB3_ACCOUNT }, (err, result) => {

            if (err) {
                alert('Failed to fetch animal uuids');
            }

            return result;
        });
        console.debug(animalUUIDs);

        console.debug('Fetching animals by uuid..');
        const animals = [];
        
        animalUUIDs.forEach( (uuid, indexKey) => {
            contract.methods.animals(uuid).call( { from: process.env.VUE_APP_WEB3_ACCOUNT }, (err, result) => { 
                const parsedResult = (({ uuid, weight, length, result, min, avg, max }) => ({ uuid, weight, length, result, min, avg, max }))(result);
                console.debug('parsed result');
                console.debug(parsedResult);
                animals.push({ ...parsedResult, indexKey });
            });
        });

        console.debug('animals');
        console.debug(animals);
        return animals;
    },

    

    measurements: () => {
        return turtleData.measurements;
    }
};