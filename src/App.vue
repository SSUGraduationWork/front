<template>
  <p>{{ name }}</p>
  <button class="btn btn-primary" v-on:click="updateName">Click</button>
</template>
 
<script>
import {ref} from 'vue';

export default {
  setup() {
    const name = ref('ParkSeoYeon');

    const updateName = () => {
      name.value = 'SeoYeon';
      console.log(name);
    }

    return {
      name, updateName
    }
  }
}
</script>

<!--style: CSS 코드 작성-->
<style>
  .name {
    color: grey;
  }
</style>
