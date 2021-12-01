<template>
    <div class="card-body px-lg-5 pt-0">
        <form style="color: #757575;">
            <div class="md-form">
                <label for="defaultLength">Shell length (cm)</label>
                <input type="number" step="0.001" id="defaultLength" class="form-control" aria-label="Shell length (cm)" required />
            </div>
            <div class="md-form">
                <label for="defaultWeight">Weight before hibernation (g)</label>
                <input type="number" step="0.001" id="defaultWeight" class="form-control" aria-label="Weight before hibernation (g)" required />
            </div>
            <HibernationCalculatorComputeButton />
        </form>
    </div>
</template>

<script>
import HibernationCalculatorComputeButton from './HibernationCalculatorComputeButton.vue';


export default {
    name: 'HibernationCalculatorCardBody',
    components: {
        HibernationCalculatorComputeButton
    }
}
</script>
