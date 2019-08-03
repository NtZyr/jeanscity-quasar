<template>
    <div class="q-pa-lg">
        <div class="row q-col-gutter-lg">
            <div class="col-lg-6">
                <h1 class="text-h6">Атрибуты</h1>
                <q-expansion-item label="Фильтр" icon="filter_list" class="shadow-1 bg-white rounded-borders q-mb-lg">
                    <q-card>
                        <q-card-section class="q-pa-md">
                            <q-form
                                @submit="filterAttributes"
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
                <template v-if="issetAttributes">
                    <q-list bordered class="rounded-borders bg-white">
                        <template
                            v-for="attribute in attributes"
                        >
                            <q-item
                                :key="attribute.id"
                            >
                                <q-item-section>
                                    <q-item-label>{{ attribute.name }}</q-item-label>
                                </q-item-section>
                                <q-item-section side>
                                    <q-btn-group outline rounded>
                                        <q-btn size="sm" :to="`/admin/attributes/edit/${attribute.id}`" outline color="primary" round icon="edit"/>
                                        <q-btn size="sm" @click="confirmDelete(attribute)" outline color="negative" round icon="delete"/>
                                    </q-btn-group>
                                </q-item-section>
                            </q-item>
                            <q-separator/>
                        </template>
                    </q-list>
                </template>
                <template v-else>
                    <span>Атрибуты не найдены</span>
                </template>
            </div>
            <q-dialog v-model="confirm" persistent>
                <q-card>
                    <q-card-section class="row items-center">
                        <template v-if="attribute">
                            <span>Удалить атрибут {{ attribute.name }}?</span>
                        </template>
                    </q-card-section>

                    <q-card-actions align="right">
                        <q-btn flat label="Отмена" color="primary" v-close-popup />
                        <q-btn flat label="Удалить" @click="deleteAttribute" color="negative" v-close-popup />
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
  name: 'AttributeIndex',
  data () {
    return {
      confirm: false,
      filter: {},
      attribute: {}
    }
  },
  watch: {
    filter: {
      handler (value) {
        this.filter.page = value.page
        this.filterAttributes()
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters({
      attributes: 'attributes/list'
    }),
    issetAttributes () {
      return Object.keys(this.attributes).length > 0
    }
  },
  methods: {
    ...mapActions({
      attributeIndex: 'attributes/index',
      attributeDestroy: 'attributes/destroy'
    }),
    filterAttributes () {
      this.attributeIndex()
    },
    resetFilter () {
      this.filter = {
        page: 1
      }
      this.filterAttributes()
    },
    confirmDelete (attribute) {
      this.attribute = attribute
      this.confirm = true
    },
    deleteAttribute () {
      this.attributeDestroy(this.attribute.id)
    }
  },
  created () {
    this.filterAttributes()
  }
}
</script>

<style scoped>

</style>
