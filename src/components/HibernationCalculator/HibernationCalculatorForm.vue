<template>
    <div class="row">
        <div class="col">
            <div class="card">
                <h5 class="card-header info-color white-text text-center py-4">
                    <strong>EMYS ORBICULARIS</strong> <br>
                    <strong>HIBERNATION CALCULATOR</strong>
                </h5>
                <div class="card-body px-lg-5 pt-0">
                    <form style="color: #757575;">
                        <div class="md-form">
                            <label for="defaultLength">Shell length (cm)</label>
                            <input 
								type="number" 
								step="0.001" 
								id="defaultLength" 
								class="form-control" 
								aria-label="Shell length (cm)" 
								required />
                        </div>
                        <div class="md-form">
                            <label for="defaultWeight">Weight before hibernation (g)</label>
                            <input 
							    type="number" 
								step="0.001" 
								id="defaultWeight" 
								class="form-control" 
								aria-label="Weight before hibernation (g)" 
								required />
                        </div>
                        <button 
							class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" 
							type="submit" 
							id="defaultSubmit" 
							@click="onCompute">
							Compute
						</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HibernationCalculatorForm',
    methods: {
        onCompute() {
            this.$emit('compute');
        }
    },
    emits: ['compute']
}
</script>
