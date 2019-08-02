<template>
    <div class="q-pa-lg">
        <div class="row q-col-gutter-lg">
            <div class="col-lg-6">
                <h1 class="text-h6">Заказы</h1>
                <q-expansion-item label="Фильтр" icon="filter_list" class="shadow-1 bg-white rounded-borders q-mb-lg">
                    <q-card>
                        <q-card-section class="q-pa-md">
                            <q-form
                                @submit="filterOrders"
                                @reset="resetFilter"
                                class="q-gutter-md"
                            >
<!--                                <q-select-->
<!--                                    outlined-->
<!--                                    label="Статус"-->
<!--                                    v-model="filter.status"-->
<!--                                    :options="statuses"-->
<!--                                />-->
                                <div class="row">
                                    <q-btn label="Сброс" type="reset" class="bg-grey-1 text-black"/>
                                    <q-space/>
                                    <q-btn label="Фильтр" type="submit" color="primary"/>
                                </div>
                            </q-form>
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
                <template v-if="issetOrders">
                    <q-list bordered class="rounded-borders bg-white">
                        <template
                            v-for="order in orders"
                        >
                            <q-item
                                :key="order.id"
                            >
                                <q-item-section>
                                    <q-item-label>Номер заказа: {{ order.id }}</q-item-label>
                                    <q-item-label caption>Метод доставки: {{ order.shipping.name }}</q-item-label>
                                    <q-item-label caption>Статус: <order-status :status="order.status_render"></order-status></q-item-label>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Позиций: {{ order.lines }}</q-item-label>
                                    <q-item-label>Стоимость: ₽{{ order.total.toFixed(2) }}</q-item-label>
                                </q-item-section>
                                <q-item-section side>
                                    <q-btn-group outline rounded>
                                        <q-btn size="sm" :to="`/admin/orders/edit/${order.id}`" outline color="primary" round icon="edit"/>
                                    </q-btn-group>
                                </q-item-section>
                            </q-item>
                            <q-separator/>
                        </template>
                    </q-list>
                    <q-pagination
                        class="q-mt-lg q-mb-lg"
                        v-model="filter.page"
                        :max="meta.last_page"
                        :boundary-numbers="true"
                    />
                </template>
                <template v-else>
                    <span>Заказы не найдены</span>
                </template>
            </div>
            <q-dialog v-model="confirm" persistent>
                <q-card>
                    <q-card-section class="row items-center">
                        <template v-if="order">
                            <span>Удалить заказ {{ order.id }}?</span>
                        </template>
                    </q-card-section>

                    <q-card-actions align="right">
                        <q-btn flat label="Отмена" color="primary" v-close-popup />
                        <q-btn flat label="Удалить" @click="deleteOrder" color="negative" v-close-popup />
                    </q-card-actions>
                </q-card>
            </q-dialog>
            <div class="col-lg-6">
                <transition name="fade" mode="out-in">
                    <router-view/>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import OrderStatus from '../../../components/admin/order/Status'

export default {
  name: 'OrderIndex',
  components: {
    OrderStatus
  },
  data () {
    return {
      confirm: false,
      filter: {
        page: 1
      },
      meta: {},
      order: {},
      statuses: []
    }
  },
  watch: {
    filter: {
      handler (value) {
        this.filter.page = value.page
        this.filterOrders()
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters({
      // statuses: 'orders/statuses',
      orders: 'orders/list'
    }),
    issetOrders () {
      return Object.keys(this.orders).length > 0
    }
  },
  methods: {
    ...mapActions({
      orderStatuses: 'orders/statuses',
      orderIndex: 'orders/index',
      orderDestroy: 'orders/destroy'
    }),
    filterOrders () {
      this.orderIndex(this.filter)
        .then(response => {
          this.meta = response.data.meta
        })
    },
    resetFilter () {
      this.filter = {
        page: 1
      }
      this.filterOrders()
    },
    confirmDelete (order) {
      this.order = order
      this.confirm = !!confirm
    },
    deleteOrder () {
      this.orderDestroy(this.order.id)
    }
  },
  created () {
    this.filterOrders()
    this.orderStatuses()
      .then(response => {
        this.statuses = response.data.data
      })
  }
}
</script>

<style scoped>

</style>
