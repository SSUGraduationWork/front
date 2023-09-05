import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Work from '../views/Work/Work.vue'
import HomeView from '../views/File/HomeView.vue'
import WritePage from '../views/File/WritePage.vue'
import UpdatePage from '../views/File/UpdatePage.vue'
import BoardDetailPage from '../views/File/BoardDetailPage.vue'
import SideBarPage from '../views/File/SideBarPage.vue'


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
      },
      {
        path: 'oauth2/google/callback',
        name: 'CallBack',
        component: () => import('../views/Account/GoogleOAuthCallback')
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
    path: '/calendar',
    name: 'Calendar',
    component: () => import('../views/Calendar/mainCalendar.vue'),
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
  },
  {
    path: '/board/list/:memberId/:teamId',
    name: 'HomeView',
    component: HomeView,
    props: true, // 이 설정으로 동적 라우팅 파라미터를 컴포넌트의 props로 전달할 수 있습
  },
  {//글쓰기
    path: '/board/multiWrite/:memberId/:teamId/:workId?',
    name: 'WritePage',
    component: WritePage,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    props: true,
  },
  {//글 수정
    path: '/multiboard/update/:boardId/:memberId/:teamId/:workId?',
    name: 'UpdatePage',
    component: UpdatePage,
    props: true,
  },
  {
    path: '/board/view/:boardId/:memberId/:teamId',
    name: 'BoardDetailPage',
    component: BoardDetailPage,
    props: true,
  },
  {
    path: '/comment/:boardId/:writerId',
    name: 'SideBarPage',
    component: SideBarPage,
    props: true,
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router