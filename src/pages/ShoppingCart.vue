<template>
    <q-page class="bg-grey-2">
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
                            <div class="row margin-fix q-py-xs-sm item-shadow" style="min-height: 265px; position:relative; background: #FAFAFA;" v-for="(item, index) in card_items">
                                <div class="close">
                                    <i class="material-icons" style="font-size: 24px; cursor: pointer;" @click="deleteItem(item.id)">
                                        close
                                    </i>
                                </div>
                                <div class="col-11 offset-1 q-pr-xl q-pt-sm-lg q-pt-md-xs q-pt-xs-xl q-pb-sm-sm q-pb-xs-sm">
                                    <div class="product-name">{{item.name}}</div>
                                </div>
                                <div class="col-md-3 col-xs-5 offset-1 flex justify-xs-center justify-md-start q-py-xs-md q-py-md-xs numbers">
                                    <img src="/statics/images/image.png" style="max-width: 170px; width: 100%" alt="">
                                    <div class="flex items-center md-hide lg-hide xl-hide q-px-sm-none q-px-xs-none q-pt-sm">
                                        <q-btn
                                            round
                                            color="white"
                                            text-color="black"
                                            size="0.53rem"
                                            icon="remove"
                                            @click="item.number--"
                                            :disabled="!(item.number-1)"
                                        />
                                        <input type="text" style="max-width: 35px; max-height: 32px; font-weight: 700;" class="q-mx-sm-sm q-mx-xs-xs text-center" :value="item.number">
                                        <q-btn
                                            round
                                            color="white"
                                            text-color="black"
                                            size='0.53rem'
                                            icon="add"
                                            @click="item.number++"
                                        />
                                    </div>
                                </div>
                                <div class="col-md-8 col-xs-6">
                                    <div class="row" style="height: 100%">
                                        <div class="col-md-4 col-xs-12 q-pr-xs-sm q-pt-md-md q-pl-md q-pl-md-md q-pl-sm-xl q-pl-xs-md q-pt-sm-md q-pt-xs-sm product-info flex column justify-between">
                                            <div>
                                                <p class="no-margin q-pb-xs">бренд: Lamborghini</p>
                                                <p class="no-margin q-pb-xs">размер: one size</p>
                                                <p class="no-margin">цвет: красный</p>
                                            </div>
                                            <div class="q-pt-sm-xl q-pt-xs-md q-my-sm-md q-my-xs-md md-hide lg-hide xl-hide">
                                                <div class="sail-label q-mb-xl" v-show="item.sail">{{100 - item.sail_value*100}}%</div>
                                                <div class="text-h6 q-pt-sm price" :class="{'not-sail': item.sail}">{{item.number*item.price}} руб.</div>
                                                <div class="text-h6 q-pt-md"
                                                     :class="{'sail': item.sail}"
                                                     v-show="item.sail"
                                                >
                                                    {{item.number*item.price*item.sail_value}} руб.
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4 sm-hide xs-hide q-pt-md flex q-pr-lg numbers">
                                            <q-btn
                                                round
                                                color="white"
                                                text-color="black"
                                                size="sm"
                                                icon="remove"
                                                @click="item.number--"
                                                :disabled="!(item.number-1)"
                                            />
                                            <input type="text"
                                                   style="max-width: 35px; max-height: 32px; font-weight: 700;"
                                                   class="q-mx-sm text-center"
                                                   :value=item.number
                                            >
                                            <q-btn
                                                round
                                                color="white"
                                                text-color="black"
                                                size='sm'
                                                icon="add"
                                                @click="item.number++"
                                            />
                                        </div>
                                        <div class="col-md-4 sm-hide xs-hide q-pr-xl">
                                            <div class="text-h6 q-pt-sm price" :class="{'not-sail': item.sail}">{{item.number*item.price}} руб.</div>
                                            <div class="text-h6 q-pt-md q-mb-sm"
                                                 :class="{'sail': item.sail}"
                                                 v-show="item.sail"
                                            >
                                                {{item.number*item.price*item.sail_value}} руб.
                                            </div>
                                            <div class="sail-label" v-show="item.sail">{{100 - item.sail_value*100}}%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                @submit="onSubmit"
                                @reset="onReset"
                                class=""
                            >
                                <div class="text-subtitle1 q-pb-sm" style="font-size: 18px;">Способ доставки</div>
                                <q-radio v-model="pickup" val="pickup" label="Самовывоз: 0 руб." />
                                <q-radio v-model="pickup" val="courier" label="Доставка: 1350 руб." />
                                <div class="q-my-md total" style="position: relative;">
                                    Итоговая сумма: <br>
                                    <span>(с учётом доставки)</span>
                                </div>
                                <div class="text-h5 q-pb-sm q-mt-xl text-weight-bold">{{countTotal}} руб.</div>
                                <q-separator class="q-mb-sm"/>
                                <div class="text-subtitle1 q-pb-sm" style="font-size: 18px;">Контактная информация</div>
                                <q-input
                                    required
                                    filled
                                    v-model="firstName"
                                    label="имя"
                                    type="text"
                                    class="q-mb-md"
                                />
                                <q-input
                                    required
                                    filled
                                    v-model="lastName"
                                    label="фамилия"
                                    type="text"
                                    class="q-mb-md"
                                />
                                <q-input
                                    filled
                                    v-model="email"
                                    label="email"
                                    type="email"
                                    class="q-mb-md"
                                />
                                <q-input
                                    required
                                    filled
                                    v-model="phone"
                                    type="tel"
                                    label="телефон"
                                    mask="+7 (###) ### - ####"
                                    unmasked-value
                                    fill-mask
                                    class="q-mb-md"
                                />
                                <template v-if="pickup !== 'pickup'">
                                    <q-input
                                        filled
                                        v-model="street"
                                        label="улица"
                                        type="text"
                                        class="q-mb-md"
                                    />
                                    <q-input
                                        filled
                                        v-model="house"
                                        label="дом"
                                        class="q-mb-md"
                                    />
                                    <q-input
                                        filled
                                        v-model="corps"
                                        label="корпус"
                                        class="q-mb-md"
                                    />
                                    <q-input
                                        filled
                                        v-model="flat"
                                        label="квартира"
                                        class="q-mb-md"
                                    />
                                </template>
                                <div class="flex items-center no-wrap checkbox">
                                    <q-checkbox style="margin-left: -10px;" v-model="subscription" @click="subscription = !subscription"/>
                                    <span>Подписка на рассылку</span>
                                </div>
                                <div class="flex items-center no-wrap checkbox q-pb-sm">
                                    <q-checkbox style="margin-left: -10px;" v-model="personal" @click="personal = !personal"/>
                                    <span>Соглашение пользователя на обработку персональных данных</span>
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      localStorage: {
        shippingId: 1,
        customerId: null,
        customer: {
          name: null,
          email: null,
          phone: null,
          address: null
        },
        lines: [
          {
            variantId: 1,
            qty: 1
          }
        ]
      },
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      street: null,
      house: null,
      corps: null,
      flat: null,
      pickup: 'pickup',
      subscription: false,
      personal: false,
      card_items: [
        {
          sail: true,
          name: 'Футболка мужкая новая и красивая',
          number: 1,
          price: 111110000,
          sail_value: 0.8
        },
        {
          sail: false,
          name: 'Футболка мужкая новая',
          number: 1,
          price: 8000,
          sail_value: 0.9
        },
        {
          sail: true,
          name: 'Красивая очень настолько что даже ок',
          number: 1,
          price: 15000,
          sail_value: 0.5
        }
      ]
      // total: null,
    }
  },
  computed: {
    ...mapGetters({
      shippings: 'shippings/list',
      shipping: 'shippings/item',
      orders: 'orders/list',
      order: 'orders/item'
    }),
    countTotal () {
      let total = 0
      for (let i = 0; i < this.card_items.length; i++) {
        if (this.card_items[i].sail) {
          total = total + (this.card_items[i].price * this.card_items[i].sail_value) * this.card_items[i].number
        } else {
          total = total + this.card_items[i].price * this.card_items[i].number
        }
      }
      if (this.pickup === 'courier') {
        total = total + 1350
      }
      return (total + "").split("").reverse().join("").replace(/(\d{3})/g, "$1 ").split("").reverse().join("").replace(/^ /, "");
    }
  },
  methods: {
    ...mapActions({
      shippingsIndex: 'shippings/index',
      shippingsShow: 'shippings/show',
      shippingsUpdate: 'shippings/update',
      shippingsStore: 'shippings/store',
      shippingsDestroy: 'shippings/destroy',
      ordersIndex: 'orders/index',
      ordersShow: 'orders/show',
      ordersUpdate: 'orders/update',
      ordersDestroy: 'orders/destroy'
    }),
    deleteItem (id) {
      this.ordersDestroy(id)
    },
    /*deleteItem (id) {
      this.card_items.splice(id, 1)
    },*/
    onSubmit () {

    },
    onReset () {

    }
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
