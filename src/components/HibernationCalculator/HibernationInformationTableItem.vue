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
            @click="removeTableElement">
            <i class="fas fa-trash-alt"></i>
        </span>
    </td>
</template>


<script>
export default {
    name: 'HibernationInformationTableItem',
    props: {
        index: {
            type: Number
        },
        length: {
            type: Number
        },
        weight: {
            type: Number
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
        }
    }
}
</script>
