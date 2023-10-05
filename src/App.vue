<template>
  <div>
    <Sidebar v-if="['Account','SignIn','SignUp','CallBack','Das', 'DashboardPro1', 'DashboardPro2', 'DashboardStu', 'Setting1', 'Setting2'].includes($route.name)==false" :teamId="teamId" />
    <FirstSidebar v-if="['DashboardPro1', 'DashboardPro2', 'Setting1'].includes($route.name)==true" :professorId="professorId" />
    <SecondSidebar v-if="['DashboardStu1', 'DashboardStu2', 'Setting2'].includes($route.name)==true" :studentId="studentId" />
    <div v-if="['Account','SignIn','SignUp','CallBack'].includes($route.name)==false" :style="{ 'margin-left': sidebarWidth }">
      <HeaderDashboard v-if="['DashboardPro1', 'Setting1', 'DashboardStu1', 'DashboardStu2', 'Setting2'].includes($route.name)==true" :sidebarWidth = sidebarWidth></HeaderDashboard>
      <Header v-else :sidebarWidth = sidebarWidth></Header> 
      
      <router-view :teamId="teamId"></router-view> 
    </div>
    <div v-else>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Sidebar from '@/components/sidebar/Sidebar'
import FirstSidebar from '@/components/sidebar/FirstSidebar'
import SecondSidebar from '@/components/sidebar/SecondSidebar.vue'
import Header from '@/components/layout/Header'
import HeaderDashboard from '@/components/layout/HeaderDashboard.vue'
import { sidebarWidth } from '@/components/sidebar/state'

export default {
  components: { 
    Sidebar,
    Header,
    FirstSidebar,
    SecondSidebar,
    HeaderDashboard
  },
  setup() {
    return { sidebarWidth };
  },
  computed : {
    teamId() {
      return this.$route.params.teamId;
    },

    professorId() {
      return this.$route.params.professorId;
    },

    studentId() {
      return this.$route.params.studentId;
    }
  },

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