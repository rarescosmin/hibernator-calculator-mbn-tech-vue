<template>
	<div>
        <div class="row" style="margin-top: 4em;">
            <div class="col-1">
            </div>
            <div class="col-4">
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
										@click="computeButtonHandler">
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
						@click="resetButtonHandler">
						Reset
					</button>
				</div>
            </div>
            <div class="col-1"></div>
            <div class="col-6" style="border-left: 1px dashed #333">
                <h4 style="text-align: center">Your computed results will appear here!</h4>
                <div class="row" style="margin-top: 2em">
                    <div class="col">
                        <div class="table-wrapper-scroll-y my-custom-scrollbar">
                            <table class="table table-striped mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Length</th>
                                        <th scope="col">Weight</th>
                                        <th scope="col">Result</th>
                                        <th scope="col">Min (g)</th>
                                        <th scope="col">Avg (g)</th>
                                        <th scope="col">Max (g)</th>
                                        <th scope="col"><span style="color: black" onclick="clearAll()"><i class="fas fa-trash-alt"></i></span></th>
                                    </tr>
                                </thead>
                                <tbody id="defaultResultsTableBody"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
	name: "HibernationCalculator",
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
