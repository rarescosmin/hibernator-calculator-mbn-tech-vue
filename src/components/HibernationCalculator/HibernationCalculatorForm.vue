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
                                v-model="shellLength" 
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
                                v-model="weight"
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
    <div v-show="displayResultCard">
        <div class="row" style="margin-top: 2em;">
            <div class="col-2"></div>
            <div class="col-8">
                <div id="defaultResult" class="card text-white text-center mb-3 result-post-hidden" style="max-width: 20rem;">
                    <div class="card-header"><span id="resultLength"></span>cm | <span id="resultWeight"></span>g</div>
                    <div class="card-body">
                        <h5 class="card-title" id="resultValid"></h5>
                    </div>
                </div>
            </div>
	    </div>
        <button 
            class="btn btn-outline-warning btn-rounded btn-block my-4 waves-effect z-depth-0 result-post-hidden" 
            type="button" 
            id="defaultReset" 
            @click="onReset">
            Reset
        </button>
    </div>
    
</template>

<script>
export default {
    name: 'HibernationCalculatorForm',
    methods: {
        onCompute(event) {
            event.preventDefault();

            if (!this.shellLength || !this.weight) {
                alert('Shell Length and Animal Weight can not be empty');
                return
            }

            this.displayResultCard = true;
            this.$emit('compute');
        },
        onReset(event) {
            event.preventDefault();
            this.displayResultCard = false;
            this.shellLength = null;
            this.weight = null;
        }
    },
    data() {
        return {
            displayResultCard: false,
            shellLength: null,
            weight: null
        }
    },
    emits: ['compute', 'reset']
}
</script>
