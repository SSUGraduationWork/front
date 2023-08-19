<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <span v-if="collapsed" 
      class="collapse-icon"
      @click="toggleSidebar">
      <i class="fas fa-bars" /> 
  
    </span>
    <span v-else
      class="collapse-icon"
      @click="toggleSidebar"
    >
      <i class="fas fa-bars" />
        <h1 class = "logo">Co<span>Work</span></h1>
    </span>

    <div class="margin-block"></div>
    <SidebarLink :to="workUrl" icon="fas fa-rectangle-list" class = "sidebar-name">작업</SidebarLink>
    <SidebarLink :to="fileUrl" icon="fas fa-file-lines">파일</SidebarLink>
    <SidebarLink :to="calendarUrl" icon="fas fa-calendar-days">달력</SidebarLink>
    <SidebarLink :to="chattingUrl" icon="fas fa-comment-dots">채팅</SidebarLink>
    <SidebarLink :to="contributionUrl" icon="fas fa-chart-bar">기여도</SidebarLink>
</div>
</template>

<script>
import SidebarLink from './SidebarLink'
import { collapsed, toggleSidebar, sidebarWidth } from './state'
import {computed} from 'vue'

export default {
  props: ['teamId'],
  components: { SidebarLink},
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth }
  },
  data() {
    return {
      workUrl: computed(() => '/work/' + this.teamId),
      fileUrl: computed(() => '/file/' + this.teamId),
      calendarUrl: computed(() => '/calendar/' + this.teamId),
      chattingUrl: computed(() => '/chatting/' + this.teamId),
      contributionUrl: computed(() => '/contribution/' + this.teamId)
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
@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;600;700&display=swap');

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
</style>