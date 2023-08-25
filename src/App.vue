<template>
  <div>
    <Sidebar :teamId="teamId" />
    <div :style="{ 'margin-left': sidebarWidth }">
      <Header />
      <router-view :teamId="teamId"></router-view> 
    </div>
  </div>
</template>
<script>
import Sidebar from '@/components/sidebar/Sidebar'
import Header from '@/components/layout/Header'
import { sidebarWidth } from '@/components/sidebar/state'
export default {
  components: { 
    Sidebar,
    Header
  },
  setup() {
    return { sidebarWidth }
  },
  computed : {
    teamId() {
      return this.$route.params.teamId;
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>