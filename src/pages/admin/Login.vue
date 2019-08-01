<template>
    <q-layout class="bg-grey-2">
        <q-page-container>
            <q-page>
                <div class="row justify-center items-center" style="height: 100vh">
                    <div class="col-sm-6 col-xs-12 col-md-3">
                        <router-link to="/" class="logo-link"><img src="/statics/images/logo.svg" alt=""></router-link>
                        <q-form
                            @submit="loginRedirrect"
                        >
                            <q-card>
                                <q-card-section>
                                    <q-input
                                        v-model="credentials.email"
                                        label="Email"
                                    />
                                    <q-input
                                        type="password"
                                        v-model="credentials.password"
                                        label="Пароль"
                                    />
                                    <q-checkbox
                                        v-model="credentials.remember"
                                        label="Запомнить"
                                    />
                                </q-card-section>
                                <q-card-actions>
                                    <q-space/>
                                    <q-btn
                                        unelevated
                                        type="submit"
                                        label="Войти"
                                        color="primary"
                                    />
                                </q-card-actions>
                            </q-card>
                        </q-form>
                    </div>
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AdminLogin',
  data () {
    return {
      credentials: {
        remember: false
      }
    }
  },
  methods: {
    ...mapActions({
      login: 'auth/login'
    }),
    loginRedirrect () {
      this.login(this.credentials)
        .then(response => {
          this.$router.push('/admin')
        })
    }
  }
}
</script>

<style scoped>
    .logo-link {
        width: 100%;
        display: inline-block;
        margin-bottom: 20px;
        text-align: center;
    }
</style>
