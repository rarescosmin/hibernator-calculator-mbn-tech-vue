<template>
    <div class="">
        <div class="row" style="margin-top: 4em;">
            <div class="col-1">
            </div>
            <HibernationCalculator />
        </div>
    </div>
</template>

<script>
import HibernationCalculator from './HibernationCalculator.vue';

export default {
    name: 'Layout',
    components: {
    HibernationCalculator,
  },
}
</script>
