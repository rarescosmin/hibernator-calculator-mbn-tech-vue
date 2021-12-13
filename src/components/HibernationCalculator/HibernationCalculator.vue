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
import Web3 from 'web3';
import HibernationCalculatorContractInterface from '../../../blockchain/build/contracts/HibernationCalculator.json';

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
    created() {

        const web3 = new Web3('http://127.0.0.1:8545');
        console.log(web3.eth.accounts)
       
        web3.eth.getBalance("0x0ED75BE115c0D28b34A9E2a7EEB41eaCae3e078e", (err, bal) => {
            console.log(bal);
        });

        const contract = new web3.eth.Contract(HibernationCalculatorContractInterface.abi, "0x51C5aD37028081C792c6C88E48B371D6ff22390f");
        
        contract.methods.animalCount().call((err, result) => {
            console.log('result ' + result);
        });

        turtleStore.syncFromLocalStorage();
        const measurements = turtleStore.measurements();

        if (Object.keys(measurements).length > 0) {
            Object.keys(measurements).forEach((item, indexKey) => {
                this.hibernationInformationTableData.push({ ...measurements[item], indexKey });
            });
        }
    },
	methods: {
		computeButtonHandler(animalInformation) {
            const length = animalInformation.length;
            const weight = animalInformation.weight;

            
            const { min, max, avg } = computeFactors(length);
            const result = testos(length, weight);

            this.resultText = resultStatusMapper[result].text;
            this.resultLength = length;
            this.resultWeight = weight;
            this.resultTextStyle = [resultStatusMapper[result].panel];

            const { item, indexKey } = turtleStore.add({
                min, max, avg, result, length, weight,
            });

            this.hibernationInformationTableData.push({...item, indexKey });
        },
        clearAll() {
            if (Object.keys(turtleStore.measurements()).length > 0) {
                if (confirm('Are you sure you want to clear all measurements?\nThis action cannot be undone!')) {
                    turtleStore.clear();
                    this.hibernationInformationTableData = [];
                }
            }
        },
        onRemoveTableElement(uuid) {
            turtleStore.remove(uuid);
            this.syncTableDataWithStore();
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
