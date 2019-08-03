export const admin = [
  {
    name: 'auth.login',
    path: '/login',
    component: () => import('pages/admin/login'),
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
        component: () => import('pages/admin/order/index'),
        meta: {
          label: 'Заказы'
        },
        children: [
          {
            path: 'new',
            component: () => import('pages/admin/order/form'),
            meta: {
              label: 'Новый заказ'
            }
          },
          {
            path: 'edit/:id',
            component: () => import('pages/admin/order/form'),
            meta: {
              label: 'Редактирование заказа'
            }
          }
        ]
      },
      {
        path: 'categories',
        component: () => import('pages/admin/category/index'),
        meta: {
          label: 'Категории',
          access: [
            'admin',
            'superadmin'
          ]
        },
        children: [
          {
            path: 'new',
            component: () => import('pages/admin/category/form'),
            meta: {
              label: 'Создание категории'
            }
          },
          {
            path: 'edit/:id',
            component: () => import('pages/admin/category/form'),
            meta: {
              label: 'Редактирование категории'
            }
          }
        ]
      },
      {
        path: 'homepage',
        component: () => import('pages/admin/homepage/index'),
        meta: {
          label: 'Настройки главной страницы'
        },
        children: [
          {
            path: 'slider',
            component: () => import('pages/admin/homepage/slider/index'),
            meta: {
              label: 'Слайдер'
            },
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
        meta: {
          label: 'Атрибуты товаров'
        },
        children: [
          {
            path: 'new',
            component: () => import('pages/admin/attribute/form'),
            meta: {
              label: 'Создать атрибут'
            }
          },
          {
            path: 'edit/:id',
            component: () => import('pages/admin/attribute/form'),
            meta: {
              label: 'Редактировать атрибут'
            }
          }
        ]
      },
      {
        path: 'shippings',
        component: () => import('pages/admin/shipping/index'),
        meta: {
          label: 'Методы доставки'
        },
        children: [
          {
            path: 'new',
            component: () => import('pages/admin/shipping/form'),
            meta: {
              label: 'Создать метод доставки'
            }
          },
          {
            path: 'edit/:id',
            component: () => import('pages/admin/shipping/form'),
            meta: {
              label: 'Редактировать метод доставки'
            }
          }
        ]
      },
      {
        path: 'mails',
        component: () => import('pages/admin/mail/index'),
        meta: {
          label: 'Рассылки'
        },
        children: [
          {
            path: 'new',
            component: () => import('pages/admin/mail/form'),
            meta: {
              label: 'Добавить рассылку'
            }
          },
          {
            path: 'edit/:id',
            component: () => import('pages/admin/mail/form'),
            meta: {
              label: 'Редактировать рассылку'
            }
          }
        ]
      },
      {
        path: 'callbacks',
        component: () => import('pages/admin/callback/index'),
        meta: {
          label: 'Запросы',
          access: [
            'superadmin',
            'admin',
            'moder'
          ]
        },
        children: [
          {
            path: 'answer/:id',
            component: () => import('pages/admin/callback/form'),
            meta: {
              label: 'Ответ'
            }
          }
        ]
      },
      {
        path: 'products',
        component: () => import('pages/admin/products/index'),
        meta: {
          access: [
            'admin',
            'superadmin'
          ],
          label: 'Рассылки'
        }
      },
      {
        path: 'users',
        component: () => import('pages/admin/user/index'),
        meta: {
          access: [
            'admin',
            'superadmin'
          ],
          label: 'Пользователи'
        },
        children: [
          {
            path: 'new',
            component: () => import('pages/admin/user/form'),
            meta: {
              label: 'Создать пользователя'
            }
          },
          {
            path: 'edit/:id',
            component: () => import('pages/admin/user/form'),
            meta: {
              label: 'Редактировать пользователя'
            }
          }
        ]
      }
    ]
  }
]
