import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route-level code splitting
const createHelloView = () => import('../views/Hello.vue')
const createWorldView = () => import('../views/World.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/hello', component: createHelloView },
      { path: '/world', component: createWorldView },
      { path: '/', redirect: '/top' }
    ]
  })
}
