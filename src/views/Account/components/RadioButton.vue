<template>
    <div class="role-container">
        <span>직업 : </span>
        <div class="flex flex-wrap gap-3">
            <div class="role">
                <RadioButton v-model="selectedRole" inputId="role1" value="교수" @update:modelValue="$emit('selectedRole', selectedRole)" />
                <label for="role1" class="ml-2">교수</label>
            </div>
            <div class="role">
                <RadioButton v-model="selectedRole" inputId="role2" value="학생" @update:modelValue="$emit('selectedRole', selectedRole)"/>
                <label for="role2" class="ml-2">학생</label>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedRole = ref('');

</script>
<style scoped>
.role-container{
    margin-left: 3px;
    width: 300px;
    height: 20px;
    margin-bottom: 50px;
}
span{
    float: left;
    font-weight: 600;
}
.role{
    float: left;
    margin-bottom: 60px;
    margin-left: 30px;
}
label{
    cursor: pointer;
    font-weight: 600;
    margin-left: 15px;
}

</style>