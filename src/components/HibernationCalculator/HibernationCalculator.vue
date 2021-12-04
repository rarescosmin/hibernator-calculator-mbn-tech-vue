<template>
    <div class="row" style="margin-top: 4em;">
        <div class="col-1"></div>
        <div class="col-4">
            <HibernationCalculatorForm @compute="computeButtonHandler"/>
			<div v-show="displayResultCard">
				<HibernationCalculatorResult @reset="resetButtonHandler"/>
			</div>
        </div>
        <div class="col-1"></div>
        <HibernationInformationTable />
    </div>
</template>

<script>
import HibernationCalculatorResult from './HibernationCalculatorResult.vue';
import HibernationCalculatorForm from './HibernationCalculatorForm.vue';
import HibernationInformationTable from './HibernationInformationTable.vue';

export default {
	name: "HibernationCalculator",
    components: {
        HibernationCalculatorResult,
        HibernationCalculatorForm,
        HibernationInformationTable
    },
	data() {
		return {
			displayResultCard: false
		}
	},
	methods: {
		computeButtonHandler() {
			this.displayResultCard = true;
		},
		resetButtonHandler() {
			this.displayResultCard = false;
		}
	}
};
</script>
