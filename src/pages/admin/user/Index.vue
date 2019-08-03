<template>
    <div class="q-pa-lg">
        <div class="row q-col-gutter-lg">
            <div class="col-lg-6">
                <h1 class="text-h6">Пользователи</h1>
                <q-expansion-item label="Фильтр" icon="filter_list" class="shadow-1 bg-white rounded-borders q-mb-lg">
                    <q-card>
                        <q-card-section class="q-pa-md">
                            <q-form
                                @submit="filterUsers"
                                @reset="resetFilter"
                                class="q-gutter-md"
                            >
                                <q-select
                                    outlined
                                    emit-value
                                    map-options
                                    label="Роль"
                                    v-model="filter.role"
                                    :options="localRoles"
                                />
                                <q-input
                                    outlined
                                    v-model="filter.name"
                                    label="Имя"
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
                <template v-if="issetUsers">
                    <q-list bordered class="rounded-borders bg-white">
                        <template
                            v-for="user in users"
                        >
                            <q-item
                                :key="user.id"
                            >
                                <q-item-section>
                                    <q-item-label>{{ user.full_name }}</q-item-label>
                                    <q-item-label caption>{{ user.role.label }}</q-item-label>
                                </q-item-section>
                                <q-item-section side>
                                    <q-btn-group outline rounded>
                                        <q-btn size="sm" :to="`/admin/users/edit/${user.id}`" outline color="primary" round icon="edit"/>
                                        <template v-if="auth.role.name === 'superadmin'">
                                            <q-btn size="sm" @click="confirmDelete(user)" outline color="negative" round icon="delete"/>
                                        </template>
                                    </q-btn-group>
                                </q-item-section>
                            </q-item>
                            <q-separator/>
                        </template>
                    </q-list>
                </template>
                <template v-else>
                    <span>Пользователи не найдены</span>
                </template>
            </div>
            <q-dialog v-model="confirm" persistent>
                <q-card>
                    <q-card-section class="row items-center">
                        <template v-if="localUser">
                            <span>Удалить пользователя {{ localUser.full_name }}?</span>
                        </template>
                    </q-card-section>

                    <q-card-actions align="right">
                        <q-btn flat label="Отмена" color="primary" v-close-popup />
                        <q-btn flat label="Удалить" @click="deleteUser" color="negative" v-close-popup />
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
  name: 'UserIndex',
  data () {
    return {
      confirm: false,
      filter: {},
      localRoles: [],
      localUser: {}
    }
  },
  computed: {
    ...mapGetters({
      auth: 'auth/authUser',
      users: 'users/list',
      roles: 'users/roles'
    }),
    issetUsers () {
      return Object.keys(this.users).length > 0
    }
  },
  methods: {
    ...mapActions({
      usersRoles: 'users/roles',
      usersIndex: 'users/index',
      userDestroy: 'users/destroy'
    }),
    filterUsers () {
      this.usersIndex(this.filter)
    },
    resetFilter () {
      this.filter = {}
      this.usersIndex(this.filter)
    },
    confirmDelete (user) {
      this.localUser = user
      this.confirm = !!confirm
    },
    deleteUser () {
      this.userDestroy(this.localUser.id)
    }
  },
  created () {
    this.filterUsers()
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
