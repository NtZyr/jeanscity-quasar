<template>
    <q-page-container>
        <q-page class="bg-grey-2" v-if="cart.lines.length > 0">
            <div class="row justify-center q-py-lg">
                <div class="row container q-col-gutter-x-lg q-pb-md-xl">
                    <div class="col-12 text-h5">Корзина</div>
                    <div class="col-md-9 col-sm-7 col-xs-12">
                        <div class="row">
                            <div class="col-12">
                                <div class="row q-py-sm-sm q-mt-md sm-hide xs-hide title-items">
                                    <div class="col-5 offset-1 text-uppercase">Товар</div>
                                    <div class="col-4 flex justify-between q-pl-md">
                                        <div class="q-ml-xl text-uppercase">Количество</div>
                                        <div class="q-mr-sm text-uppercase">Цена</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 q-py-xs-sm q-py-md-none">
                                <cart-item
                                        v-for="line in cart.lines"
                                        :key="line.variant_id"
                                        :line="line"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-5 col-xs-12 q-py-xs-sm q-py-md-none">
                        <div class="row">
                            <div class="col-12">
                                <div class="row q-py-sm-sm q-mt-md sm-hide xs-hide title-items">
                                    <div class="col-12 text-uppercase">Оформление заказа</div>
                                </div>
                            </div>
                            <div class="col-12 item-shadow q-pa-md" style="background: #FAFAFA; color: #3C3C3C;">
                                <q-form
                                        @submit="sendOrder"
                                >
                                    <div class="text-subtitle1 q-pb-sm" style="font-size: 18px;">Способ доставки</div>
                                    <q-option-group
                                            :options="shippings"
                                            v-model="shipping_id"
                                    />
                                    <div class="q-my-md total" style="position: relative;">
                                        Доставка: {{ activeShipping[0].cost }} руб.
                                    </div>
                                    <div class="q-my-md text-weight-bold total" style="position: relative;">
                                        Cумма:
                                    </div>
                                    <div class="text-h5 q-mt-lg-none q-pb-sm q-mt-xl text-weight-bold">{{ countTotal }} руб.</div>
                                    <q-separator class="q-mb-sm"/>
                                    <div class="text-subtitle1 q-pb-sm" style="font-size: 18px;">Контактная информация</div>
                                    <q-input
                                        required
                                        filled
                                        v-model="customer.first_name"
                                        label="имя"
                                        type="text"
                                        class="q-mb-md"
                                    />
                                    <q-input
                                        required
                                        filled
                                        v-model="customer.last_name"
                                        label="фамилия"
                                        type="text"
                                        class="q-mb-md"
                                    />
                                    <q-input
                                        filled
                                        v-model="customer.email"
                                        label="email"
                                        type="email"
                                        class="q-mb-md"
                                    />
                                    <q-input
                                        required
                                        filled
                                        v-model="customer.phone"
                                        type="tel"
                                        label="телефон"
                                        mask="+7 (###) ### - ####"
                                        unmasked-value
                                        fill-mask
                                        class="q-mb-md"
                                    />
                                    <template v-if="typeof activeShipping !== 'undefined' && activeShipping !== null && activeShipping[0].need_address == true">
                                        <q-input
                                            filled
                                            v-model="customer.street"
                                            label="улица"
                                            type="text"
                                            class="q-mb-md"
                                        />
                                        <q-input
                                            filled
                                            v-model="customer.house"
                                            label="дом"
                                            class="q-mb-md"
                                        />
                                        <q-input
                                            filled
                                            v-model="customer.corps"
                                            label="корпус"
                                            class="q-mb-md"
                                        />
                                        <q-input
                                            filled
                                            v-model="customer.flat"
                                            label="квартира"
                                            class="q-mb-md"
                                        />
                                    </template>
                                    <div class="flex items-center no-wrap checkbox">
                                        <q-checkbox label="Подписка на рассылку" style="margin-left: -10px;" v-model="customer.is_subscribe" @click="customer.is_subscribe = !customer.is_subscribe"/>
                                    </div>
                                    <div class="flex items-center no-wrap checkbox q-pb-sm">
                                        <q-checkbox label="Соглашение пользователя на обработку персональных данных" style="margin-left: -10px;" v-model="personal" @click="personal = !personal"/>
                                    </div>
                                    <div>
                                        <q-btn label="Оформить заказ" type="submit" color="primary" class="full-width q-mt-md text-weight-bold"/>
                                    </div>
                                </q-form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </q-page>
        <q-page class="bg-grey-2 flex items-center" v-else>
            <div class="row justify-center q-py-lg full-width">
                <div class="row container q-col-gutter-x-lg q-pb-md-xl">
                    <div class="col-12 text-h5 text-center empty flex column">
                        <i class="material-icons">
                            sentiment_dissatisfied
                        </i>
                        Корзина пуста <br>(идите нахуй, я вас не звал)
                    </div>
                </div>
            </div>
        </q-page>
    </q-page-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CartItem from '../components/front/cart/Item'

export default {
  data () {
    return {
      customer: {
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        street: null,
        house: null,
        corpus: null,
        flat: null,
        is_subscribe: false
      },
      activeShipping: null,
      shippings: [],
      shipping_id: null,
      personal: true,
      subscription: true
    }
  },
  components: {
    CartItem
  },
  watch: {
    shipping_id (value) {
      this.activeShipping = this.shippings.filter(shipping => shipping.value === value)
    }
  },
  computed: {
    ...mapGetters({
      shippings: 'shippings/list',
      cart: 'cart/cart',
    }),
    countTotal () {
      let total = 0

      total = this.cart.lines.map(line => {
        console.log(line)
        if (line.variant.sale_price > 0) {
          total += line.variant.sale_price * line.qty
        } else {
          total += line.variant.price * line.qty
        }
        return total
      })

      return total[0].toFixed(2)
    }
  },
  methods: {
    ...mapActions({
      orderStore: 'orders/store',
      shippingsIndex: 'shippings/index',
      clearCart: 'cart/clear',
      cartCustomer: 'cart/addCustomer',
      cartShipping: 'cart/addShipping'
    }),
    sendOrder () {
      this.cartShipping(this.shipping_id)
      if (this.cart.customer_id === null) {
        this.customer.name = `${this.customer.first_name} ${this.customer.last_name}`
        this.cartCustomer(this.customer)
      }

      if (
        this.customer.street !== null ||
        this.customer.corpus !== null ||
        this.customer.house !== null ||
        this.customer.flat !== null
      ) {
        this.customer.address = `${this.customer.address.street} ${this.customer.address.corpus} ${this.customer.address.house} ${this.customer.address.flat}`
      }
      this.orderStore(this.cart)
        .then(response => {
          if (response.status === 201) {
            this.$q.notify({
              message: response.data.message,
              color: 'positive',
              position: 'top'
            })
            this.clearCart()
            this.$router.push('/')
          }
        })
    }
  },
  created () {
    this.shippingsIndex()
      .then(response => {
        this.shippings = response.data.data
        this.shipping_id = this.shippings[0].value
      })
  }
}
</script>

<style lang="stylus" scoped>
    .margin-fix
        margin-left 0
        margin-bottom 15px
    .product-name
        max-width 300px
        font-size 16px
        color #3C3C3C
    .close
        position absolute
        right 8px
        top 8px
    .title-items
        color #3C3C3C
        font-size 16px
    .price
        font-size 22px
        color #3c3c3c
    .sail
        color #B61118
        padding-top 0
        font-size 22px
    .not-sail
        color #868686
        text-decoration line-through
        font-size 16px
    .sail-label
        background #CC0008
        padding 3px 5px
        display initial
        color #fff
        font-weight 700
    .item-shadow
        box-shadow 0px 2px 6px -2px rgba(0,0,0,0.75)
        border-radius 3px
    .product-info
        font-weight 300
        font-size 14px
    .total
        font-size 18px
        span
            color #3C3C3C
            text-transform lowercase
            position absolute
            top 23px
            font-size 14px
            font-weight 300
    .text-subtitle1
        span
            font-size 12px
            padding-top -15px
    .checkbox
        font-size 12px
    .empty
        color #9E9E9E

    @media (max-width $breakpoint-xs)
        .price
            font-size 18px
            color #3c3c3c
            line-height 18px
        .sail
            color #B61118
            padding-top 0
            font-size 18px
        .not-sail
            color #868686
            text-decoration line-through
            font-size 14px

</style>
