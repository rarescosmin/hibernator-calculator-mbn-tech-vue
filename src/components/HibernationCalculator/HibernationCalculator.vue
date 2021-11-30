<template>
	<div class="row">
		<div class="col">
			<div class="card">
				<HibernationCalculatorCardTitle animalSpecies="EMYS ORBICULARIS" />
				<HibernationCalculatorCardBody />
			</div>
		</div>
	</div>
</template>

<script>
import HibernationCalculatorCardTitle from './HibernationCalculatorCardTitle.vue';
import HibernationCalculatorCardBody from './HibernationCalculatorCardBody.vue';

export default {
	name: "HibernationCalculator",
	components: {
		HibernationCalculatorCardTitle,
		HibernationCalculatorCardBody
	}
};
</script>
