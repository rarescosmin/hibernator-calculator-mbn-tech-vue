<template>
    <h5 class="card-header info-color white-text text-center py-4">
        <strong>{{ animalSpecies }}</strong> <br>
        <strong>HIBERNATION CALCULATOR</strong>
    </h5>
</template>

<script>
export default {
    name: 'HibernationCalculatorTitleCard',
    props: {
        animalSpecies: {
            type: String,
            default: 'EMYS ORBICULARIS'
        }
    }
}
</script>
