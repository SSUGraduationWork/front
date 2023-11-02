<template>
    <div class="container">
        <div class = "loader-container">
            <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
        </div>
    </div>
</template>
<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  data () {
    return {
      color: '#3772FF',
      size: '18px',
    }
  },
  components: {
    PulseLoader,
  }
}
</script>
<style scoped>
.loader-container{
    line-height: 55vh;
}
</style>