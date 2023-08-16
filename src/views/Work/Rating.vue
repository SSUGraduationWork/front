<template>
    <div class="card flex justify-content-center">
        <Rating v-model="value" :cancel="false"  />
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
    importance : Number,
})

const value = ref(props.importance);
</script>