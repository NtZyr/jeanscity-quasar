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
        path: 'products',
        component: () => import('pages/Products.vue'),
        beforeEnter: (to, from, next) => {
          next()
        },
        children: [
          {
            path: 'product/:product_slug',
            component: () => import('pages/Item.vue'),
            name: 'product',
            meta: {
              type: null,
              label: 'Футболка мужская'
            }
          },
          {
            path: ':parent?/:child?',
            name: 'catalog',
            component: () => import('pages/Catalog.vue')
          }
        ]
      },
      {
        path: 'cart',
        name: 'app.cart',
        component: () => import('pages/ShoppingCart.vue')
      },
      {
        path: '/contacts',
        component: () => import('pages/Contacts.vue')
      }
    ]
  }
]
