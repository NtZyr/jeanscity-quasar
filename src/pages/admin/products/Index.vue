<template>
    <div class="row q-col-gutter-lg">
        <div class="col-12">
            <q-table
                    :data="products"
                    selection="multiple"
                    :columns="columns"
                    :selected.sync="selected"
                    title="Товары"
            >
                <template v-slot:top>
                    <div class="row full-width">
                        <h1 class="text-h6 q-ma-none">Товары</h1>
                        <q-space />
                        <q-btn to="/admin/products/new" outline dense unelevated color="primary" label=" Добавить" icon="add"/>
                        <template v-if="selected.length === 1">
                            <q-btn flat dense color="primary" :disable="loading" label="Редактировать товар" :to="`/admin/products/edit/${selected[0].slug}`" />
                        </template>
                        <template v-if="selected.length > 0">
                            <q-btn class="on-right" flat dense color="negative" :disable="loading" label="Удалить товары" @click="confirm = true" />
                        </template>
                    </div>
                    <q-form class="row full-width q-pt-sm">
                        <q-input
                                class="q-pr-sm"
                                outlined
                                dense
                                label="Артикул"
                                v-model="filter.sku"
                        >
                            <template v-slot:append>
                                <q-icon name="search" />
                            </template>
                        </q-input>
                        <q-btn unelevated color="grey-3" text-color="black" label="Категории">
                            <q-menu>
                                <options-list
                                        itemType="q-expansion-item"
                                        :categories="cats"
                                        :value="filter.categories"
                                        groupType="checkbox"
                                        v-on:changeValue="filter.categories = $event"
                                        :editable="false"
                                />
                            </q-menu>
                        </q-btn>
                        <q-space/>
                        <q-btn
                                unelevated
                                v-if="attrs"
                                label="Атрибуты"
                        >
                            <q-menu anchor="bottom right" self="top right">
                                <q-list>
                                    <q-item
                                            v-for="attr in attrs"
                                            :key="attr.id"
                                    >
                                        <q-item-section class="q-pa-none">
                                            <component
                                                    :value="filter[attr.slug]"
                                                    :attribute="attr"
                                                    :is="`type-${attr.type}`"
                                                    v-on:changeValue="acceptAttributes(attr.slug, $event)"
                                            />
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </q-menu>
                        </q-btn>
                        <q-btn
                                color="grey-3"
                                unelevated
                                icon="filter_list"
                                text-color="black"
                                label="Фильтр"
                        >
                            <q-menu anchor="bottom right" self="top right">
                                <q-list>
                                    <q-item style="width:200px">
                                        <q-item-section side>
                                            <span>Цена</span>
                                        </q-item-section>
                                        <q-item-section>
                                            <q-range
                                                    v-model="filter.price"
                                                    :min="0"
                                                    :max="50"
                                            />
                                        </q-item-section>
                                    </q-item>
                                    <q-item>
                                        <q-checkbox
                                                label="В продаже"
                                                v-model="filter.inSale"
                                        />
                                    </q-item>
                                    <q-item>
                                        <q-checkbox
                                                label="Скидка"
                                                v-model="filter.sale"
                                        />
                                    </q-item>
                                    <q-item>
                                        <q-checkbox
                                                label="В наличии"
                                                v-model="filter.stocking"
                                        />
                                    </q-item>
                                </q-list>
                            </q-menu>
                        </q-btn>
                    </q-form>
                </template>
            </q-table>
        </div>
        <q-dialog v-model="confirm" persistent>
            <q-card>
                <q-card-section class="row items-center">
                    <span class="q-ml-sm">Удалить выбранные товары со всеми вариациями?.</span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Нет" color="primary" v-close-popup />
                    <q-btn flat @click="removeRows" label="Да" color="negative" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'
import OptionsList from '../../../components/admin/category/OptionsList'
import TypeColor from '../../../components/admin/attribute/type/Color'
import TypeText from '../../../components/admin/attribute/type/Text'

export default {
  name: 'ProductsIndex',
  components: {
    OptionsList,
    TypeColor,
    TypeText
  },
  watch: {
    filter: {
      handler (value) {
        this.filter = value
        this.debouncedProductIndex()
        this.debouncedCategoryAttributes()
      },
      deep: true
    }
  },
  data () {
    return {
      confirm: false,
      loading: false,
      cats: [],
      attrs: [],
      filter: {
        page: 1,
        rowsPerPage: 10,
        categories: [],
        inSale: true,
        sale: false,
        stocking: true,
        price: {
          min: 0,
          max: 30
        }
      },
      selected: [],
      columns: [
        {
          name: 'name',
          label: 'Название',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`
        },
        {
          name: 'categories_list',
          label: 'Категории',
          align: 'left',
          field: row => row.categories_list,
          format: val => val.map(category => { return `${category.name}, ` })
        },
        {
          name: 'variations',
          label: 'Вариаций товара',
          align: 'right',
          field: row => row.variants,
          format: val => `${val.length}`
        },
        {
          name: 'views',
          label: 'Просмотры',
          align: 'right',
          field: row => row.views,
          format: val => `${val}`
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      products: 'products/list'
    }),
    attrFilter () {
      return {
        categories: this.filter.categories
      }
    }
  },
  methods: {
    ...mapActions({
      productsIndex: 'products/index',
      productDestroy: 'products/destroy',
      categories: 'categories/parents',
      attributes: 'attributes/index'
    }),
    editProduct (productId) {
      this.$router.push(`/admin/products/edit/${productId}`)
    },
    removeRows () {
      this.selected.forEach(product => {
        this.productDestroy(product.slug)
      })
    },
    acceptAttributes (attr, value) {
      this.filter[attr] = value
      this.debouncedProductIndex()
    },
    filterProducts () {
      this.productsIndex(this.filter)
    },
    filterAttributes () {
      this.attributes(this.attrFilter)
        .then(response => {
          this.attrs = response.data.data
        })
    }
  },
  created () {
    this.debouncedProductIndex = _.debounce(this.filterProducts, 500)
    this.debouncedCategoryAttributes = _.debounce(this.filterAttributes, 500)
    this.debouncedProductIndex()
    this.debouncedCategoryAttributes()
    this.categories({ return: 'parents' })
      .then(response => {
        this.cats = response.data.data
      })
  }
}
</script>

<style scoped>

</style>
