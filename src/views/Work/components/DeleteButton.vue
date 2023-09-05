<template>
    <div class="delete" @click = "clickDelete">
        <i class="fi fi-rs-trash"></i>
    </div>
</template>
<script setup>
import { ref, defineProps } from 'vue';
import { axiosInstanceNode } from "../../../axios";

const emit = defineEmits(["deleteWork"])
const props = defineProps({
    workId : {
        type: Number,
        default: 0
    },
})
const clickDelete = () => {
    console.log("delete " + props.workId);
    axiosInstanceNode.delete(`/work/${props.workId}`)
        .then((res) => {
            console.log(res);
        })
    emit('deleteWork', props.workId);
};
</script>
<style scoped>
.delete{
    cursor: pointer;
    border: 1px solid #F5F6FA;
    width: 40px;
    height: 40px;
    border-radius: 50px;
    color:  #2F3545;
    background: #F5F6FA;
    font-size: 16px;
}
.delete:hover{
    color: #F5F6FA; 
    background: #2F3545;
}
.delete i {
    display: flex;
    margin-top: 12px;
    margin-left: 12px;
}
</style>