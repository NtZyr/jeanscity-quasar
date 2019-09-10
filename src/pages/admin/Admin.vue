<template>
    <q-layout view="lhh lpR lFf" class="bg-blue-grey-1">
        <q-header class="bg-blue-grey-2 text-black q-pl-lg q-pr-lg">
            <q-toolbar class="q-gutter-lg">
                <q-btn dense flat round icon="menu" @click="left = !left" />
                <q-breadcrumbs active-color="blue-10">
                    <q-breadcrumbs-el :to="breadcrumb.path" v-for="breadcrumb in breadcrumbs" :key="breadcrumb.path" :label="breadcrumb.meta.label" />
                </q-breadcrumbs>
                <q-space/>
                <q-btn @click="help = true" flat color="grey-8" dark icon="help" label="Помощь"/>
            </q-toolbar>
        </q-header>
        <q-drawer v-model="left" side="left" bordered>
            <q-сard>
                <q-item>
                    <q-item-section>
                        <q-item-label>{{ auth.full_name }}</q-item-label>
                        <q-item-label caption>{{ auth.role.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                        <q-btn @click="logoutRedirect" color="red" round flat icon="logout"/>
                    </q-item-section>
                </q-item>
            </q-сard>
            <q-separator></q-separator>
            <q-list>
                <q-item clickable to="/admin">
                    <q-item-section>Статистика</q-item-section>
                </q-item>
                <q-item clickable to="/admin/callbacks">
                    <q-item-section>Обратная связь</q-item-section>
                    <q-item-section side><q-badge align="top" color="red">{{ unanswered }}</q-badge></q-item-section>
                </q-item>
                <q-item to="/admin/orders">
                    <q-item-section>Заказы</q-item-section>
                    <q-item-section side><q-badge align="top" color="red">{{ onhold }}</q-badge></q-item-section>
                </q-item>
                <q-item clickable to="/admin/customers">
                    <q-item-section>Покупатели</q-item-section>
                </q-item>
                <template v-if="auth.role.name === 'admin' || auth.role.name === 'superadmin'">
                    <q-item to="/admin/categories">
                        <q-item-section>
                            Категории
                        </q-item-section>
                        <q-item-section side>
                            <q-btn to="/admin/categories/new" unelevated color="primary" outline icon="add" size="sm" round></q-btn>
                        </q-item-section>
                    </q-item>
                    <q-item to="/admin/attributes">
                        <q-item-section>
                            Атрибуты
                        </q-item-section>
                        <q-item-section side>
                            <q-btn to="/admin/attributes/new" unelevated color="primary" outline icon="add" size="sm" round></q-btn>
                        </q-item-section>
                    </q-item>
                    <q-item to="/admin/products">
                        <q-item-section>
                            Товары
                        </q-item-section>
                        <q-item-section side>
                            <q-btn to="/admin/products/new" unelevated color="primary" outline icon="add" size="sm" round></q-btn>
                        </q-item-section>
                    </q-item>
                    <q-item to="/admin/shippings">
                        <q-item-section>
                            Методы доставки
                        </q-item-section>
                        <q-item-section side>
                            <q-btn to="/admin/shippings/new" unelevated color="primary" outline icon="add" size="sm" round></q-btn>
                        </q-item-section>
                    </q-item>
                    <q-expansion-item
                        to="/admin/homepage/"
                        label="Главная страница"
                    >
                        <q-item-section>
                            <q-list class="bg-grey-2">
                                <q-item to="/admin/homepage/slider">
                                    <q-item-section>
                                        Слайдер
                                    </q-item-section>
                                    <q-item-section side>
                                        <q-btn to="/admin/homepage/slider/new" unelevated color="primary" outline icon="add" size="sm" round/>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-item-section>
                    </q-expansion-item>
<!--                    <q-item to="/admin/homepage">-->
<!--                        <q-item-section>-->
<!--                            Главная страница-->
<!--                        </q-item-section>-->
<!--                    </q-item>-->
                    <q-item to="/admin/mails">
                        <q-item-section>
                            Email-рассылка
                        </q-item-section>
                        <q-item-section side>
                            <q-btn to="/admin/mails/new" unelevated color="primary" outline icon="add" size="sm" round></q-btn>
                        </q-item-section>
                    </q-item>
                    <q-item to="/admin/users">
                        <q-item-section>
                            Пользователи
                        </q-item-section>
                        <q-item-section side>
                            <q-btn to="/admin/users/new" unelevated color="primary" outline icon="add" size="sm" round></q-btn>
                        </q-item-section>
                    </q-item>
                </template>
            </q-list>
        </q-drawer>
        <q-page-container>
            <q-page>
                <transition name="fade" mode="out-in">
                    <router-view/>
                </transition>
            </q-page>
        </q-page-container>
        <q-dialog
                v-model="help"
                persistent
                :maximized="true"
                transition-show="slide-up"
                transition-hide="slide-down"
        >
            <q-card>
                <q-bar style="z-index: 100" class="fixed full-width">
                    <q-space />
                    <q-btn dense flat icon="close" v-close-popup>
                        <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
                    </q-btn>
                </q-bar>
                <q-card-section class="q-pt-lg q-pb-none q-pl-none q-pr-none full-height">
                    <div class="row full-height">
                        <div class="col-3 bg-grey-2 full-height">
                            <q-list>
                                <q-item clickable>
                                    <q-item-section>
                                        Создание товаров
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </div>
                        <div class="col-9">
                            Контент
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>
    </q-layout>
</template>

<style lang="scss" scoped>
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

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Admin',
  data () {
    return {
      help: false,
      left: true,
    }
  },
  computed: {
    ...mapGetters({
      auth: 'auth/authUser',
      unanswered: 'callbacks/unanswered',
      onhold: 'orders/onhold',
    }),
    breadcrumbs () {
      return this.$route.matched
    }
  },
  methods: {
    ...mapActions({
      login: 'auth/login',
      logout: 'auth/logout',
      callbacksUnanswered: 'callbacks/unanswered',
      ordersOnHold: 'orders/onhold'
    }),
    logoutRedirect () {
      this.logout()
        .then(response => {
          this.$router.push('/login')
        })
    }
  },
  created () {
    this.callbacksUnanswered()
    this.ordersOnHold()
  }
}
</script>
