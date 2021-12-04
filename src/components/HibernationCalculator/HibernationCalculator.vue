<template>
	<div class="row">
		<div class="col">
			<div class="card">
				<HibernationCalculatorTitleCard />
				<HibernationCalculatorFormCard :computeButtonHandler="computeButtonHandler"/>
			</div>
		</div>
	</div>
	<div v-show="displayResultCard">
		<HibernationCalculatorResultCard :resetButtonHandler="resetButtonHandler"/>
	</div>
</template>

<script>
import HibernationCalculatorTitleCard from './HibernationCalculatorTitleCard.vue';
import HibernationCalculatorFormCard from './HibernationCalculatorFormCard.vue';
import HibernationCalculatorResultCard from './HibernationCalculatorResultCard.vue';
import { computeHibernationResult } from './handlers/computeButtonHandler.js';
import { resetHibernationResult } from './handlers/resetButtonHandler.js';

export default {
	name: "HibernationCalculator",
	components: {
		HibernationCalculatorTitleCard,
		HibernationCalculatorFormCard,
		HibernationCalculatorResultCard
	},
	data() {
		return {
			displayResultCard: false
		}
	},
	methods: {
		computeButtonHandler() {
			this.displayResultCard = true;
			computeHibernationResult();
		},
		resetButtonHandler() {
			this.displayResultCard = false;
			resetHibernationResult();
		}
	}
};
</script>
