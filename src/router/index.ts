import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '../layout/index.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [

  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login/index.vue'),
    meta: {
      notRequiresAuth: true // notRequiresAuth 登录页面权限检验， 默认没有notRequiresAuth需要检验
    }
  },
  {
    path: '/',
    name: 'home',
    component: Layout,
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */'@/views/home/index.vue')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */'@/views/role/index.vue')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */'@/views/menu/index.vue')
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */'@/views/resource/index.vue')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */'@/views/course/index.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */'@/views/user/index.vue')
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */'@/views/advert/index.vue')
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/advert-space/index.vue')
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: 'error' */'@/views/error-page/four.vue'),
    meta: {
      notRequiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta?.notRequiresAuth) {
    if (!store.state.user) {
      next({
        path: '/login',
        query: { // 登录成功跳回原来的页面
          redirect: to.fullPath
        }
      })
    }
  }
  next()
})

export default router
