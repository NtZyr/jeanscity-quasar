<template>
    <div class="q-pa-lg">
        <div class="row q-col-gutter-lg">
            <div class="col-lg-6">
                <h1 class="text-h6">Покупатели</h1>
                <q-expansion-item label="Фильтр" icon="filter_list" class="shadow-1 bg-white rounded-borders q-mb-lg">
                    <q-card>
                        <q-card-section class="q-pa-md">
                            <q-form
                                    @submit="filterCustomers"
                                    @reset="resetFilter"
                                    class="q-gutter-md"
                            >
                                <div class="row">
                                    <q-btn label="Сброс" type="reset" class="bg-grey-1 text-black"/>
                                    <q-space/>
                                    <q-btn label="Фильтр" type="submit" color="primary"/>
                                </div>
                            </q-form>
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
                <template v-if="issetCustomers">
                    <q-list bordered class="rounded-borders bg-white">
                        <template
                                v-for="customer in customers"
                        >
                            <q-item
                                    :key="customer.id"
                            >
                                <q-item-section>
                                    <q-item-label class="text-bold" style="font-size: 18px">{{ customer.name }}</q-item-label>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label caption><strong>Email:</strong> {{ customer.email }}</q-item-label>
                                    <q-item-label caption><strong>Телефон:</strong> {{ customer.phone }}</q-item-label>
                                    <q-item-label caption><strong>Адрес:</strong> {{ customer.address }}</q-item-label>
                                </q-item-section>
                                <q-item-section side>
                                    <q-btn-group outline rounded>
                                        <q-btn size="sm" :to="`/admin/customers/edit/${customer.id}`" outline color="primary" round icon="edit"/>
                                    </q-btn-group>
                                </q-item-section>
                            </q-item>
                            <q-separator/>
                        </template>
                    </q-list>
                </template>
                <template v-else>
                    <span>Запросы не найдены</span>
                </template>
                <q-pagination
                        class="q-mt-lg q-mb-lg"
                        v-model="filter.page"
                        :max="meta.last_page"
                        :boundary-numbers="true"
                />
            </div>
            <div class="col-lg-6">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'CustomersIndex',
  data () {
    return {
      meta: {},
      filter: {
        page: 1
      }
    }
  },
  watch: {
    filter: {
      handler (value) {
        this.filter.page = value.page
        this.filterCustomers()
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters({
      customers: 'customers/list'
    }),
    issetCustomers () {
      return Object.keys(this.customers).length > 0
    }
  },
  methods: {
    ...mapActions({
      customersIndex: 'customers/index'
    }),
    filterCustomers () {
      this.customersIndex(this.filter)
        .then(response => {
          this.meta = response.data.meta
        })
    },
    resetFilter () {
      this.filter = {
        answered: 'all'
      }
      this.customersIndex(this.filter)
    }
  },
  created () {
    this.filterCustomers()
  }
}
</script>

<style scoped>

</style>
