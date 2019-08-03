<template>
    <div class="q-pa-lg">
        <div class="row q-col-gutter-lg">
            <div class="col-lg-6">
                <h1 class="text-h6">Обратная связь</h1>
                <q-expansion-item label="Фильтр" icon="filter_list" class="shadow-1 bg-white rounded-borders q-mb-lg">
                    <q-card>
                        <q-card-section class="q-pa-md">
                            <q-form
                                @submit="filterCallbacks"
                                @reset="resetFilter"
                                class="q-gutter-md"
                            >
                                <q-option-group
                                    v-model="filter.answered"
                                    :options="[
                                        { label: 'Все', value: 'all' },
                                        { label: 'Отвеченные', value: 1 },
                                        { label: 'Без ответа', value: 0 },
                                    ]"
                                    color="primary"
                                />
                                <div class="row">
                                    <q-btn label="Сброс" type="reset" class="bg-grey-1 text-black"/>
                                    <q-space/>
                                    <q-btn label="Фильтр" type="submit" color="primary"/>
                                </div>
                            </q-form>
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
                <template v-if="issetCallbacks">
                    <q-list bordered class="rounded-borders bg-white">
                        <template
                            v-for="callback in callbacks"
                        >
                            <q-item
                                :key="callback.id"
                            >
                                <q-item-section>
                                    <q-item-label class="text-bold" style="font-size: 18px">{{ callback.subject }}</q-item-label>
                                    <q-item-label style="margin-bottom: 10px;">
                                        <template v-if="callback.answered">
                                            <q-badge color="positive">Отвечено</q-badge>
                                        </template>
                                        <template v-else>
                                            <q-badge color="negative">Не отвечено</q-badge>
                                        </template>
                                    </q-item-label>
                                    <q-item-label caption>{{ callback.customer.name }}</q-item-label>
                                    <q-item-label caption>Email: {{ callback.customer.email }}</q-item-label>
                                    <q-item-label caption>Телефон: {{ callback.customer.phone }}</q-item-label>
                                </q-item-section>
                                <q-item-section side>
                                    <q-btn-group outline rounded>
                                        <q-btn size="sm" :to="`/admin/callbacks/answer/${callback.id}`" outline color="primary" round icon="edit"/>
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
                <transition name="fade" mode="out-in">
                    <router-view/>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'CallbackIndex',
  data () {
    return {
      meta: {},
      filter: {
        answered: 'all',
        page: 1
      }
    }
  },
  methods: {
    ...mapActions({
      callbacksIndex: 'callbacks/index'
    }),
    filterCallbacks () {
      this.callbacksIndex(this.filter)
        .then(response => {
          this.meta = response.data.meta
        })
    },
    resetFilter () {
      this.filter = {
        answered: 'all'
      }
      this.callbacksIndex(this.filter)
    }
  },
  watch: {
    filter: {
      handler (value) {
        this.filter.page = value.page
        this.filterCallbacks()
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters({
      auth: 'auth/authUser',
      callbacks: 'callbacks/list'
    }),
    issetCallbacks () {
      return Object.keys(this.callbacks).length > 0
    }
  },
  created () {
    this.filterCallbacks()
  }
}
</script>

<style scoped>

</style>
