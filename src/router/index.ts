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
      notAuthenticated: true // 不需要权限的页面，默认没有改属性即需要权限
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
        path: '/role/:id/alloc-menu',
        name: 'allocMenu',
        component: () => import(/* webpackChunkName: 'alloc-menu' */'@/views/role/allocMenu.vue'),
        props: true // 路由参数映射
      },
      {
        path: '/role/:id/assets-menu',
        name: 'assetsMenu',
        component: () => import(/* webpackChunkName: 'assets-menu' */'@/views/role/assetsMenu.vue'),
        props: true // 路由参数映射
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */'@/views/menu/index.vue')
      },
      {
        path: '/menu-add',
        name: 'menuAdd',
        component: () => import(/* webpackChunkName: 'menu' */'@/views/menu/add.vue')
      },
      {
        path: '/menu-edit',
        name: 'menuEdit',
        component: () => import(/* webpackChunkName: 'menu' */'@/views/menu/edit.vue')
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
        path: '/course-create',
        name: 'courseCreate',
        component: () => import(/* webpackChunkName: 'courseCreate' */'@/views/course/created.vue')
      },
      {
        path: 'course/:id/course-edit',
        name: 'courseEdit',
        component: () => import(/* webpackChunkName: 'courseEdit' */'@/views/course/edit.vue'),
        props: true
      },
      {
        path: 'course/:id/section',
        name: 'courseSection',
        component: () => import(/* webpackChunkName: 'courseSection' */'@/views/course/section.vue'),
        props: true
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
      notAuthenticated: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const { state } = store
  if (!to.meta?.notAuthenticated && !state.user) {
    return next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    })
  }
  next()
})

export default router
