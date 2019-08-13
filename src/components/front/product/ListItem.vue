<template>
    <div class="col-md-4 col-sm-6 col-xs-12 q-pb-lg">
        <q-card class="list-product shadow-0 full-height bg-transparent overflow-hidden">
            <template v-if="product.variants.length > 0">
                <q-card-section class="info q-pt-none">
                    <ul class="absolute-top-left sizes">
                        <li @click="setActiveVariant(variant)" v-for="variant in product.variants" :key="variant.id">
                            {{ variant.values.dolore_sunt }}
                        </li>
                    </ul>
                    <template v-if="typeof activeVariant.gallery !== 'undefined' && activeVariant.gallery.length > 0">
                        <q-img
                                style="width: 100%; height: 308px; border: 2px solid white;"
                                v-if="activeVariant.gallery.length > 0"
                                :src="`${storageLink}/${activeVariant.gallery[0].id}/${activeVariant.gallery[0].file_name}`"
                        />
                    </template>
                    <template v-else>
                        <div style="width: 100%; height: 308px; border: 2px solid white;" class="bg-grey-4 row justify-center items-center">
                            <q-icon
                                    color="grey-5"
                                    size="60px"
                                    name="clear"
                            />
                        </div>
                    </template>
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

export default {
  name: 'ListItem',
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
