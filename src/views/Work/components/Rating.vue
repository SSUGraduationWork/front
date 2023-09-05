<template>
    <div class="card flex justify-content-center">
        <Rating v-model="value" :cancel="false" v-on:update:model-value="change" />
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { axiosInstanceNode } from '../../../axios';

const props = defineProps({
    importance : {
        type: Number,
        default: 1
    },
    workId : {
        type: Number,
        default: 0
    }
})

const value = ref(props.importance);

const change = () => {
    console.log(value.value);
    axiosInstanceNode.patch(`/work/${props.workId}/importance`, {importance: value.value})
        .then((res) => {
            console.log(res);
        })
}
</script>