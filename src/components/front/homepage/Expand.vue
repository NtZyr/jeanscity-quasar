<template>
    <div class="row full-width justify-center">
        <div class="row container q-col-gutter-x-lg">
            <div :class="`col-lg-${12 / rowLg} col-md-${12 / rowMd} col-sm-${12 / rowSm} col-xs-${12 / rowXs} q-py-sm-sm q-py-xs-xs no-border-radius`"
                 v-for="item in firstLine"
                 :key="item.value"
            >
                <q-card>
                    <q-card-section>
                        <div class="text-subtitle2">{{ item.label }}</div>
                    </q-card-section>
                </q-card>
            </div>
        </div>
<!--        <div class="row container q-col-gutter-x-lg">-->
            <transition-group tag="div" class="row container q-col-gutter-x-lg" name="fade" @after-enter="enter"
                              @after-leave="leave"
            >
                <div :class="`col-lg-${12 / rowLg} col-md-${12 / rowMd} col-sm-${12 / rowSm} col-xs-${12 / rowXs} q-py-sm-sm q-py-xs-xs no-border-radius`"
                     v-for="(item, i) in valueArray"
                     v-if="i < idx"
                     :key="item.value"
                >
                    <q-card>
                        <q-card-section>
                            <div class="text-subtitle2">{{ item.label }}</div>
                        </q-card-section>
                    </q-card>
                </div>
            </transition-group>
<!--        </div>-->
        <div class="row container justify-center q-py-md q-ma-none">
            <q-btn class="text-weight-bold" color="primary" outline label="Показать все бренды" @click="run"/>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'
import { Screen } from 'quasar'

export default {
  name: 'expand',
  data () {
    return {
      show: false,
      firstLine: [],
      valueArray: [],
      // array: this.values,
      attribute: [],
      idx: 0
    }
  },
  props: {
    rowLg: Number,
    rowMd: Number,
    rowSm: Number,
    rowXs: Number,
    // values: Array
  },
  mounted () {
    this.attributeShow(2)
      .then(response => {
        this.attribute = response.data.data
        console.log(this.attribute)
        this.init()
      })
  },
  methods: {
    ...mapActions({
      attributeShow: 'attributes/show'
    }),
    init () {
      if (this.$q.screen.md) {
        for (let i = 0; i < this.rowMd; i++) {
          this.firstLine.push(this.attribute.values[i])
        }
        console.log(this.firstLine)
        for (let i = 0; i < this.attribute.values.length - this.rowMd; i++) {
          this.valueArray.push(this.attribute.values[i + this.rowMd])
        }
        console.log(this.valueArray)
      } else if (this.$q.screen.sm) {
        for (let i = 0; i < this.rowSm; i++) {
          this.firstLine.push(this.attribute.values[i])
        }
        for (let i = 0; i < this.attribute.values.length - this.rowSm; i++) {
          this.valueArray.push(this.attribute.values[i + this.rowSm])
        }
      } else if (this.$q.screen.xs) {
        for (let i = 0; i < this.rowXs; i++) {
          this.firstLine.push(this.attribute.values[i])
        }
        for (let i = 0; i < this.attribute.values.length - this.rowXs; i++) {
          this.valueArray.push(this.attribute.values[i + this.rowXs])
        }
      } else {
        for (let i = 0; i < this.rowLg; i++) {
          this.firstLine.push(this.attribute.values[i])
        }
        for (let i = 0; i < this.attribute.values.length - this.rowLg; i++) {
          this.valueArray.push(this.attribute.values[i + this.rowLg])
        }
      }
    },
    run () {
      this.idx += ({ 0: 1, [this.valueArray.length]: -1 })[this.idx]
    },
    enter () {
      this.idx = Math.min(this.valueArray.length, this.idx + 1)
    },
    leave () {
      this.idx = Math.max(0, this.idx - 1)
    }
  },
  created () {
    // this.debouncedAdd = _.throttle(this.add, 100)
  }
}
</script>

<style lang="scss" scoped>
    .fade-enter-active {
        transition: all 0.12s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .fade-leave-active {
        transition: all 0.12s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        opacity: 1;
    }
    .fade-enter, .fade-leave-to {
        transform: translateX(10px);
        opacity: 0;
    }
</style>
