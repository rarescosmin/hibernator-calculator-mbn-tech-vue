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
        this.hibernationInformationTableData = await getAnimals();
    },
	methods: {
		async computeButtonHandler(animalInformation) {
            const shellLength = animalInformation.shellLength;
            const weight = animalInformation.weight;

            
            const { min, max, avg } = computeFactors(shellLength);
            const result = testos(length, weight);

            this.resultText = resultStatusMapper[result].text;
            this.resultLength = shellLength;
            this.resultWeight = weight;
            this.resultTextStyle = [resultStatusMapper[result].panel];

            await addAnimal(min, max, avg, result, shellLength, weight);

            this.hibernationInformationTableData = await getAnimals();
        },
        async clearAll() {
            if (this.hibernationInformationTableData.length > 0) {
                if (confirm('Are you sure you want to clear all measurements?\nThis action cannot be undone!')) {
                    await clearAnimals();
                    this.hibernationInformationTableData = await getAnimals();
                }
            }
        },
        async onRemoveTableElement(uuid) {
            await deleteAnimal(uuid);
            this.hibernationInformationTableData = await getAnimals();
        }
	}
};
</script>
