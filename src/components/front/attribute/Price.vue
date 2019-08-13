<template>
    <q-card>
        <q-card-section class="row q-px-xs q-py-sm filter">
            <div class="col-12 q-px-md">
                <q-range
                        v-model="localPrice"
                        :min="localRange.min"
                        :max="localRange.max"
                        @change="debouncedPriceFilter(localPrice)"
                />
            </div>

            <div class="col-12 items-center q-col-gutter-none">
                <div class="row items-center">
                    <div class="col-md-6 col-xs-12 flex items-center justify-center">
                        <p class="no-margin q-pr-sm">от</p>
                        <q-input
                                v-model.number="localPrice.min"
                                type="number"
                                style="max-width: 65px"
                                @change="debouncedPriceFilter(localPrice)"
                        />
                        <p class="no-margin">&#8381;</p>
                    </div>
                    <div class="col-md-6 col-xs-12 flex items-center justify-center">
                        <p class="no-margin q-pr-sm">до</p>
                        <q-input
                                v-model.number="localPrice.max"
                                type="number"
                                style="max-width: 65px;"
                                @change="debouncedPriceFilter(localPrice)"
                        />
                        <p class="no-margin">&#8381;</p>
                    </div>

                </div>
            </div>
            <q-checkbox v-model="localSale" label="Скидки" class="col-12 q-py-sm"/>
        </q-card-section>
    </q-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  name: 'AttributePrice',
  props: {
    range: Object
  },
  data () {
    return {
      localPrice: {},
      localRange: {},
      localSale: false
    }
  },
  watch: {
    range: {
      handler (newval, oldval) {
        // todo диапазон меняется только при изменении категории, цена не меняется !исправлено
        if (Object.entries(oldval).length === 0) {
          this.localPrice = newval
        }
        this.localRange = newval
      },
      immediate: true
    },
    localSale (value) {
      this.filterSale(value)
    }
  },
  methods: {
    ...mapActions({
      filterPrice: 'filter/price',
      filterSale: 'filter/sale'
    })
  },
  created () {
    this.debouncedPriceFilter = _.debounce(this.filterPrice, 500)
  }
}
</script>

<style scoped>

</style>
