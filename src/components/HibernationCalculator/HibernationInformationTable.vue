<template>
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
                                <th scope="col"><span style="color: black" @click="onClearAll"><i class="fas fa-trash-alt"></i></span></th>
                            </tr>
                        </thead>
                        <tbody id="defaultResultsTableBody"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HibernationInformationTable.vue',
    methods: {
        onClearAll() {
            this.$emit('clear-all');
        }
    }
}
</script>
