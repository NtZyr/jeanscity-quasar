<template>
    <q-form @submit="confirmForm">
        <template v-if="userId">
            <h2 class="text-h6">Редактирование пользователя</h2>
        </template>
        <template v-else>
            <h2 class="text-h6">Создание нового пользователя</h2>
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
                    v-model="localUser.last_name"
                    label="Фамилия"
                    lazy-rules
                    :rules="rules.last_name"
                />
                <q-input
                    v-model="localUser.first_name"
                    label="Имя"
                    lazy-rules
                    :rules="rules.first_name"
                />
                <q-input
                    v-model="localUser.email"
                    label="Почта"
                    lazy-rules
                    :rules="rules.email"
                />
                <q-input
                    v-model="localUser.phone"
                    label="Телефон"
                    lazy-rules
                    :rules="rules.phone"
                />
                <q-select
                    emit-value
                    map-options
                    v-model="localUser.role_id"
                    label="Роль"
                    :options="localRoles"
                    lazy-rules
                    :rules="rules.phone"
                />
            </q-card-section>
            <q-separator/>
            <q-card-actions>
                <q-btn to="/admin/users" unelevated>Отменить</q-btn>
                <q-space/>
                <q-btn type="submit" unelevated color="primary">Сохранить</q-btn>
            </q-card-actions>
        </q-card>
    </q-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserForm',
  data () {
    return {
      userId: null,
      localUser: {},
      localMessage: {},
      localErrors: [],
      localRoles: [],
      rules: {
        last_name: [ value => !!value || 'Поле обязательно' ],
        first_name: [ value => !!value || 'Поле обязательно' ],
        email: [ value => !!value || 'Поле обязательно' ],
        phone: [ value => !!value || 'Поле обязательно' ],
        role_id: [ value => !!value || 'Поле обязательно' ]
      }
    }
  },
  watch: {
    '$route.params.id': function (userId) {
      this.loadUser(userId)
    },
    localMessage (value) {
      setTimeout(() => {
        this.localMessage = {}
      }, 2000)
    }
  },
  computed: {
    ...mapGetters({
      roles: 'users/roles',
      message: 'users/message',
      errors: 'users/errors'
    })
  },
  methods: {
    ...mapActions({
      usersRoles: 'users/roles',
      userShow: 'users/show',
      userStore: 'users/store',
      userUpdate: 'users/update'
    }),
    loadUser (userId) {
      this.localUser = {}
      if (userId !== 'undefined') {
        this.userId = userId

        if (this.userId) {
          this.userShow(this.userId)
            .then(response => {
              this.localUser = response.data.data
            })
        }
      }
    },
    confirmForm () {
      if (this.userId) {
        this.userUpdate(this.localUser)
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
        this.userStore(this.localUser)
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
  created () {
    this.loadUser(this.$route.params.id)
    this.usersRoles()
      .then(response => {
        this.localRoles = response.data.data
      })
  }
}
</script>

<style scoped>
    .fade-enter {
        opacity: 0;
    }

    .fade-enter-active {
        transition: opacity .3s ease;
    }

    .fade-leave {}

    .fade-leave-active {
        transition: opacity .3s ease;
        opacity: 0;
    }
</style>
