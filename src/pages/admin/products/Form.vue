<template>
    <div class="row q-col-gutter-lg">
        <div class="col-6">
            <q-form
                    @submit="confirmProductForm"
            >
                <q-card>
                    <transition name="fade" mode="out-in">
                        <q-banner
                                v-if="productMessage.text"
                                inline-actions
                                :class="'text-white ' + ((productMessage.status === 200 || productMessage.status === 201) ? 'bg-positive' : 'bg-negative' )"
                        >
                            {{ productMessage.text }}
                        </q-banner>
                    </transition>
                    <q-card-section>
                        <h1 class="text-h6 q-mt-none">Информация о товаре</h1>
                        <q-separator/>
                        <q-input
                                label="Название"
                                v-model="product.name"
                        />
                        <q-input
                                label="Ссылка товара"
                                v-model="product.slug"
                        />
                        <q-input
                                label="Описание товара"
                                type="textarea"
                                v-model="product.description"
                        />
                        <q-separator class="q-mt-lg q-mb-lg"/>
                        <h6 class="q-ma-none">SEO</h6>
                        <q-input
                                label="Ключевые слова"
                                v-model="product.meta_keywords"
                        />
                        <q-input
                                label="Описание для поисковых систем"
                                v-model="product.meta_description"
                                type="textarea"
                        />
                        <q-separator class="q-mt-lg q-mb-lg"/>
                        <h6 class="q-ma-none q-mb-sm">Категории</h6>
                        <q-list bordered separator>
                            <q-expansion-item group="categories" v-for="category in cats" :label="category.label" :key="category.id">
                                <q-option-group
                                        :options="category.children"
                                        v-model="product.categories"
                                        type="checkbox"
                                />
                            </q-expansion-item>
                        </q-list>
                    </q-card-section>
                    <q-card-actions>
                        <q-btn to="/admin/products" outline label="Отмена"/>
                        <q-space/>
                        <q-btn type="submit" unelevated color="primary" label="Сохранить"/>
                    </q-card-actions>
                </q-card>
            </q-form>
        </div>
        <variants :variants="variants" :attributes="attrs" v-if="productId"></variants>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Variants from '../../../components/admin/products/Variants'

export default {
  name: 'Form',
  components: {
    Variants
  },
  data () {
    return {
      productId: null,
      product: {},
      productMessage: {},
      productErrors: [],
      cats: [],
      attrs: [],
      variants: []
    }
  },
  watch: {
    '$route.params.id': function (productId) {
      this.loadProduct(productId)
    },
    productMessage (value) {
      setTimeout(() => {
        this.productMessage = {}
      }, 2000)
    }
  },
  methods: {
    ...mapActions({
      productShow: 'products/show',
      productUpdate: 'products/update',
      productStore: 'products/store',
      variantIndex: 'variants/index',
      categories: 'categories/parents',
      categoryAttributes: 'attributes/index'
    }),
    loadProduct (productId) {
      this.product = {}
      if (productId !== 'undefined') {
        this.productId = productId

        if (this.productId) {
          this.productShow(this.productId)
            .then(response => {
              this.product = response.data.data
              this.categoryAttributes({ categories: this.product.categories })
                .then(response => {
                  this.attrs = response.data.data
                })
            })
          this.variantIndex(this.productId)
            .then(response => {
              this.variants = response.data.data
            })
        }
      }
    },
    confirmProductForm () {
      if (this.productId) {
        this.productUpdate(this.product)
          .then(
            response => {
              this.productMessage = {
                text: response.data.message,
                status: response.status
              }
              this.productErrors = []
            },
            error => {
              this.productMessage = {
                text: error.response.data.message,
                status: error.response.status
              }
              this.productErrors = error.response.data.errors
            })
      } else {
        this.productStore(this.product)
          .then(
            response => {
              this.productMessage = {
                text: response.data.message,
                status: response.status
              }
              this.productErrors = []
            },
            error => {
              this.productMessage = {
                text: error.response.data.message,
                status: error.response.status
              }
              this.productErrors = error.response.data.errors
            })
      }
    }
  },
  created () {
    this.loadProduct(this.$route.params.id)
    this.categories({ return: 'parents' })
      .then(response => {
        this.cats = response.data.data
      })
  }
}
</script>

<style scoped>

</style>
