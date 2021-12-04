<template>
    <div class="row" style="margin-top: 2em;">
        <div class="col-2"></div>
        <div class="col-8">
            <div id="defaultResult" class="card text-white text-center mb-3 result-post-hidden" style="max-width: 20rem;">
                <div class="card-header">
                    <span id="resultLength"></span>cm | <span id="resultWeight"></span>g
                </div>
                <div class="card-body">
                    <h5 class="card-title" id="resultValid"></h5>
                </div>
            </div>
        </div>
    </div>
    <button 
        class="btn btn-outline-warning btn-rounded btn-block my-4 waves-effect z-depth-0 result-post-hidden" 
        type="button"
        @click="resetButtonHandler" 
        id="defaultReset">
        Reset
    </button>
</template>

<script>
export default {
    name: 'HibernationCalculatorResultCard',
    props: {
        resetButtonHandler: {
            type: Function
        }
    }
}
</script>

