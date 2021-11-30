<template>
    <h5 class="card-header info-color white-text text-center py-4">
        <strong>{{ firstTitle }}</strong> <br>
        <strong>{{ secondTitle }}</strong>
    </h5>
</template>

<script>
export default {
    name: 'HibernationCalculatorCardTitle',
    props: {
        firstTitle: String,
        secondTitle: String
    }
}
</script>
