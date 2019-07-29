<template>
    <div class="q-pa-lg">
        <div class="row q-col-gutter-lg">
            <div class="col-lg-6">
                <h1 class="text-h6">Категории</h1>
                <q-expansion-item label="Фильтр" icon="filter_list" class="shadow-1 bg-white rounded-borders q-mb-lg">
                    <q-card>
                        <q-card-section class="q-pa-md">
                            <q-form
                                @submit="filterCategories"
                                @reset="resetFilter"
                                class="q-gutter-md"
                            >
                                <q-option-group
                                    v-model="filter.return"
                                    :options="[
                                        {
                                            label: 'Все',
                                            value: 'all',
                                        },
                                        {
                                            label: 'Родители',
                                            value: 'parents',
                                        },
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
                <template v-if="issetCategories">
                    <component :categories="categories" v-bind:is="listComponent"></component>
                </template>
                <template v-else>
                    <span>Категории не найдены</span>
                </template>
            </div>
            <q-dialog v-model="confirm" persistent>
                <q-card>
                    <q-card-section class="row items-center">
                        <template v-if="localCategory">
                            <span>Удалить категорию {{ localCategory.name }}?</span>
                        </template>
                    </q-card-section>

                    <q-card-actions align="right">
                        <q-btn flat label="Отмена" color="primary" v-close-popup />
                        <q-btn flat label="Удалить" @click="deleteCategory" color="negative" v-close-popup />
                    </q-card-actions>
                </q-card>
            </q-dialog>
            <div class="col-lg-6">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AllList from '../../../components/admin/category/AllList'
import ParentsList from '../../../components/admin/category/ParentsList'

export default {
  name: 'CategoryIndex',
  data () {
    return {
      categoryId: null,
      filter: {
        return: 'all'
      },
      listComponent: null,
      localCategory: {},
      localMessage: {},
      localErrors: [],
      confirm: false
    }
  },
  components: {
    AllList,
    ParentsList
  },
  computed: {
    ...mapGetters({
      categories: 'categories/list'
    }),
    issetCategories () {
      return Object.keys(this.categories).length > 0
    }
  },
  methods: {
    ...mapActions({
      categoriesIndex: 'categories/index',
      destroyCategory: 'categories/destroy'
    }),
    filterCategories () {
      this.listComponent = ((this.filter.return !== 'parents') ? AllList : ParentsList)
      this.categoriesIndex(this.filter)
    },
    resetFilter () {
      this.filter = {}
      this.categoriesIndex(this.filter)
    },
    confirmDelete (category) {
      this.localCategory = category
      this.confirm = !!confirm
    },
    deleteCategory () {
      this.destroyCategory(this.localCategory.id)
    }
  },
  mounted () {
    this.filterCategories()
  }
}
</script>

<style scoped>

</style>
