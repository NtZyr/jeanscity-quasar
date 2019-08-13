<template>
    <div>
        <q-expansion-item
                expand-separator
                label="Цена"
                class="bg-white expansion-item"
                default-opened
                v-if="range.min !== null && range.max !== null"
        >
            <product-price
                    :range="range"
            />
        </q-expansion-item>
        <q-expansion-item
                v-for="attribute in attributes"
                :key="attribute.id"
                :label="attribute.name"
                expand-separator
                class="bg-white expansion-item"
        >
            <q-card>
                <component
                        :values="filter[attribute.slug]"
                        :attribute="attribute"
                        :is="`type-${attribute.type}`"
                />
            </q-card>
        </q-expansion-item>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'
import TypeColor from './type/Color'
import TypeText from './type/Text'
import ProductPrice from './Price'

export default {
  name: 'FiltersDesktop',
  components: {
    TypeColor,
    TypeText,
    ProductPrice
  },
  data () {
    return {
      attributes: [],
      range: {},
      model: null
    }
  },
  watch: {
    filter: {
      handler (value) {
        this.debouncedProductFilter()
        this.categoryAttributes({ categories: value.categories })
          .then(response => {
            this.attributes = response.data.data
          })
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters({
      products: 'products/list',
      filter: 'filter/filter'
    })
  },
  methods: {
    ...mapActions({
      productIndex: 'products/index',
      categoryAttributes: 'attributes/index',
      filterPrice: 'filter/price'
    }),
    productFilter () {
      this.productIndex(this.filter)
        .then(response => {
          this.meta = response.data.meta
          this.range = response.data.prices
        })
    },
  },
  created () {
    this.debouncedProductFilter = _.debounce(this.productFilter, 500)
  }
}
</script>

<style lang="stylus" scoped>
    .expansion-item
        z-index 99
        font-weight 500
        font-size 16px
        .filter
            font-size 14px
            font-weight 400
        .q-item
            padding 8px 24px 8px 36px
        p
            font-size 13px
        .q-item__section--main
            padding-left 16px
</style>
