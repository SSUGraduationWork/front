<template>
    <div class ="modification">
        <div class = "options">
            <div class = "mod" @click="modifyPost(memberId, boardId,teamId)">
                <div class = "icon">
                    <i class="fi fi-rr-pencil"></i>
                </div>
            </div>
        </div>
    </div>

</template>
<script setup>
import { useRouter } from 'vue-router';
import { defineEmits, defineProps } from 'vue';

const router = useRouter();
const props = defineProps({
    boardId: {
        type: Number,
    },
    teamId: {
        type: Number
    }
})

const emit = defineEmits(["closeMod"]);

const modifyPost = () => {
    emit('closeMod');
    console.log(props.boardId);
    console.log(props.teamId)
    router.push({ name: 'UpdatePage', params: { boardId: props.boardId ,teamId: props.teamId} });
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
    border: 1px solid var(--sidebar-bg-color);
    width: 45px;
    height: 45px;
    border-radius: 100%;
    line-height: 45px;
    background-color: var(--sidebar-bg-color);
    color: #4F4F4F;
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
    background-color: #3772FF;
    border: 1px solid #3772FF;
    color: white;
}
</style>