export const front = [
  {
    path: '/',
    component: () => import('pages/Front.vue'),
    meta: {
      label: 'Главная'
    },
    children: [
      {
        path: '',
        component: () => import('pages/Home.vue')
      },
      {
        path: '/products',
        component: () => import('pages/Menu.vue'),
        meta: {
          label: 'Мужское'
        },
        children: [
          {
            path: '/',
            component: () => import('pages/Product.vue')
          },
          {
            path: 'item',
            component: () => import('pages/Item.vue'),
            meta: {
              type: null,
              label: 'Футболка мужская'
            }
          }
        ]
      },
      {
        path: '/cart',
        component: () => import('pages/ShoppingCart.vue')
      },
      {
        path: '/contacts',
        component: () => import('pages/Contacts.vue')
      }
    ]
  }
]
