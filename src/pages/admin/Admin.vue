<template>
    <q-layout view="lhh lpR lFf" class="bg-blue-grey-1">
        <q-header class="bg-blue-grey-14">
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="left = !left" />
                <q-breadcrumbs>
                    <q-breadcrumbs-el label="Home" />
                    <q-breadcrumbs-el label="Components" />
                    <q-breadcrumbs-el label="Breadcrumbs" />
                </q-breadcrumbs>
            </q-toolbar>
        </q-header>
        <q-drawer v-model="left" side="left" bordered>
            <q-сard>
                <q-item>
                    <q-item-section>
                        <q-item-label>{{ auth.full_name }}</q-item-label>
                        <q-item-label caption>{{ auth.role.label }}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-сard>
            <q-separator></q-separator>
            <q-list>
                <q-item clickable to="/admin">
                    <q-item-section>Статистика</q-item-section>
                </q-item>
                <q-item clickable to="/">
                    <q-item-section>Обратная связь</q-item-section>
                    <q-item-section side><q-badge align="top" color="red">1</q-badge></q-item-section>
                </q-item>
                <q-item to="/">
                    <q-item-section>Заказы</q-item-section>
                    <q-item-section side><q-badge align="top" color="red">20</q-badge></q-item-section>
                </q-item>
                <template v-if="auth.role.name === 'admin'">
                    <q-item to="/admin/categories">
                        <q-item-section>
                            Категории
                        </q-item-section>
                        <q-item-section side>
                            <q-btn to="/admin/categories/new" unelevated color="primary" outline icon="add" size="sm" round></q-btn>
                        </q-item-section>
                    </q-item>
                    <q-item to="/">
                        <q-item-section>
                            Атрибуты
                        </q-item-section>
                        <q-item-section side>
                            <q-btn unelevated color="primary" outline icon="add" size="sm" round></q-btn>
                        </q-item-section>
                    </q-item>
                    <q-item to="/admin/products">
                        <q-item-section>
                            Товары
                        </q-item-section>
                        <q-item-section side>
                            <q-btn unelevated color="primary" outline icon="add" size="sm" round></q-btn>
                        </q-item-section>
                    </q-item>
                    <q-item to="/">
                        <q-item-section>
                            Email-рассылка
                        </q-item-section>
                        <q-item-section side>
                            <q-btn unelevated color="primary" outline icon="add" size="sm" round></q-btn>
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
      left: true
    }
  },
  computed: {
    ...mapGetters({
      auth: 'auth/authUser'
    })
  },
  methods: {
    ...mapActions({
      login: 'auth/login'
    })
  },
  created () {
    this.login({
      email: 'nikitos@228.su',
      password: '1234qwer'
    })
  }
}
</script>
