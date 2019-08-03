export const admin = [
  {
    name: 'auth.login',
    path: '/login',
    component: () => import('pages/admin/Login.vue'),
    meta: {
      label: 'Страница входа'
    }
  },
  {
    name: 'admin.home',
    path: '/admin',
    component: () => import('pages/admin/Admin.vue'),
    meta: {
      auth: true,
      label: 'Панель администратора'
    },
    children: [
      {
        path: 'orders',
        component: () => import('pages/admin/order/Index.vue'),
        meta: {
          label: 'Заказы'
        },
        children: [
          {
            path: 'new',
            component: () => import('pages/admin/order/Form.vue'),
            meta: {
              label: 'Новый заказ'
            }
          },
          {
            path: 'edit/:id',
            component: () => import('pages/admin/order/Form.vue'),
            meta: {
              label: 'Редактирование заказа'
            }
          }
        ]
      },
      {
        path: 'categories',
        component: () => import('pages/admin/category/Index.vue'),
        meta: {
          label: 'Категории',
          access: [
            'admin'
          ]
        },
        children: [
          {
            path: 'new',
            component: () => import('pages/admin/category/Form.vue'),
            meta: {
              label: 'Создание категории'
            }
          },
          {
            path: 'edit/:id',
            component: () => import('pages/admin/category/Form.vue'),
            meta: {
              label: 'Редактирование категории'
            }
          }
        ]
      },
      {
        path: 'homepage',
        component: () => import('pages/admin/homepage/Index.vue'),
        meta: {
          label: 'Настройки главной страницы'
        },
        children: [
          {
            path: 'slider',
            component: () => import('pages/admin/homepage/slider/Index.vue'),
            meta: {
              label: 'Слайдер'
            },
            children: [
              {
                path: 'new',
                component: () => import('pages/admin/homepage/slider/Form.vue')
              },
              {
                path: 'edit/:id',
                component: () => import('pages/admin/homepage/slider/Form.vue')
              }
            ]
          }
        ]
      },
      {
        path: 'attributes',
        component: () => import('pages/admin/attribute/Index.vue'),
        meta: {
          label: 'Атрибуты товаров'
        },
        children: [
          {
            path: 'new',
            component: () => import('pages/admin/attribute/Form.vue'),
            meta: {
              label: 'Создать атрибут'
            }
          },
          {
            path: 'edit/:id',
            component: () => import('pages/admin/attribute/Form.vue'),
            meta: {
              label: 'Редактировать атрибут'
            }
          }
        ]
      },
      {
        path: 'shippings',
        component: () => import('pages/admin/shipping/Index.vue'),
        meta: {
          label: 'Методы доставки'
        },
        children: [
          {
            path: 'new',
            component: () => import('pages/admin/shipping/Form.vue'),
            meta: {
              label: 'Создать метод доставки'
            }
          },
          {
            path: 'edit/:id',
            component: () => import('pages/admin/shipping/Form.vue'),
            meta: {
              label: 'Редактировать метод доставки'
            }
          }
        ]
      },
      {
        path: 'mails',
        component: () => import('pages/admin/mail/Index.vue'),
        meta: {
          label: 'Рассылки'
        },
        children: [
          {
            path: 'new',
            component: () => import('pages/admin/mail/Form.vue'),
            meta: {
              label: 'Добавить рассылку'
            }
          },
          {
            path: 'edit/:id',
            component: () => import('pages/admin/mail/Form.vue'),
            meta: {
              label: 'Редактировать рассылку'
            }
          }
        ]
      },
      {
        path: 'callbacks',
        component: () => import('pages/admin/callback/Index.vue'),
        meta: {
          label: 'Запросы',
          access: [
            'admin',
            'moder'
          ]
        },
        children: [
          {
            path: 'answer/:id',
            component: () => import('pages/admin/callback/Form.vue'),
            meta: {
              label: 'Ответ'
            }
          }
        ]
      },
      {
        path: 'products',
        component: () => import('pages/admin/products/Index.vue'),
        meta: {
          access: [
            'admin'
          ],
          label: 'Рассылки'
        }
      },
      {
        path: 'users',
        component: () => import('pages/admin/user/Index.vue'),
        meta: {
          access: [
            'admin'
          ],
          label: 'Пользователи'
        },
        children: [
          {
            path: 'new',
            component: () => import('pages/admin/user/Form.vue'),
            meta: {
              label: 'Создать пользователя'
            }
          },
          {
            path: 'edit/:id',
            component: () => import('pages/admin/user/Form.vue'),
            meta: {
              label: 'Редактировать пользователя'
            }
          }
        ]
      }
    ]
  }
]
