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
        const localStorage = JSON.parse(window.localStorage.getItem('measurements_data'));

        if (Object.keys(localStorage).length > 0) {
            Object.keys(localStorage).forEach((item, indexKey) => {
                console.log('logging key value pairs');
                console.log(indexKey, item, localStorage[item]);
                this.hibernationInformationTableData.push({ ...localStorage[item], indexKey });
            });
        }
    },
	methods: {
		computeButtonHandler(animalInformation) {
            const length = animalInformation.length;
            const weight = animalInformation.weight;

            
            let { min, max, avg } = computeFactors(length);
            let result = testos(length, weight);

            this.resultText = resultStatusMapper[result].text;
            this.resultLength = length;
            this.resultWeight = weight;
            this.resultTextStyle = [resultStatusMapper[result].panel];

            let { item, indexKey } = turtleStore.add({
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
            turtleStore.syncFromLocalStorage();
            const measurements = turtleStore.measurements();
            this.hibernationInformationTableData = [];
            Object.keys(measurements).forEach((key, indexKey) => {
                this.hibernationInformationTableData.push({ ...measurements[key], indexKey });
            });
        }
	}
};
</script>
