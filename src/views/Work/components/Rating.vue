<template>
    <div class="card flex justify-content-center">
        <Rating v-model="value" :cancel="false" v-on:update:model-value="change" />
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { axiosInstance } from '../../../axios';

const props = defineProps({
    importance : {
        type: Number,
        default: 1
    },
    workId : {
        type: Number,
        default: 0
    },
    teamId : {
        type: Number,
        default: 0
    }
})

const value = ref(props.importance);

const change = () => {

    axiosInstance.post(`/work/${props.teamId}/${props.workId}/importance`, {importance: value.value})
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {

        });
}
</script>