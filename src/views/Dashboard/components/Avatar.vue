<template>
    <div class="card flex justify-content-center">
        <AvatarGroup>
            <Avatar  v-for="i in n" :key = i image="https://cdn-icons-png.flaticon.com/128/149/149071.png" size="large" shape="circle" />
            <Avatar v-if = "rest>0" :label="restString" shape="circle" size="large" style="color: '#ffffff'" />
        </AvatarGroup>
    </div>
</template>

<script setup>
import {defineProps} from 'vue';

const props = defineProps({
    number : {
        type: Number
    }

})
let n = 0;
let rest = 0;
if(props.number > 3 ){
    n = 3;
    rest = props.number - n;
} else{
    n = props.number;
}
const restString = `+${rest}`;
</script>