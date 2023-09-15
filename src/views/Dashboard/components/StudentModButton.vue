<template>
    <div v-if="moreButtonOpen" class="modification">
        <div class = "options">
            <div class = "mod" @click="modifyPost">
                <div class = "icon">
                    <i class="fi fi-rr-pencil"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue';

const emit = defineEmits([ "updateProject", "closeMod"]);
const props = defineProps({
    moreButtonOpen: {
        type: Boolean
    }
})

const modifyPost = () => {
    emit('updateProject');
    props.moreButtonOpen = false;
    console.log("mod");
}

</script>
<style scoped>
.modification{
    position: absolute;
    z-index: 3;
    right: 0px;
    left: -5px;
    width: 50px;
    transition: all 1s;
}
.mod,
.delete{
    border: 1px solid #3772FF;
    width: 45px;
    height: 45px;
    border-radius: 100%;
    line-height: 45px;
    background-color: #3772FF;
    color: white;
}
.delete{
    border: 1px solid #ffebeb;
    background-color: #ffebeb;
    color: #e53535;
}
.mod{
    border: 1px solid #dfdfe6;
    background-color: #dfdfe6;
    color: #23262f;
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
    color: white;
}
.delete:hover{
    border: 1px solid #e53535;
    background-color: #e53535;
    color: white;
}
</style>