
const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: home,
  //   children: [
  //     {
  //       path: '/:pageId',
  //       name: 'page',
  //       component: page
  //     }
  //   ]
  // },
  // {
  //   path: '/products',
  //   name: 'products',
  //   component: products,
  //   children: [
  //     {
  //         path: '/products/:prodId',
  //         name: 'product',
  //         component: product
  //         // component: () => import ('pages/Product.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/cart',
  //   name: 'cart',
  //   component: cart
  // },
  // {
  //   path: '/contacts',
  //   name: 'contacts',
  //   component: contacts
  // }
    /*{
        path: '/',
        component: () => import('pages/Home.vue')
    },*/
    {
        path: '/',
        component: () => import('pages/ShoppingCart.vue'),
        children: [
            {
                path: 'product',
                component: () => import('pages/Product.vue')
            },
            {
                path: 'item',
                component: () => import('pages/Item.vue')
            }
        ]
        // children: [
        //   { path: '', component: () => import('pages/Index.vue') }
        // ]
    },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
