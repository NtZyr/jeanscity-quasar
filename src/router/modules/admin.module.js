export const admin = [
  {
    name: 'auth.login',
    path: '/login',
    component: () => import('pages/admin/login')
  },
  {
    path: '/admin',
    component: () => import('pages/admin/Admin.vue'),
    meta: {
      auth: true
    },
    children: [
      {
        path: 'orders',
        component: () => import('pages/admin/order/index'),
        children: [
          {
            path: 'new',
            component: () => import('pages/admin/order/form')
          },
          {
            path: 'edit/:id',
            component: () => import('pages/admin/order/form')
          }
        ]
      },
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
        path: 'homepage',
        component: () => import('pages/admin/homepage/index'),
        children: [
          {
            path: 'slider',
            component: () => import('pages/admin/homepage/slider/index'),
            children: [
              {
                path: 'new',
                component: () => import('pages/admin/homepage/slider/form')
              },
              {
                path: 'edit/:id',
                component: () => import('pages/admin/homepage/slider/form')
              }
            ]
          }
        ]
      },
      {
        path: 'attributes',
        component: () => import('pages/admin/attribute/index'),
        children: [
          {
            path: 'new',
            component: () => import('pages/admin/attribute/form')
          },
          {
            path: 'edit/:id',
            component: () => import('pages/admin/attribute/form')
          }
        ]
      },
      {
        path: 'shippings',
        component: () => import('pages/admin/shipping/index'),
        children: [
          {
            path: 'new',
            component: () => import('pages/admin/shipping/form')
          },
          {
            path: 'edit/:id',
            component: () => import('pages/admin/shipping/form')
          }
        ]
      },
      {
        path: 'mails',
        component: () => import('pages/admin/mail/index'),
        children: [
          {
            path: 'new',
            component: () => import('pages/admin/mail/form')
          },
          {
            path: 'edit/:id',
            component: () => import('pages/admin/mail/form')
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
