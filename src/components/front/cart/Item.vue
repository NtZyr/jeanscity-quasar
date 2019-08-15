<template>
    <div class="row margin-fix q-py-xs-sm item-shadow"
         style="min-height: 265px; position:relative; background: #FAFAFA; color: #3C3C3C;">
        <div class="close">
            <i class="material-icons" style="font-size: 24px; cursor: pointer;" @click="lineRemove(line.variant.id)">
                close
            </i>
        </div>
        <div class="col-11 offset-1 q-pr-xl q-pt-sm-lg q-pt-md-xs q-pt-xs-xl q-pb-sm-sm q-pb-xs-sm">
            <div class="product-name">{{ line.variant.product.name }}</div>
        </div>
        <div class="col-md-3 col-xs-5 offset-1 flex justify-xs-center justify-md-start q-py-xs-md q-py-md-xs numbers">
            <product-thumbnail/>
            <div class="flex items-center md-hide lg-hide xl-hide q-px-sm-none q-px-xs-none q-pt-sm">
                <q-btn
                        v-if="line.qty > 1"
                        round
                        color="white"
                        text-color="black"
                        size="0.53rem"
                        icon="remove"
                        @click="itemReduce(line.variant.id)"
                />
                <input
                        disabled
                        type="text"
                        style="max-width: 35px; max-height: 32px; font-weight: 700; color: #3C3C3C; font-size: 18px;"
                        class="q-mx-none text-center bg-transparent no-border"
                        :value=line.qty
                >
                <q-btn
                        v-if="line.qty < line.variant.in_stock"
                        round
                        color="white"
                        text-color="black"
                        size='0.53rem'
                        icon="add"
                        @click="itemIncrease(line.variant.id)"
                />
            </div>
        </div>
        <div class="col-md-8 col-xs-6">
            <div class="row" style="height: 100%">
                <div
                        class="col-md-4 col-xs-12 q-pr-xs-sm q-pt-md-md q-pl-md q-pl-md-md q-pl-sm-xl q-pl-xs-lg q-pt-sm-md q-pt-xs-sm product-info flex column justify-between">
                    <ul v-if="line.variant.attributes.length > 0" class="item__info">
                        <li
                                v-for="attribute in line.variant.attributes"
                                :key="attribute.slug"
                                class="q-pb-md q-pb-xs-xs"
                        >
                            {{ `${attribute.name}: ${attribute.value}` }}
                        </li>
                    </ul>
                    <div class="q-pt-sm-xl q-pt-xs-md q-my-sm-md q-my-xs-md md-hide lg-hide xl-hide">
                        <div class="sale-label q-mb-sm-md q-mb-xs-none" v-show="line.variant.sale">{{ line.variant.sale }}%</div>
                        <div class="text-h6 q-pt-sm"
                             :class="{ 'price': !line.variant.sale, 'price-through': line.variant.sale}"
                        >
                          {{ line.variant.price.toLocaleString() }} руб.
                        </div>
                        <div class="text-h6 q-pt-xs sale-price"
                             v-show="line.variant.sale"
                        >
                          {{ line.variant.sale_price.toLocaleString() }} руб.
                        </div>
                    </div>
                </div>
                <div class="col-md-4 sm-hide xs-hide q-pt-md q-pl-xs flex q-pr-lg numbers">
                    <q-btn
                            v-if="line.qty > 1"
                            round
                            color="white"
                            text-color="black"
                            size="sm"
                            icon="remove"
                            @click="itemReduce(line.variant.id)"
                    />
                    <input
                            disabled
                            type="text"
                            style="max-width: 35px; max-height: 32px; font-weight: 700; color: #3C3C3C; font-size: 18px;"
                            class="q-mx-xs text-center bg-transparent no-border"
                            :value=line.qty
                    >
                    <q-btn
                            v-if="line.qty < line.variant.in_stock"
                            round
                            color="white"
                            text-color="black"
                            size='sm'
                            icon="add"
                            @click="itemIncrease(line.variant.id)"
                    />
                </div>
                <div class="col-md-4 sm-hide xs-hide q-pr-xl">
                    <div class="text-h6 q-pt-sm"
                         :class="{ 'price': !line.variant.sale, 'price-through': line.variant.sale}"
                    >
                        {{ line.variant.price.toLocaleString() }} руб.
                    </div>
                    <div class="text-h6 q-mb-xs sale-price"
                         v-show="line.variant.sale"
                    >
                        {{ line.variant.sale_price.toLocaleString() }} руб.
                    </div>
                    <div class="sale-label q-mt-xs" v-show="line.variant.sale">{{ line.variant.sale }}%</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProductThumbnail from '../product/Thumbnail'

export default {
  name: 'CartItem',
  data () {
    return {

    }
  },
  components: {
    ProductThumbnail
  },
  props: {
    line: Object
  },
  methods: {
    ...mapActions({
      lineRemove: 'cart/remove',
      itemReduce: 'cart/reduce',
      itemIncrease: 'cart/increase'
    })
  },
  computed: {

  }
}
</script>

<style lang="stylus" scoped>
.close
    position absolute
    right 14px
.item__info
    list-style none
    padding 0
    margin 0
    font-weight 300
.product-name
    font-size 16px
.price, .price-through, .sale-price
    font-size 22px
.price-through
    color #868686
    text-decoration line-through
.sale-price
    color #B61118
.sale-label
    background-color #CC0008
    display inline-block
    padding 2px 6px
    color #FFF
    font-size 16px
    font-weight 500

@media (max-width $breakpoint-sm)
    .price, .price-through, .sale-price
        font-size 20px
    .item__info
        font-size 13px
@media (max-width $breakpoint-xs)
    .price, .price-through, .sale-price
        font-size 18px
</style>
