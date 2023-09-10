<template>
    <div class ="modification">
        <div class = "options">
            <div class = "mod" @click="modifyPost">
                <div class = "icon">
                    <i class="fi fi-rr-pencil"></i>
                </div>
            </div>
            <div class = "delete" @click="deletePost">
                <div class ="icon">
                    <i class="fi fi-rs-trash"></i>
                </div>
            </div>
        </div>
    </div>

</template>
<script setup>
import axios from 'axios';
import { defineEmits } from 'vue';

const emit = defineEmits(["closeMod"]);

const deletePost = () => {
    emit('closeMod');
}
const modifyPost = () => {
    emit('closeMod');
}
</script>
<style scoped>
.modification{
    position: absolute;
    left: 10px;
    top: 1px;
    z-index: 3;
    width: 60px;
}
.mod,
.delete{
    float: right;
    border: 1px solid #3772FF;
    width: 45px;
    height: 45px;
    border-radius: 100%;
    line-height: 45px;
    background-color: #3772FF;
    color: white;
}
.delete{
    margin-top: 10px;
}
.icon{
    margin-top: 2px;
    font-size: 16px;
}
.mod:hover,
.delete:hover{
    background-color: #215DEB;
    border: 1px solid #215DEB;
}
</style>