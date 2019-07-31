<template>
    <q-form @submit="confirmForm">
        <template v-if="mailId">
            <h2 class="text-h6">Редактирование рассылки</h2>
        </template>
        <template v-else>
            <h2 class="text-h6">Создание новой рассылки</h2>
        </template>
        <q-card>
            <transition name="fade" mode="out-in">
                <q-banner
                    v-if="localMessage.text"
                    inline-actions
                    :class="'text-white ' + ((localMessage.status == 200 || localMessage.status == 201) ? 'bg-positive' : 'bg-negative' )"
                >
                    {{ localMessage.text }}
                </q-banner>
            </transition>
            <q-card-section>
                <q-input
                    v-model="localMail.subject"
                    label="Тема рассылки"
                />
                <q-input
                    type="textarea"
                    v-model="localMail.text"
                    label="Текст рассылки"
                />
                <q-input label="Дата отправки" v-model="localMail.delay">
                    <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                                <q-date v-model="localMail.delay" mask="YYYY-MM-DD HH:mm:ss" />
                            </q-popup-proxy>
                        </q-icon>
                    </template>

                    <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                                <q-time v-model="localMail.delay" mask="YYYY-MM-DD HH:mm:ss" with-seconds />
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
            </q-card-section>
            <q-separator/>
            <q-card-actions>
                <q-btn to="/admin/mails" unelevated>Отменить</q-btn>
                <q-space/>
                <q-btn type="submit" unelevated color="grey-4" class="text-black">Сохранить</q-btn>
                <q-btn unelevated color="primary">Отправить</q-btn>
            </q-card-actions>
        </q-card>
    </q-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Form',
  data () {
    return {
      mailId: null,
      localMessage: {},
      localMail: {},
      localErrors: []
    }
  },
  methods: {
    ...mapActions({
      mailShow: 'mails/show',
      mailStore: 'mails/store',
      mailUpdate: 'mails/update'
    }),
    loadMail (mailId) {
      this.localMail = {}
      if (mailId !== 'undefined') {
        this.mailId = mailId

        if (this.mailId) {
          this.mailShow(this.mailId)
            .then(response => {
              this.localMail = response.data.data
            })
        }
      }
    },
    confirmForm () {
      this.localMail.creator_id = this.auth.id
      if (this.mailId) {
        this.mailUpdate(this.localMail)
          .then(
            response => {
              this.localMessage = {
                text: response.data.message,
                status: response.status
              }
              this.localErrors = []
            },
            error => {
              this.localMessage = {
                text: error.response.data.message,
                status: error.response.status
              }
              this.localErrors = error.response.data.errors
            })
      } else {
        this.mailStore(this.localMail)
          .then(
            response => {
              this.localMessage = {
                text: response.data.message,
                status: response.status
              }
              this.localErrors = []
            },
            error => {
              this.localMessage = {
                text: error.response.data.message,
                status: error.response.status
              }
              this.localErrors = error.response.data.errors
            })
      }
    }
  },
  watch: {
    '$route.params.id': function (mailId) {
      this.loadMail(mailId)
    },
    localMessage (value) {
      setTimeout(() => {
        this.localMessage = {}
      }, 2000)
    }
  },
  computed: {
    ...mapGetters({
        auth: 'auth/authUser'
    })
  },
  created () {
    this.loadMail(this.$route.params.id)
  }
}
</script>

<style scoped>

</style>
