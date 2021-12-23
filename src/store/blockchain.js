import Web3 from 'web3';
import HibernationCalculatorContractInterface from '../../blockchain/build/contracts/HibernationCalculator.json';
import { create_UUID, ethToWei } from '../utils/utils';

let contractObject = null;

/**
 * get contract object
 */
const getContract = async () => {
    if (!contractObject) {
        const web3 = new Web3(window.ethereum);
        const netId = await web3.eth.net.getId()
        const web3Contract = new web3.eth.Contract(HibernationCalculatorContractInterface.abi, HibernationCalculatorContractInterface.networks[netId].address);
        contractObject = web3Contract;
    }

    return contractObject;
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
 * get animal hibernation information array from blockchain to be rendered on application load
 */
export const getAnimals = async () => {

    // get HibernationCalculator contract //
    const contract = await getContract();
    console.debug('contract obtained');
    console.debug(contract);
   
    const animals = await contract.methods.getAnimals().call( { from: process.env.VUE_APP_WEB3_ACCOUNT }, (err, result) => {
        
        if (err) {
            alert('Failed to fetch animals');
            return [];
        }

        return result;
    });

    const parsedAnimals = [];

    for (const [indexKey, animal] of animals.entries()) {
        const parsedAnimal = (({ uuid, weight, shellLength, result, min, avg, max }) => ({ uuid, weight, shellLength, result, min, avg, max }))(animal); 
        parsedAnimals.push({ ...parsedAnimal, indexKey });
    }
        
    return parsedAnimals;
};

export const addAnimal = async (min, max, avg, result, shellLength, weight) => {
    console.debug('adding animal');

    // get HibernationCalculator contract //
    const contract = await getContract();
    console.debug('contract obtained');
    console.debug(contract);

    const addedAnimal = await contract.methods.addAnimal(
        create_UUID(),
        ethToWei(shellLength),
        ethToWei(weight),
        result,
        ethToWei(min),
        ethToWei(avg),
        ethToWei(max)
    ).send({
        from: process.env.VUE_APP_WEB3_ACCOUNT,
        gas: 3000000
    }).then(response => {
        console.debug('animal Added');
        console.debug(response.events.AnimalAdded);
        const animal = response.events.AnimalAdded.returnValues;
        
        const parsedAnimal = (({ uuid, weight, shellLength, result, min, avg, max }) => ({ uuid, weight, shellLength, result, min, avg, max }))(animal);
        console.debug('parsed added animal');
        console.debug(parsedAnimal);
        return parsedAnimal;
    });

    console.debug('animal to add');
    console.debug(addedAnimal);
    return addedAnimal;
};

export const clearAnimals = async () => {
    // get HibernationCalculator contract //
    const contract = await getContract();
    console.debug('contract obtained');
    console.debug(contract);

    // await contract.methods.clearAnimals()
    // .send({ 
    //     from: process.env.VUE_APP_WEB3_ACCOUNT,
    //     gas: 3000000 
    // })
    // .then(response => {
    //     console.debug('animals cleared');
    //     console.debug(response);
    // });

    const animalUUIDs = await contract.methods.getAnimalUUIDs().call( { from: process.env.VUE_APP_WEB3_ACCOUNT }, (err, result) => {
        
        if (err) {
            alert('Failed to fetch animals');
            return [];
        }

        return result;
    });

    for (const uuid of animalUUIDs) {
        await deleteAnimal(uuid);
    }

    console.log('animalUUIDs are');
    console.log(animalUUIDs);


};

export const deleteAnimal = async (uuid) => {
    // get HibernationCalculator contract //
    const contract = await getContract();
    console.debug('contract obtained');
    console.debug(contract);

    await contract.methods.deleteAnimalByUUID(uuid)
    .send({
        from: process.env.VUE_APP_WEB3_ACCOUNT,
        gas: 3000000
    })
    .then(response => {
        console.debug('animal deleted');
        console.debug(response);
    });
};