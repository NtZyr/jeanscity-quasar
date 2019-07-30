export const admin = [
  {
    path: '/admin',
    component: () => import('pages/admin/Admin.vue'),
    meta: {
      isAuth: true
    },
    children: [
      {
        path: 'categories',
        component: () => import('pages/admin/category/index'),
        meta: {
          access: [
            'admin'
          ]
        },
        children: [
          {
            path: 'new',
            component: () => import('pages/admin/category/form')
          },
          {
            path: 'edit/:id',
            component: () => import('pages/admin/category/form')
          }
        ]
      },
      {
        path: 'callbacks',
        component: () => import('pages/admin/callback/index'),
        meta: {
          access: [
            'admin',
            'moder'
          ]
        },
        children: [
          {
            path: 'answer/:id',
            component: () => import('pages/admin/callback/form')
          }
        ]
      },
      {
        path: 'products',
        component: () => import('pages/admin/products/index'),
        meta: {
          access: 'admin'
        }
      },
      {
        path: 'users',
        component: () => import('pages/admin/user/index'),
        meta: {
          access: 'admin'
        },
        children: [
          {
            path: 'new',
            component: () => import('pages/admin/user/form')
          },
          {
            path: 'edit/:id',
            component: () => import('pages/admin/user/form')
          }
        ]
      }
    ]
  }
]
