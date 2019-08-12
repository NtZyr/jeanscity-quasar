<template>
    <div class="q-py-md q-px-none row container items-start q-col-gutter-x-lg">
        <div class="col-md-3 col-sm-4 col-xs-12 q-mb-xs-xl">
            <div class="expansion-shadow sm-hide md-hide lg-hide xl-hide">
                <q-expansion-item
                        class="bg-white expansion-item"
                        icon="sort"
                        label="Фильтры"
                        default-opened
                        dense-toggle
                >
                    <q-separator />
                    <q-expansion-item
                            expand-separator
                            label="Цена"
                            class="bg-white expansion-item"
                    >
                        <q-card>
                            <q-card-section class="row q-px-xs q-py-sm filter">
                                <div class="col-12 q-px-md">
                                    <q-range
                                            v-model="standard"
                                            :min="0"
                                            :max="200000"
                                    />
                                </div>

                                <div class="col-12 items-center q-col-gutter-none">
                                    <div class="row items-center">
                                        <div class="col-md-6 col-xs-12 flex items-center justify-center">
                                            <p class="no-margin q-pr-sm">от</p>
                                            <q-input
                                                    v-model.number="standard.min"
                                                    type="number"
                                                    style="max-width: 65px"
                                            />
                                            <p class="no-margin">&#8381;</p>
                                        </div>
                                        <div class="col-md-6 col-xs-12 flex items-center justify-center">
                                            <p class="no-margin q-pr-sm">до</p>
                                            <q-input
                                                    v-model.number="standard.max"
                                                    type="number"
                                                    style="max-width: 65px;"
                                            />
                                            <p class="no-margin">&#8381;</p>
                                        </div>

                                    </div>
                                </div>
                                <q-checkbox v-model="sale" label="Скидки" class="col-12 q-py-sm"/>
                            </q-card-section>
                        </q-card>
                    </q-expansion-item>
                </q-expansion-item>
            </div>
            <div class="expansion-shadow xs-hide">
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
        </div>
        <div class="row q-col-gutter-x-sm items-stretch col-md-9 col-sm-8 col-xs-12 product-items">
            <template v-if="products.length > 0">
                <list-item
                        v-for="product in products"
                        :key="product.id"
                        :product="product"
                />
            </template>
            <template v-else>
                Товары не найдены
            </template>
<!--            <div class="row justify-between q-pb-md">-->
<!--                <h1 class="text-uppercase text-h6 heading">Все товары</h1>-->
<!--                <q-select dense outlined v-model="model" :options="options" label="Сортировать" />-->
<!--            </div>-->
<!--            <div class="row q-col-gutter-x-lg">-->
<!--                <div class="col-md-4 col-sm-6 col-xs-12 q-pb-lg product-hover" v-for="product in products">-->
<!--                    <router-link :to="product.slug" style="text-decoration: none; color: #3C3C3C;">-->
<!--                        <div class="focused-item">-->
<!--                            <div class="bg-white q-mb-sm flex items-center relative-position card-item">-->
<!--                                <div class="column wrap sizes" style="position:absolute; top: 4px; left: 4px;">-->
<!--                                    <div class="bg-black text-white sizes-item" v-for="size in sizes">{{size}}</div>-->
<!--                                </div>-->
<!--                                <div class="sail-label" v-show="product.sale">{{ product.sale }}%</div>-->
<!--                                <img src="" width="100%" alt="">-->
<!--                            </div>-->
<!--                            <div class="info">-->
<!--                                <div class="flex">-->
<!--                                    <div class="text-weight-bold price" :class="{ 'sail': item.sail}" v-show="item.sail">{{item.price}} руб.</div>-->
<!--                                    <div class="text-weight-bold price" :class="{ 'not-sail': item.sail}">{{item.price}} руб.</div>-->
<!--                                </div>-->
<!--                                <p class="no-margin q-pb-sm">{{item.name}}</p>-->
<!--                                <div class="text-h6 q-pb-lg">{{item.type}}</div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </router-link>-->
<!--                </div>-->
<!--            </div>-->
        </div>
    </div>
</template>

<style lang="stylus" scoped>
    .card-item
        padding 2px
    .content-margin
        margin-top 44px
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

<script>
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'
import ListItem from '../components/front/product/ListItem'
import TypeColor from '../components/front/attribute/type/Color'
import TypeText from '../components/front/attribute/type/Text'
import ProductPrice from '../components/front/attribute/Price'

export default {
  components: {
    ListItem,
    TypeColor,
    TypeText,
    ProductPrice
  },
  data () {
    return {
      attributes: [],
      range: {},
      tab: 'mails',
      pageNumber: 1,
      size: 9,
      standard: {
        min: 10,
        max: 111175
      },
      model: null,
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ],
      sizes: ['xs', 's', 'm', 'l', 'xl', 's', 'm', 'l', 'xl', 's', 'm', 'l', 'xl', 'xl', 's', 'm', 'l', 'xl']
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
