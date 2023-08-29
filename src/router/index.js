import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Work from '../views/Work/Work.vue'

const routes = [
  {
    path: '/',
    redirect: '/work',
    name: 'Home',
    component: Home
  },
  {
    path: '/accounts',
    name: 'Account',
    component: () => import('../views/Account/Account.vue'),
    props: true,
    children: [
      {
        // /accounts/signin과 일치할 때
        path: 'signin', 
        name: 'SignIn',
        component: () => import('../views/Account/SignIn.vue'),
      },
      {
        // /accounts/signup과 일치할 때
        path: 'signup', 
        name: 'SignUp',
        component: () => import('../views/Account/SignUp.vue')
      }
    ]
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
    component: () => import('../views/File.vue'),
    props: true
  },
  {
    path: '/calendar/:teamId',
    name: 'Calendar',
    component: () => import('../views/Calendar.vue'),
    props: true
  },
  {
    path: '/chatting/:teamId',
    name: 'Chat',
    component: () => import('../views/Chat.vue'),
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