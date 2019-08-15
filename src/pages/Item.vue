<template>
    <div class="q-px-none container row q-col-gutter-x-lg">
        <div class="col-sm-12 col-xs-12">
            <div class="row q-col-gutter-x-lg">
                <div class="col-md-6 col-sm-12 col-xs-12 scroll-item flex no-wrap justify-between">
                    <div class="row full-width">
                        <q-scroll-area
                                class='col-md-2 col-sm-2 col-xs-2 offset-sm-1 offset-xs-0 q-pr-md-sm q-pr-sm-lg q-px-xs-none item-height'
                        >
                            <div class="item-image" v-for="(item, index) in small">
                                <img class='q-mb-sm-xl q-mb-xs-xs'
                                     :src="'../statics/images/' + item.img" width="100%"
                                     alt=""
                                     @click="changeImage(item.img)"
                                >
                            </div>
                        </q-scroll-area>
                        <img class="col-md-8 col-sm-6 col-xs-9 offset-1 item-height" :src="'../statics/images/' + image"
                             width="100%"
                             alt=""
                        >
                    </div>
                </div>
                <div class="col-md-6 col-sm-11 col-xs-12 offset-md-0 offset-sm-1 offset-xs-0 q-pt-lg">
                    <div class="row column-md row-sm row-xs q-col-gutter-x-sm">
                        <div class="col-md-12 col-sm-6 col-xs-12">
                            <h5 class="no-margin item-name">{{ product.name }}</h5>
                            <div class="text-subtitle1 q-pt-sm">Бренд: {{ activeVariant.values.brand }}</div>
                            <template v-if="activeVariant.sale_price > 0">
                                <div class="text-h6 q-pt-md price old">{{ activeVariant.price }} р.</div>
                                <div class="text-h6 q-pt-md price sale">{{ activeVariant.sale_price }} р.</div>
                            </template>
                            <template v-else>
                                <div class="text-h6 q-pt-md price">{{ activeVariant.price }} р.</div>
                            </template>
                            <div class="text-subtitle1 q-pt-md">Размер:</div>
                            <q-select
                                    map-options
                                    emit-value
                                    class="q-pb-md"
                                    outlined
                                    v-model="activeVariantId"
                                    style="max-width: 200px"
                                    :options="variantsSelect"
                                    label="Выберите размер"
                            />
                            <q-btn
                                    @click="itemStore(activeVariant)"
                                    color="red-8 item-btn"
                                    class="q-mb-xl q-mt-xl"
                                    label="Добавить в корзину"
                            />
                        </div>
                        <div class="col-md-12 col-sm-6 col-xs-12">
                            <div class="product-info q-pt-md-xl q-pt-sm-xs q-pb-xl q-mb-lg">
                                <div class="text-subtitle1 q-pb-md">О товаре:</div>
                                <p
                                        class="no-margin q-pb-sm"
                                        v-for="attribute in activeVariant.attributes"
                                        :key="attribute.id"
                                ><span>{{ attribute.name }}: </span>{{ attribute.value }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
    .item-height
        max-height 500px
    .text-subtitle1
        color #3C3C3C
        font-weight 300
    .item-name
        color #3C3C3C
    .item-btn
        width 250px
        height 49px
        font-weight 500
        font-size 18px
    .product-info
        color #3C3C3C
        font-size 16px
        span
            font-weight 300
    .price
        color #868686
        padding-top 0
        font-size 28px
        &.sale
            color #B61118
        &.old
            text-decoration line-through
    .q-scrollarea__thumb--v
        width 5px
    @media(max-width $breakpoint-xs)
        .item-height
            max-height 400px

</style>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      product: {},
      activeVariantId: null,
      image: 'image2.png',
      errors: [],
      // todo placeholder for gallery
      small: [
        {
          img: 'image.png'
        },
        {
          img: 'image2.png'
        },
        {
          img: 'image.png'
        },
        {
          img: 'image2.png'
        },
        {
          img: 'image2.png'
        },
        {
          img: 'image2.png'
        }
      ]
    }
  },
  beforeRouteEnter (to, from, next) {
    // todo запросить товар перед заходом?
    next()
  },
  watch: {
    '$route.params.product_slug': function (productSlug) {
      this.loadProduct(productSlug)
    }
  },
  computed: {
    variantsSelect () {
      return this.product.variants.map(variant => {
        return {
          value: variant.id,
          label: variant.values.nam_optio
        }
      })
    },
    activeVariant () {
      if (typeof this.product.variants !== 'undefined') {
        return this.product.variants.find(variant => {
          if (variant.id === this.activeVariantId) {
            return variant
          }
        })
      }
    }
  },
  methods: {
    ...mapActions({
      productShow: 'products/show',
      addToCart: 'cart/addToCart'
    }),
    loadProduct (productSlug) {
      this.productShow(productSlug)
        .then(response => {
          this.product = response.data.data
          this.activeVariantId = this.product.variants[0].id
        })
    },
    itemStore (variant) {
      this.addToCart(variant)
    },
    changeImage (img) {
      this.image = img
    }
  },
  created () {
    this.loadProduct(this.$route.params.product_slug)
  }
}
</script>
