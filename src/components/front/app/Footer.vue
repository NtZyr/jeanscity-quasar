<template>
    <q-footer class="bg-white text-white">
        <q-toolbar class="row justify-center text-black q-py-md">
            <div class="row container q-col-gutter-x-lg">
                <div class="col-sm-4 col-md-6 col-xs-12">
                    <q-form
                            @submit="subscribeCustomer"
                    >
                        <div class="row">
                            <div class="col-12">
                                <div class="text-h6 text-uppercase title">Подписка на рассылку</div>
                            </div>
                            <div class="col-12">
                                <div class="row wrap items-sm-center q-col-gutter-x-md">
                                    <div class="col-xs-12 col-sm-12 col-md-7 col-sm-7 q-py-xs-lg">
                                        <q-input v-model="customer.email" type="email" label="Email"/>
                                    </div>
                                    <div class="col-xs-12 col-sm-12 col-md-4 self-md-end q-py-md-lg q-pb-xs-xl subscription-btn">
                                        <q-btn type="submit" color="red-8" text-color="white" label="Подписаться" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </q-form>
                </div>
                <div class="col-sm-4 col-md-3 col-xs-12">
                    <div class="row">
                        <div class="col-12">
                            <div class="text-h6 text-uppercase title">Информация</div>
                        </div>
                        <div class="col-12 column q-py-lg">
                            <a href="">Оплата</a>
                            <a href="" class="q-py-sm">Доставка</a>
                        </div>
                    </div>
                </div>
                <div class="col-sm-4 col-md-3 col-xs-12">
                    <div class="row">
                        <div class="col-12">
                            <div class="text-h6 text-uppercase title">Контакты</div>
                        </div>
                        <div class="col-12 column q-py-lg">
                            <a href="">+7 (996) 453-93-03</a>
                            <a href="" class="q-py-sm text-">jeanscity@gmail.com </a>
                            <a href="">jeanscity@gmail.com </a>
                        </div>
                    </div>
                </div>
            </div>
        </q-toolbar>
    </q-footer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AppFooter',
  data () {
    return {
      customer: {
        email: null,
        is_subscribe: true
      }
    }
  },
  methods: {
    ...mapActions({
      customerStore: 'customers/store'
    }),
    subscribeCustomer () {
      this.customerStore(this.customer)
        .then(response => {
          this.$q.notify({
            message: 'Спасибо за подписку!',
            color: 'positive',
            position: 'bottom'
          })
        })
        .catch(error => {
          this.$q.notify({
            message: 'Что-то пошло не так...',
            color: 'negative',
            position: 'bottom'
          })
        })
    }
  }
}
</script>

<style scoped>

</style>
