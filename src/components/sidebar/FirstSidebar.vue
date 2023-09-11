<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <span v-if="collapsed" 
      class="collapse-icon"
      @click="toggleSidebar">
      <i class="fi fi-rr-menu-burger" /> 
  
    </span>
    <span v-else
      class="collapse-icon"
      @click="toggleSidebar"
    >
      <i class="fi fi-rr-menu-burger" />
        <h1 class = "logo">Co<span>Work</span></h1>
    </span>

    <div class="margin-block"></div>
    <SidebarLink :to="dashboardUrl" icon="fi fi-rr-apps"><span class = "list">대시보드</span></SidebarLink>
    <SidebarLink :to="settingUrl" icon="fi fi-rs-settings"><span class = "list">설정</span></SidebarLink>


  </div>
</template>

<script>
import SidebarLink from './FirstSidebarLink'
import { collapsed, toggleSidebar, sidebarWidth } from './state'
import {computed} from 'vue'

export default {
  props: ['professorId'],
  components: { SidebarLink},
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth }
  },
  data() {
    return {
      dashboardUrl: computed(() => '/dashboard/professor/projects/' + this.professorId),
      settingUrl: computed(() => '/setting/' + this.professorId)
      // fileUrl: computed(() => '/board/list/11/' + this.teamId),
    }
  }
}
</script>

<style>
:root {
  --sidebar-bg-color: #F5F6FA;
  --sidebar-item-hover: #e7e7e7;
  --sidebar-item-active: #3772FF;
}
</style>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=REM:ital,wght@1,800&display=swap');

.sidebar {
  color: rgb(0, 0, 0);
  background-color: var(--sidebar-bg-color);

  float: left;
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;

  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
}
.logo{
  margin-left: 20px;
  padding: 10px;
  font-family: 'REM', sans-serif;

}
.logo span{
  color: #3772FF;
}
.sidebar span{
  top:0;
}
.margin-block{
  margin-top:2em;
}
.collapse-icon {
  display: flex;
  align-items: center;

  cursor: pointer;
  position: relative;
  font-weight: 400;
  user-select: none;

  margin: 0.3em 0;
  padding: 1em;
  height: 1.5em;

  text-decoration: none;
  padding: 1.3em;
  color: rgb(47, 47, 47);
  transition: 0.2s linear;

}
.list{
  margin-left: 20px;

}
i{
  margin-top: 6px;
  font-size : 18px;
}
</style>