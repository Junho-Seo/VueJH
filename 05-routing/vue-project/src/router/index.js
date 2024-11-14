import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserView from '@/views/UserView.vue'
import UserPosts from '@/components/UserPosts.vue'
import UserProfile from '@/components/UserProfile.vue'
import LoginView from '@/views/LoginView.vue'

const isAuthenticated = true

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/user/:id',
      // name: 'user',
      component: UserView,
      children: [
        // 초기 렌더링 기능 (상위 name 삭제 후 아래 코드 작성; 예시는 초기 화면을 UserProfile로)
        { path: '', name: 'user', component: UserProfile},
        // routerLink에 직접 연결되지 않은 component 들은 components 폴더에 작성
        { path: 'profile', name: 'user-profile', component: UserProfile},
        { path: 'posts', name: 'user-posts', component: UserPosts},
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: (to, from) => {
        console.log(to)
        console.log(from)
        if (isAuthenticated === true) {
          console.log('이미 로그인 상태입니다.')
          return { name: 'home'}
        }
      }
    }
  ],
})

// 전역 가드
// router.beforeEach((to, from) => {
//   console.log(to)
//   console.log(from)
//   const isAuthenticated = false
//   // 로그인이 되어있지 않고, 이동하고자 하는 페이지가 login이 아니라면
//   if (!isAuthenticated && to.name !== 'login') {
//     console.log('로그인이 필요합니다.')
//     return { name: 'login' }
//   }
// })
export default router
