<template>
    <q-form @submit="confirmForm">
        <template v-if="shippingId">
            <h2 class="text-h6">Редактирование метода доставки</h2>
        </template>
        <template v-else>
            <h2 class="text-h6">Создание новой метода доставки</h2>
        </template>
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
                <q-input
                    v-model="shipping.name"
                    label="Название"
                />
                <q-input
                    v-model="shipping.cost"
                    label="Цена"
                />
            </q-card-section>
            <q-separator/>
            <q-card-actions>
                <q-btn to="/admin/shippings" unelevated>Отменить</q-btn>
                <q-space/>
                <q-btn type="submit" unelevated color="primary">Сохранить</q-btn>
            </q-card-actions>
        </q-card>
    </q-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ShippingForm',
  data () {
    return {
      shippingId: null,
      shipping: {},
      errors: [],
      message: {}
    }
  },
  watch: {
    '$route.params.id': function (shippingId) {
      this.loadShipping(shippingId)
    },
    message (value) {
      setTimeout(() => {
        this.message = {}
      }, 2000)
    }
  },
  methods: {
    ...mapActions({
      shippingShow: 'shippings/show',
      shippingUpdate: 'shippings/update',
      shippingStore: 'shippings/store'
    }),
    loadShipping (shippingId) {
      this.shipping = {}
      if (shippingId !== 'undefined') {
        this.shippingId = shippingId

        if (this.shippingId) {
          this.shippingShow(this.shippingId)
            .then(response => {
              this.shipping = response.data.data
            })
        }
      }
    },
    confirmForm () {
      if (this.shippingId) {
        this.shippingUpdate(this.shipping)
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
      } else {
        this.shippingStore(this.shipping)
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
      }
    }
  },
  created () {
    this.shippingId = this.$route.params.id
    this.loadShipping(this.shippingId)
  }
}
</script>

<style scoped>

</style>
