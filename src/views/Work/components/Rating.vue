<template>
    <div class="card flex justify-content-center">
        <Rating :disabled="role == 'professor'" v-model="value" :cancel="false" v-on:update:model-value="change" />
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
    },
    role: {
        type: String,
        default: 'student'
    }
})

const value = ref(props.importance);

const change = () => {

    axiosInstance.patch(`/work-service/works/${props.teamId}/${props.workId}/importance`, {importance: value.value})
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {

        });
}
</script>