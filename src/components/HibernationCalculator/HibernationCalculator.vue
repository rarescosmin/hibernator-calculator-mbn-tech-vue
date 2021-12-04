<template>
    <div class="row" style="margin-top: 4em;">
        <div class="col-1"></div>
        <div class="col-4">
            <HibernationCalculatorForm @compute="computeButtonHandler"/>
        </div>
        <div class="col-1"></div>
        <HibernationInformationTable />
    </div>
</template>

<script>
import HibernationCalculatorForm from './HibernationCalculatorForm.vue';
import HibernationInformationTable from './HibernationInformationTable.vue';

export default {
	name: "HibernationCalculator",
    components: {
        HibernationCalculatorForm,
        HibernationInformationTable
    },
	methods: {
		computeButtonHandler() {
			console.log('compute event emitted!');
        }
	}
};
</script>
