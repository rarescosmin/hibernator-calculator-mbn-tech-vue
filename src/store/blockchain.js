import Web3 from 'web3';
import HibernationCalculatorContractInterface from '../../blockchain/build/contracts/HibernationCalculator.json';

/**
 * get contract object
 */
const getContract = () => {
    const web3 = new Web3(process.env.VUE_APP_WEB3_PROVIDER);
    const contract = new web3.eth.Contract(HibernationCalculatorContractInterface.abi, process.env.VUE_APP_WEB3_CONTRACT_ADDRESS);
    return contract;
};

/**
 * get animal UUIDs from contract
 * @param {*} contract 
 */
const getAnimalUUIds = async (contract) => {
    const animalUUIDs = await contract.methods.getAnimalUUIDs().call({ from: process.env.VUE_APP_WEB3_ACCOUNT }, (err, result) => {

        if (err) {
            alert('Failed to fetch animal uuids');
        }

        return result;
    });

    return animalUUIDs;
};

/**
 * get animal hibernation information by uuid from contract
 * @param {*} contract 
 * @param {*} uuid 
 * @returns 
 */
const getAnimalByUUID = async (contract, uuid) => {
    const animal = await contract.methods.animals(uuid).call( { from: process.env.VUE_APP_WEB3_ACCOUNT }, (err, result) => { 
        return (({ uuid, weight, length, result, min, avg, max }) => ({ uuid, weight, length, result, min, avg, max }))(result);
    });

    console.debug('animal obtained by UUID');
    console.debug(animal);
    
    return animal;
};

/**
 * get animal hibernation information array from blockchain to be rendered on application load
 */
export const getAnimals = async () => {

    // get HibernationCalculator contract //
    const contract = getContract();
    console.debug('contract obtained');
    console.debug(contract);

    // get array containing animal UUIDs from contract //
    const animalUUIDs = await getAnimalUUIds(contract);
    console.debug('animal UUIDs obtained');
    console.debug(animalUUIDs);

    const animals = [];

    for (const [indexKey, uuid] of animalUUIDs.entries()) {
        const animal = await getAnimalByUUID(contract, uuid);
        animals.push({...animal, indexKey});
    }

    console.log('animals array obtained');
    console.log(animals);

    return animals;

};