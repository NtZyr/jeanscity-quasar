<template>
    <div>
        <h2 class="text-h6">Просмотр запроса</h2>
        <q-card>
            <q-card-section>
                <template v-if="localCallback.answered">
                    <q-badge color="positive">Отвечено</q-badge>
                </template>
                <template v-else>
                    <q-badge color="negative">Не отвечено</q-badge>
                </template>
                <ul class="q-mb-lg listless">
                    <li><strong>Имя:</strong> {{ localCallback.customer.name }}</li>
                    <li><strong>Email:</strong> {{ localCallback.customer.email }}</li>
                    <li><strong>Телефон:</strong> {{ localCallback.customer.phone }}</li>
                </ul>
                <q-separator/>
                <h3 class="text-h6">{{ localCallback.subject }}</h3>
                <p>
                    {{ localCallback.text }}
                </p>
            </q-card-section>
            <q-card-actions>
                <q-btn v-if="!localCallback.answered" @click="setAsAnswered()" label="Отметить как отвеченное"/>
                <q-space/>
                <q-btn @click="answerForm = true" color="primary" label="Ответить в сообщении"/>
            </q-card-actions>
        </q-card>
        <q-form
            @submit="sendAnswer"
            @reset="resetAnswer"
            v-if="answerForm"
        >
            <q-card class="q-mb-lg q-mt-lg">
                <q-card-section>
                    <q-input
                        label="Ответ"
                        outlined
                        v-model="answer.text"
                        type="textarea"
                    />
                </q-card-section>
                <q-card-actions>
                    <q-btn type="reset" label="Отмена"/>
                    <q-space/>
                    <q-btn type="submit" color="primary" label="Отправить"/>
                </q-card-actions>
            </q-card>
        </q-form>
        <template v-if="answers.length > 0">
            <h2 class="text-h6">Ответы:</h2>
            <q-card class="q-mb-lg q-mt-lg" v-for="answer in answers" :key="answer.id">
                <q-card-section>
                    <div class="row q-mb-lg">
                        <span>
                            <strong>Ответил:</strong> {{ answer.creator.full_name }}
                        </span>
                        <q-space/>
                        <span>
                            {{ answer.created_at }}
                        </span>
                    </div>
                    <p>
                        {{ answer.text }}
                    </p>
                </q-card-section>
            </q-card>
        </template>
        <template v-else>
            <div class="q-mt-lg q-mb-lg">
                <span>На это сообщение не было письменных ответов</span>
            </div>
        </template>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CallbackForm',
  data () {
    return {
      answerForm: false,
      callbackId: null,
      localCallback: {},
      answer: {},
      localMessage: {},
      answers: []
    }
  },
  computed: {
    ...mapGetters({
      auth: 'auth/authUser'
    })
  },
  watch: {
    '$route.params.id': function (callbackId) {
      this.loadCallback(callbackId)
    },
    localMessage (value) {
      setTimeout(() => {
        this.localMessage = {}
      }, 2000)
    }
  },
  methods: {
    ...mapActions({
      callbackShow: 'callbacks/show',
      callbackUpdate: 'callbacks/update',
      callbackIndex: 'callbacks/index',
      callbacksUnanswered: 'callbacks/unanswered',
      answersIndex: 'answers/index',
      answerStore: 'answers/store'
    }),
    resetAnswer () {
      this.answer = {}
      this.answerForm = false
    },
    sendAnswer () {
      this.answer.creator_id = this.auth.id
      this.answer.callback_id = this.localCallback.id
      console.log(this.answer)
      this.answerStore(this.answer)
        .then(response => {
          this.loadCallback(this.localCallback.id)
        })
    },
    setAsAnswered () {
      this.localCallback.answered = true
      this.callbackUpdate(this.localCallback)
        .then(response => {
          this.callbackIndex()
          this.callbacksUnanswered()
        })
    },
    loadCallback (callbackId) {
      this.localCallback = {}
      if (callbackId !== 'undefined') {
        this.callbackId = callbackId

        if (this.callbackId) {
          this.callbackShow(this.callbackId)
            .then(response => {
              this.localCallback = response.data.data
            })
          this.answersIndex(callbackId)
            .then(response => {
              this.answers = response.data.data
            })
        }
      }
    }
  },
  created () {
    this.loadCallback(this.$route.params.id)
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
