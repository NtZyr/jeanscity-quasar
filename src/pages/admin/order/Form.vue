<template>
    <div>
        <template v-if="orderId">
            <h2 class="text-h6">Редактирование заказа</h2>
        </template>
        <q-form @submit="orderUpdate(order)">
            <q-card>
            <transition name="fade" mode="out-in">
                <q-banner
                    v-if="message.text"
                    inline-actions
                    :class="'text-white ' + ((message.status == 200 || message.status == 201) ? 'bg-positive' : 'bg-negative' )"
                >
                    {{ message.text }}
                </q-banner>
            </transition>
            <q-card-section>
                <div class="row">
                    <div class="col-6">
                        <h6 class="q-ma-none">Детали заказа:</h6>
                        <ul class="listless">
                            <li><strong>Идентификатор заказа:</strong> {{ order.id }}</li>
                            <li><strong>Метод доставки:</strong> {{ order.shipping.name }}</li>
                            <li><strong>Статус:</strong> <order-status :status="order.status_render"/></li>
                            <li><strong>Сумма заказа:</strong> ₽{{ order.total }} </li>
                        </ul>
                    </div>
                    <div class="col-6">
                        <h6 class="q-ma-none">Покупатель:</h6>
                        <ul class="listless">
                            <li><strong>Имя:</strong> {{ order.customer.name }}</li>
                            <li><strong>Email:</strong> {{ order.customer.email }}</li>
                            <li><strong>Телефон:</strong> {{ order.customer.phone }}</li>
                            <li><strong>Адрес:</strong> {{ order.customer.address }}</li>
                        </ul>
                    </div>
                </div>
            </q-card-section>
            <q-separator/>
            <q-card-actions>
                <template v-for="(status, index) in statuses" >
                    <q-btn type="submit" @click="setOrderStatus(status,index)" :color="color(index)" unelevated :key="index" :label="status"/>
                    <template v-if="Object.keys(statuses).length !== parseInt(index)">
                        <q-space/>
                    </template>
                </template>
            </q-card-actions>
        </q-card>
        </q-form>
            <q-card class="q-mb-lg q-mt-lg">
                <h6 class="q-ma-none q-pa-md">Позиции заказа</h6>
                <q-separator/>
                <q-list>
                    <template v-for="line in lines">
                        <q-item :key="line.id">
                            <q-item-section top>
                                <q-item-label>{{ line.variant.product.name }}</q-item-label>
                                <q-item-label caption>
                                    <ul class="listless q-ma-none">
                                        <li v-for="attribute in line.variant.attributes" :key="attribute.name">
                                            {{ attribute.name }}: {{ attribute.value }}
                                        </li>
                                    </ul>
                                </q-item-label>
                            </q-item-section>
                            <q-item-section top>
                                <ul class="listless q-ma-none">
                                    <li>Кол-во: {{ line.qty }} шт.</li>
                                    <li>Общая стоимость: ₽{{ line.cost.toFixed(2) }}</li>
                                </ul>
                            </q-item-section>
                            <q-item-section side>
                                <q-btn
                                    color="primary"
                                    outline
                                    round
                                    size="sm"
                                    icon="edit"
                                />
                            </q-item-section>
                        </q-item>
                        <q-separator/>
                    </template>
                </q-list>
            </q-card>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import OrderStatus from '../../../components/admin/order/Status'

export default {
  name: 'Form',
  components: {
    OrderStatus
  },
  data () {
    return {
      orderId: null,
      order: {},
      lines: [],
      statuses: {},
      message: {},
      errors: []
    }
  },
  watch: {
    '$route.params.id': function (orderId) {
      this.loadOrder(orderId)
    },
    message (value) {
      setTimeout(() => {
        this.localMessage = {}
      }, 2000)
    }
  },
  methods: {
    ...mapActions({
      orderShow: 'orders/show',
      orderUpdate: 'orders/update',
      orderStatuses: 'orders/statuses',
      linesIndex: 'lines/index'
    }),
    setOrderStatus (status, index) {
      this.order.shipping_id = this.order.shipping.id
      this.order.status = parseInt(index)
      this.order.status_render = {
        key: status,
        value: parseInt(index)
      }
    },
    color (statusId) {
      let color = null
      statusId = parseInt(statusId)
      if (statusId === 1) {
        color = 'primary'
      } else if (statusId === 2) {
        color = 'positive'
      } else if (statusId === 3) {
        color = 'orange'
      } else if (statusId === 6) {
        color = 'negative'
      } else {
        color = 'grey'
      }
      return color
    },
    confirmForm () {
      this.orderUpdate(this.order)
        .then(
          response => {
            this.message = {
              text: response.data.message,
              status: response.status
            }
            this.errors = []
          },
          error => {
            this.message = {
              text: error.response.data.message,
              status: error.response.status
            }
            this.errors = error.response.data.errors
          })
    },
    loadOrder (orderId) {
      this.order = {}
      if (orderId !== 'undefined') {
        this.orderId = orderId

        if (this.orderId) {
          this.orderShow(this.orderId)
            .then(response => {
              this.order = response.data.data
            })
          this.linesIndex(this.orderId)
            .then(response => {
              this.lines = response.data.data
            })
        }
      }
    }
  },
  created () {
    this.loadOrder(this.$route.params.id)
    this.orderStatuses()
      .then(response => {
        this.statuses = response.data.data
      })
  }
}
</script>

<style lang="scss" scoped>
    .listless {
        padding: 0;

        li {
            list-style: none;
        }
    }
</style>
