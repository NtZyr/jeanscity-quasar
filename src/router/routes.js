import { front } from './modules/front.module'
import { admin } from './modules/admin.module'

const routes = [
  ...admin,
  ...front
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
