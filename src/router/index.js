import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WritePage from '../views/WritePage.vue'
import UpdatePage from '../views/UpdatePage.vue'
import BoardDetailPage from '../views/BoardDetailPage.vue'
import SideBarPage from '../views/SideBarPage.vue'
import AlarmPage from '../views/AlarmPage.vue'
const routes = [
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
    path: '/multiboard/update/:boardId/:memberId',
    name: 'UpdatePage',
    component: UpdatePage,
    props: true,
  },
  {
    path: '/board/view/:boardId/:memberId',
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
  {
    path: '/alarmList/view/:memberId',
    name: 'AlarmPage',
    component: AlarmPage,
    props: true,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
