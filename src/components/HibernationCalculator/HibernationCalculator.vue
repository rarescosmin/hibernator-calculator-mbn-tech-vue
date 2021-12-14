<template>
    <div class="row" style="margin-top: 4em;">
        <div class="col-1"></div>
        <HibernationCalculatorForm 
            @compute="computeButtonHandler" 
            :resultText="resultText"
            :resultWeight="resultWeight"
            :resultLength="resultLength"
            :resultTextStyle="resultTextStyle"/>
        <div class="col-1"></div>
        <HibernationInformationTable 
            @clear-all="clearAll"
            @remove-table-element="onRemoveTableElement"
            :hibernationInformationTableData="hibernationInformationTableData"/>
    </div>
</template>

<script>
import HibernationCalculatorForm from './HibernationCalculatorForm.vue';
import HibernationInformationTable from './HibernationInformationTable.vue';
import { turtleStore } from '../../store/store';
import { computeFactors, testos, resultStatusMapper } from '../../utils/utils';
import { getAnimals, addAnimal, clearAnimals, deleteAnimal } from '../../store/blockchain';

export default {
	name: "HibernationCalculator",
    components: {
        HibernationCalculatorForm,
        HibernationInformationTable
    },
    data() {
        return {
            resultText: '',
            resultWeight: null,
            resultLength: null,
            resultTextStyle: [],
            hibernationInformationTableData: []
        }
    },
    async created() {

        // console.debug('Attempting web3 object creation');
        // const web3 = new Web3(process.env.VUE_APP_WEB3_PROVIDER);
        // console.debug('Web3 object aquired');
        // console.dir(web3);

        // console.debug('Logging web3 accounts')
        // console.dir(web3.eth.getAccounts());

        // console.debug('Display current account balance');
        // await web3.eth.getBalance(process.env.VUE_APP_WEB3_ACCOUNT, (err, bal) => {
        //     console.debug(bal);
        // });

        // console.debug('Fetching contract...');
        // const contract = new web3.eth.Contract(HibernationCalculatorContractInterface.abi, process.env.VUE_APP_WEB3_CONTRACT_ADDRESS);
        // console.dir(contract);

        // console.debug('Fetching animal uuids');
        // const animalUUIDs = await contract.methods.getAnimalUUIDs().call({ from: process.env.VUE_APP_WEB3_ACCOUNT }, (err, result) => {

        //     if (err) {
        //         alert('Failed to fetch animal uuids');
        //     }

        //     return result;
        // });
        // console.debug(animalUUIDs);

        // console.debug('Fetching animals by uuid..');
        // animalUUIDs.forEach(async (uuid, indexKey) => {
        //     await contract.methods.animals(uuid).call( { from: process.env.VUE_APP_WEB3_ACCOUNT }, (err, result) => {
        //         if (err) {
        //             alert('Error getting animal by passing uuid');
        //         }

        //         const parsedResult = (({ uuid, weight, length, result, min, avg, max }) => ({ uuid, weight, length, result, min, avg, max }))(result);
        //         console.debug(parsedResult);
        //         this.hibernationInformationTableData.push({ ...parsedResult, indexKey });
        //     });
        // });

        // const contract = new web3.eth.Contract(HibernationCalculatorContractInterface.abi, "0x51C5aD37028081C792c6C88E48B371D6ff22390f");

        // console.log(contract.methods);
        
        // contract.methods.animalCount().call((err, result) => {
        //     console.log('result ' + result);
        // });

        // contract.methods.addAnimal(
        //     "3dfef05b-0b66-450c-a0c6-d3994866f6d5",
        //     BigInt(12000000000000000000),
        //     BigInt(11000000000000000000),
        //     3,
        //     BigInt(257658000000000000000),
        //     BigInt(303611000000000000000),
        //     BigInt(350494000000000000000)
        // ).send({
        //     from: "0x0ED75BE115c0D28b34A9E2a7EEB41eaCae3e078e",
        //     gas: 3000000
        // }).then(receipt => {
        //     console.log(receipt.events.AnimalAdded);
        // })

        // contract.methods.animalCount().call((err, result) => {
        //     console.log('result ' + result);
        // });

        // turtleStore.syncFromLocalStorage();
        // const measurements = turtleStore.measurements();

        // if (Object.keys(measurements).length > 0) {
        //     Object.keys(measurements).forEach((item, indexKey) => {
        //         this.hibernationInformationTableData.push({ ...measurements[item], indexKey });
        //     });
        // }

        this.hibernationInformationTableData = await getAnimals();
    },
	methods: {
		async computeButtonHandler(animalInformation) {
            const length = animalInformation.length;
            const weight = animalInformation.weight;

            
            const { min, max, avg } = computeFactors(length);
            const result = testos(length, weight);

            this.resultText = resultStatusMapper[result].text;
            this.resultLength = length;
            this.resultWeight = weight;
            this.resultTextStyle = [resultStatusMapper[result].panel];

            const addedAnimal = await addAnimal(min, max, avg, result, length, weight);

            this.hibernationInformationTableData.push({...addedAnimal, indexKey: this.hibernationInformationTableData.length });
        },
        async clearAll() {
            if (this.hibernationInformationTableData.length > 0) {
                if (confirm('Are you sure you want to clear all measurements?\nThis action cannot be undone!')) {
                    await clearAnimals();
                    this.hibernationInformationTableData = [];
                }
            }
        },
        async onRemoveTableElement(uuid) {
            await deleteAnimal(uuid);
            this.hibernationInformationTableData = await getAnimals();
        },
        syncTableDataWithStore() {
            const measurements = turtleStore.measurements();
            this.hibernationInformationTableData = [];
            Object.keys(measurements).forEach((key, indexKey) => {
                this.hibernationInformationTableData.push({ ...measurements[key], indexKey });
            });
        }
	}
};
</script>
