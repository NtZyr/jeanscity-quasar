export const front = [
  {
    path: '/',
    component: () => import('pages/Home.vue')
  },
  {
    path: '/products',
    component: () => import('pages/Menu.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/Product.vue')
      },
      {
        path: 'item',
        component: () => import('pages/Item.vue')
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
