<template>
    <!-- first div with empty class to be deleted -->
    <div class="">
        <div class="row" style="margin-top: 4em;">
            <div class="col-1" />
            <div class="col-4">
                <HibernationCalculator />
            </div>
        </div>
    </div>
</template>

<script>
import HibernationCalculator from './HibernationCalculator/HibernationCalculator.vue';

export default {
    name: 'Layout',
    components: {
    HibernationCalculator,
  },
}
</script>
