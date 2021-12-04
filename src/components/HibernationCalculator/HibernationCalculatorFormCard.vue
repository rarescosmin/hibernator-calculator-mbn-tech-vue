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
            <button 
                class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" 
                type="submit" 
                id="defaultSubmit" 
                @click="computeButtonHandler">
                COMPUTE
            </button>
        </form>
    </div>
</template>

<script>

export default {
    name: 'HibernationCalculatorFormCard',
    props: {
        computeButtonHandler: {
            type: Function
        }
    }
}
</script>
