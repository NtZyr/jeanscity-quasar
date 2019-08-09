import Vue from 'vue'
import Vuex from 'vuex'

import CategoriesModule from './modules/categories.module'
import AttributesModule from './modules/attributes.module'
import ValuesModule from './modules/values.module'
import FaqsModule from './modules/faqs.module'
import HomeslidesModule from './modules/homeslides.module'
import MailsModule from './modules/mails.module'
import ShippingsModule from './modules/shippings.module'
import UsersModule from './modules/users.module'
import AuthModule from './modules/auth.module'
import CallbacksModule from './modules/callbacks.module'
import AnswersModule from './modules/answers.module'
import CustomersModule from './modules/customers.module'
import OrdersModule from './modules/orders.module'
import LinesModule from './modules/lines.module'
import MediaModule from './modules/media.module'
import ProductsModule from './modules/products.module'
import VariantsModule from './modules/variants.module'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      categories: {
        ...CategoriesModule
      },
      attributes: {
        ...AttributesModule
      },
      values: {
        ...ValuesModule
      },
      faqs: {
        ...FaqsModule
      },
      homeslides: {
        ...HomeslidesModule
      },
      mails: {
        ...MailsModule
      },
      shippings: {
        ...ShippingsModule
      },
      users: {
        ...UsersModule
      },
      orders: {
        ...OrdersModule
      },
      lines: {
        ...LinesModule
      },
      media: {
        ...MediaModule
      },
      products: {
        ...ProductsModule
      },
      variants: {
        ...VariantsModule
      },
      callbacks: {
        ...CallbacksModule
      },
      answers: {
        ...AnswersModule
      },
      customers: {
        ...CustomersModule
      },
      auth: {
        ...AuthModule
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
    // eslint-disable-next-line no-mixed-spaces-and-tabs
  })

  return Store
}
