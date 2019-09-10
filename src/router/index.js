import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

import { getUser } from '../helpers/auth'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    // mode: 'history',
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')

    to.matched.filter(async route => {
      if (route.meta.auth === true && to.name === route.name) {
        if (token === null) {
          next('/login')
        }
        getUser()
          .then(response => {
            next()
          })
          .catch(errors => {
            localStorage.removeItem('token')
            next('/login')
          })
      }
    })

    next()
  })

  return Router
}
