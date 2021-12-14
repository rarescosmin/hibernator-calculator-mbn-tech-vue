<template>
    <th scope="row">{{ index + 1 }}</th>
    <td style="text-align: center">{{ length }}cm</td>
    <td style="text-align: center">{{ weight }}g</td>
    <td>
        <span :class="resultBadgeStyle">{{ resultText }}</span>
    </td>
    <td>{{ min }}</td>
    <td>{{ avg }}</td>
    <td>{{ max }}</td>
    <td>
        <span
            style="color: red"
            @click="onRemoveElement">
            <i class="fas fa-trash-alt" style="cursor: pointer"></i>
        </span>
    </td>
</template>


<script>
export default {
    name: 'HibernationInformationTableItem',
    methods: {
        onRemoveElement() {
            this.$emit('remove-table-element', this.uuid);
        }
    },
    emits: ['remove-table-element'],
    props: {
        index: {
            type: Number
        },
        length: {
            type: String
        },
        weight: {
            type: String
        },
        resultBadgeStyle: {
            type: Array
        },
        resultText: {
            type: String
        },
        min: {
            type: String
        },
        avg: {
            type: String
        },
        max: {
            type: String
        },
        removeTableElement: {
            type: Function
        },
        uuid: {
            type: String
        }
    }
}
</script>
