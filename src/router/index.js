import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard/Dashboard.vue'
import Work from '../views/Work/Work.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/work/:teamId',
    name: 'Work',
    component: Work,
    props:true
  },
  {
    path: '/file/:teamId',
    name: 'File',
    component: () => import('../views/File/File.vue'),
    props: true
  },
  {
    path: '/calendar/:teamId',
    name: 'Calendar',
    component: () => import('../views/Calendar/Calendar.vue'),
    props: true
  },
  {
    path: '/chatting/:teamId',
    name: 'Chat',
    component: () => import('../views/Chat/Chat.vue'),
    props: true
  },
  {
    path: '/contribution/:teamId',
    name: 'Contribution',
    component: () => import('../views/Contribution/Contribution.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router