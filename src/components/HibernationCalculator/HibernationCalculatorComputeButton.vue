<template>
    <button 
        class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" 
        type="submit" id="defaultSubmit" 
        @click="computeButtonHandler()">
        {{ buttonText }}
    </button>
</template>

<script>
/**
 * Handler for the 'Compute' button 
 */
const computeButtonHandler = () => {
    console.log('clicked');
}

export default {
    name: 'HibernationCalculatorComputeButton',
    props: {
        buttonText: {
           type: String,
           default: 'COMPUTE'
        }
    },
    methods: {
        computeButtonHandler
    }
}
</script>
