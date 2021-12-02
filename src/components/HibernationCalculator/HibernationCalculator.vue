<template>
	<div class="row">
		<div class="col">
			<div class="card">
				<HibernationCalculatorTitleCard />
				<HibernationCalculatorFormCard />
			</div>
		</div>
	</div>
	<div>
		<HibernationCalculatorResultCard />
	</div>
</template>

<script>
import HibernationCalculatorTitleCard from './HibernationCalculatorTitleCard.vue';
import HibernationCalculatorFormCard from './HibernationCalculatorFormCard.vue';
import HibernationCalculatorResultCard from './HibernationCalculatorResultCard.vue';

export default {
	name: "HibernationCalculator",
	components: {
		HibernationCalculatorTitleCard,
		HibernationCalculatorFormCard,
		HibernationCalculatorResultCard
	}
};
</script>
