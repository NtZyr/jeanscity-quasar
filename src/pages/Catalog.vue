<template>
    <div class="q-py-md q-px-none row container items-start q-col-gutter-x-lg">
        <div class="col-md-3 col-sm-4 col-xs-12 q-mb-xs-xl">
          <div class="expansion-shadow" v-if="!$q.screen.xs">
            <filters></filters>
          </div>
          <div class="expansion-shadow" v-if="$q.screen.xs">
            <q-expansion-item
                    class="bg-white expansion-item"
                    icon="sort"
                    label="Фильтры"
                    dense-toggle
            >
              <q-separator />
              <filters></filters>
            </q-expansion-item>
          </div>
        </div>
        <div class="row q-col-gutter-x-sm items-stretch col-md-9 col-sm-8 col-xs-12 product-items">
            <template v-if="products.length > 0">
                <list-item
                      v-for="product in products"
                      :key="product.id"
                      :product="product"
                />
                <q-pagination
                      :max="meta.last_page"
                      :direction-links="true"
                      v-model="meta.current_page"
                      :maxPages="5"
                      class="full-width justify-sm-end justify-xs-center"
                      @input="preFilterPage"
                />
            </template>
            <template v-else>
                Товары не найдены
            </template>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'
import ListItem from '../components/front/product/ListItem'
import Filters from '../components/front/attribute/Filters'

export default {
  components: {
    ListItem,
    Filters
  },
  data () {
    return {
      attributes: [],
      meta: {},
      model: null,
    }
  },
  watch: {
    filter: {
      handler (value) {
        this.debouncedProductFilter()
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
      filterPage: 'filter/page',
      filterAttrs: 'filter/attrs'
      // filterPrice: 'filter/price'
    }),
    preFilterPage (value) {
      if (typeof value === 'number') {
        console.log(typeof value)
        this.filterPage(value)
      }
    },
    productFilter () {
      this.productIndex(this.filter)
        .then(response => {
          this.meta = response.data.meta
          // this.range = response.data.prices
        })
      this.categoryAttributes({ categories: this.filter.categories })
        .then(response => {
          this.filterAttrs(response.data.data)
        })
    },
  },
  created () {
    this.debouncedProductFilter = _.debounce(this.productFilter, 500)
  }
}
</script>

<style lang="stylus" scoped>
    .expansion-shadow
        box-shadow 0px 4px 15px rgba(0, 0, 0, 0.25)
        color #3C3C3C
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
    .product-items
        .heading
            font-size 20px
            margin 0
            color #3C3C3C
            font-weight normal
        .text-h5
            font-size 20px
        .text-h6
            font-size 16px
        p
            color #3C3C3C
            font-weight 300
    .sail-label
        background #CC0008
        padding 3px 5px
        display initial
        color #fff
        font-weight 700
        position absolute
        right 8px
        top 8px
    .product-hover:hover
        z-index 100
    .focused-item:hover
        box-shadow 0px 4px 15px rgba(0, 0, 0, 0.25)
        background #fff
        transform scale(1.15)
        transition transform .3s ease
        border-radius 4px
        .info
            padding-left 10px
            transition padding-left .3s ease
        .sizes
            display flex
    .price
        font-size 20px
        color #3C3C3C
    .sail
        color #B61118
        padding-right 15px
        font-size 20px
    .not-sail
        display flex
        align-items center
        font-size 16px
        color #868686
        text-decoration line-through
    .sizes
        display none
        height 99%
    .sizes-item
        padding 5px 10px
        margin-bottom 1px
        margin-right 1px
        font-weight 700
        text-align center
        opacity .5

    @media (max-width $breakpoint-sm)
        .focused-item:hover
            transform scale(1.1)

    @media (max-width $breakpoint-xs)
        .focused-item:hover
            transform scale(1.05)
</style>
