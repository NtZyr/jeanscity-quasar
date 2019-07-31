<template>
    <div class="q-pa-lg">
        <div class="row q-col-gutter-lg">
            <div class="col-lg-6">
                <h1 class="text-h6">Рассылки</h1>
                <q-expansion-item label="Фильтр" icon="filter_list" class="shadow-1 bg-white rounded-borders q-mb-lg">
                    <q-card>
                        <q-card-section class="q-pa-md">
                            <q-form
                                @submit="filterMails"
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
                <template v-if="issetMails">
                    <q-list bordered class="rounded-borders bg-white">
                        <template
                            v-for="mail in mails"
                        >
                            <q-item
                                :key="mail.id"
                            >
                                <q-item-section>
                                    <q-item-label>{{ mail.subject }}</q-item-label>
                                    <q-item-label caption>Дата отправки: {{ mail.delay_formatted !== null ? mail.delay_formatted : 'Не установлено' }}</q-item-label>
                                </q-item-section>
                                <q-item-section side>
                                    <q-btn-group outline rounded>
                                        <q-btn size="sm" :to="`/admin/mails/edit/${mail.id}`" outline color="primary" round icon="edit"/>
                                        <q-btn size="sm" @click="sendMail(mail.id)" outline color="primary" round icon="send"/>
                                        <q-btn size="sm" @click="deleteMail(mail.id)" outline color="negative" round icon="delete"/>
                                    </q-btn-group>
                                </q-item-section>
                            </q-item>
                            <q-separator/>
                        </template>
                    </q-list>
                </template>
                <template v-else>
                    <span>Рассылки не найдены</span>
                </template>
                <q-pagination
                    class="q-mt-lg q-mb-lg"
                    v-model="filter.page"
                    :max="meta.last_page"
                    :boundary-numbers="true"
                />
            </div>
            <q-dialog v-model="confirm" persistent>
                <q-card>
                    <q-card-section class="row items-center">
                        <template v-if="localMail">
                            <span>Удалить рассылку "{{ localMail.subject }}"?</span>
                        </template>
                    </q-card-section>

                    <q-card-actions align="right">
                        <q-btn flat label="Отмена" color="primary" v-close-popup />
                        <q-btn flat label="Удалить" @click="deleteMail" color="negative" v-close-popup />
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

export default {
  name: 'MailIndex',
  data () {
    return {
      confirm: false,
      filter: {
        page: 1
      },
      meta: {},
      localMail: {}
    }
  },
  computed: {
    ...mapGetters({
      mails: 'mails/list'
    }),
    issetMails () {
      return Object.keys(this.mails).length > 0
    }
  },
  watch: {
    filter: {
      handler (value) {
        this.filter.page = value.page
        this.filterMails()
      },
      deep: true
    }
  },
  methods: {
    ...mapActions({
      mailIndex: 'mails/index'
    }),
    filterMails () {
      this.mailIndex(this.filter)
        .then(response => {
          this.meta = response.data.meta
        })
    },
    resetFilter () {
      this.filter = {}
    },
    deleteMail () {

    },
    sendMail (mailId) {

    }
  },
  created () {
    this.filterMails()
  }
}
</script>

<style scoped>

</style>
