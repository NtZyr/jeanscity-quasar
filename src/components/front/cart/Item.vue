<template>
    <div class="row margin-fix q-py-xs-sm item-shadow" style="min-height: 265px; position:relative; background: #FAFAFA;">
        <div class="close">
            <i class="material-icons" style="font-size: 24px; cursor: pointer;" @click="lineRemove(line.variant.id)">
                close
            </i>
        </div>
        <div class="col-11 offset-1 q-pr-xl q-pt-sm-lg q-pt-md-xs q-pt-xs-xl q-pb-sm-sm q-pb-xs-sm">
            <div class="product-name">{{line.variant.product.name}}</div>
        </div>
        <div class="col-md-3 col-xs-5 offset-1 flex justify-xs-center justify-md-start q-py-xs-md q-py-md-xs numbers">
            <product-thumbnail/>
            <div class="flex items-center md-hide lg-hide xl-hide q-px-sm-none q-px-xs-none q-pt-sm">
                <q-btn
                        round
                        color="white"
                        text-color="black"
                        size="0.53rem"
                        icon="remove"
                        @click="itemReduce(line.variant.id)"
                />
                <input type="text" style="max-width: 35px; max-height: 32px; font-weight: 700;" class="q-mx-sm-sm q-mx-xs-xs text-center" :value="line.qty">
                <q-btn
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
                <div class="col-md-4 col-xs-12 q-pr-xs-sm q-pt-md-md q-pl-md q-pl-md-md q-pl-sm-xl q-pl-xs-md q-pt-sm-md q-pt-xs-sm product-info flex column justify-between">
                    <ul v-if="line.variant.attributes.length > 0">
                        <li
                                v-for="attribute in line.variant.attributes"
                                :key="attribute.slug"
                        >{{ `${attribute.name}: ${attribute.value}` }}</li>
                    </ul>
                    <div class="q-pt-sm-xl q-pt-xs-md q-my-sm-md q-my-xs-md md-hide lg-hide xl-hide">
                        <div class="sale-label q-mb-xl" v-if="line.variant.sale_price > 0">{{ line.variant.sale }}%</div>
                        <div class="text-h6 q-pt-sm price">{{ line.variant.price }} руб.</div>
                        <div class="text-h6 q-pt-md"
                             v-show="line.variant.sale_price"
                        >
                            {{ line.variant.sale_price }} руб.
                        </div>
                    </div>
                </div>
                <div class="col-md-4 sm-hide xs-hide q-pt-md flex q-pr-lg numbers">
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
                            style="max-width: 35px; max-height: 32px; font-weight: 700;"
                            class="q-mx-sm text-center bg-transparent no-border"
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
                    <div class="text-h6 q-pt-sm price" v-if="line.variant.sale_price > 0">{{ line.variant.sale }}%</div>
                    <div class="text-h6 q-pt-md q-mb-sm"
                         v-show="line.variant.sale"
                    >
                        {{ line.variant.sale_price }} руб.
                    </div>
                    <div class="sail-label" v-show="line.variant.sale">{{ line.variant.sale }}%</div>
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
  }
}
</script>

<style scoped>

</style>
