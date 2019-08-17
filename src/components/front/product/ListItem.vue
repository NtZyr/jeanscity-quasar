<template>
    <div class="col-md-4 col-sm-6 col-xs-12 q-pb-lg">
        <q-card class="list-product shadow-0 full-height bg-transparent overflow-hidden">
            <template v-if="product.variants.length > 0" class="">
                <q-card-section class="info q-pt-none">
                    <ul class="absolute-top-left sizes">
                        <li @click="setActiveVariant(variant)" v-for="variant in product.variants" :key="variant.id">
                            {{ variant.values.dolore_sunt }}44
                        </li>
                    </ul>
                    <product-thumbnail/>
                    <q-badge class="no-border-radius sale-badge" color="red-8" floating v-if="activeVariant.sale > 0 && activeVariant.sale_price !== 0">
                        {{ activeVariant.sale }}%
                    </q-badge>
                    <div class="row q-pt-xs items-end">
                        <template v-if="activeVariant.sale > 0 && activeVariant.sale_price > 0">
                            <span class="text-bold sale price">{{ activeVariant.sale_price }} руб.</span>
                            <q-space/>
                            <span class="text-bold old price">{{ activeVariant.price }} руб.</span>
                        </template>
                        <template v-else>
                            <span class="text-bold price">{{ activeVariant.price }} руб.</span>
                        </template>
                    </div>
                    <router-link :to="{ name: 'product', params: { product_slug: product.slug } }" class="text-h6 product-name text-black">{{ product.name }}</router-link>
                </q-card-section>
            </template>
            <template v-else>
                <q-card-section class="bg-white text-center full-height">
                    <span>
                        <q-icon color="red-2" size="40px" name="highlight_off"/></br>
                        <span class="text-red-8">Этот товар отобразился по ошибке</span>
                    </span>
                </q-card-section>
            </template>
        </q-card>
    </div>
</template>

<script>
import { STORAGE_URL } from '../../../api'
import ProductThumbnail from './Thumbnail'

export default {
  name: 'ListItem',
  components: { ProductThumbnail },
  data () {
    return {
      activeVariant: {}
    }
  },
  props: {
    product: Object
  },
  computed: {
    storageLink () {
      return STORAGE_URL
    }
  },
  methods: {
    setActiveVariant (variant) {
      this.activeVariant = variant
    }
  },
  created () {
    this.activeVariant = this.product.variants[0]
  }
}
</script>

<style lang="stylus" scoped>
    .list-product
        .sizes
            opacity 0
            transition .3s
            z-index 99
            list-style none
            margin 0
            padding 0
            max-height 270px
            display flex
            flex-direction column
            flex-wrap wrap
            li
                background-color #000
                margin-bottom 2px
                color #FFF
                opacity 0.4
                padding 4px 10px
                font-size 16px
                font-weight 600
                cursor pointer
                margin 2px 0 0 2px
        &:hover
            background-color white !important
            transition all .3s ease
            box-shadow 0px 4px 15px rgba(0, 0, 0, 0.25) !important
            .sizes
                opacity 1
        .sale-badge
            top 10px
            right 26px
            font-size 16px
            line-height 22px
        .info
            .product-name
                font-size 16px
                font-weight normal
                text-decoration none
            .price
                font-size 20px
                color #3C3C3C
                &.sale
                    color #B61118
                &.old
                    text-decoration line-through
                    font-size 16px
                    color #868686
</style>
