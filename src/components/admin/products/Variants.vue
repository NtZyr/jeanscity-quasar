<template>
    <div class="col-6">
        <q-card class="bg-grey-2">
            <q-card-section class="bg-white">
                <q-card-label class="text-h6 q-mt-none q-mb-none">Вариации товара</q-card-label>
            </q-card-section>
            <q-separator/>
            <q-list separator>
                <q-expansion-item
                        group="variants"
                        v-for="variant in variants" :key="variant.id"
                >
                    <template v-slot:header>
                        <q-item-section>
                            <q-item-label class="text-grey-8"><strong>Артикул: </strong> {{ variant.sku }}</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label class="text-grey-8"><strong>Цена: </strong> {{ variant.price }}</q-item-label>
                        </q-item-section>
                        <q-item-section side v-if="variant.sale_price !== 0 && variant.sale_price < variant.price">
                            <q-badge>Действует скидка {{ variant.sale }}%</q-badge>
                        </q-item-section>
                    </template>
                    <q-form
                            @submit="confirmForm(variant)"
                    >
                        <message :message="message"></message>
                        <div class="row bg-white">
                            <div class="col-12 q-pt-sm q-pl-sm q-pr-sm">
                                <span class="text-h6">Информация о варианте товара</span>
                            </div>
                            <div class="col-6 q-pa-sm">
                                <q-input
                                        label="Артикул"
                                        v-model="variant.sku"
                                />
                                <q-input
                                        label="Цена"
                                        v-model="variant.price"
                                />
                            </div>
                            <div class="col-6 q-pa-sm">
                                <q-input
                                        label="В наличии"
                                        v-model="variant.in_stock"
                                />
                                <q-input
                                        label="Цена со скидкой"
                                        v-model="variant.sale_price"
                                />
                            </div>
                            <variant-gallery
                                    v-on:uploadMedia="variant.media = $event"
                                    :gallery="variant.gallery"
                            ></variant-gallery>
                            <div class="col-12 q-pt-sm q-pl-sm q-pr-sm">
                                <span class="text-h6">Атрибуты товара</span>
                            </div>
                            <div class="row">
                                <component
                                        v-for="attribute in attributes"
                                        :is="`type-${attribute.type}`"
                                        :key="attribute.id"
                                        :attribute="attribute"
                                        :value="variant.values[attribute.slug]"
                                        v-on:changeValue="variant.values[attribute.slug] = $event"
                                        :editable="true"
                                />
                            </div>
                            <div class="row full-width q-pa-sm">
                                <q-space/>
                                <q-btn unelevated type="submit" color="primary" label="Сохранить"/>
                            </div>
                        </div>
                    </q-form>
                </q-expansion-item>
            </q-list>
        </q-card>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Message from '../app/Message'
import TypeColor from '../attribute/type/Color'
import TypeText from '../attribute/type/Text'
import VariantGallery from './Gallery'

export default {
  name: 'ProductsVariants',
  components: {
    Message,
    TypeColor,
    TypeText,
    VariantGallery
  },
  data () {
    return {
      message: {},
      errors: [],
      gallery: 1
    }
  },
  props: {
    variants: Array,
    attributes: Array
  },
  watch: {
    message (value) {
      setTimeout(() => {
        this.message = {}
      }, 2000)
    }
  },
  methods: {
    ...mapActions({
      variantShow: 'variants/show',
      variantUpdate: 'variants/update',
      variantStore: 'variants/store',
    }),
    confirmForm (variant) {
      console.log(variant)
      if (variant.id) {
        variant.product_id = variant.product.id
        this.variantUpdate(variant)
          .then(response => {
            this.message = {
              text: response.data.message,
              status: response.status
            }
          })
      } else {
        this.variantStore(variant)
          .then(response => {
            this.message = {
              text: response.data.message,
              status: response.status
            }
          })
      }
    }
  }
}
</script>

<style scoped>

</style>
