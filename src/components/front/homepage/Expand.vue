<template>
    <div class="row full-width justify-center">
        <div class="row container q-col-gutter-x-lg">
            <div :class="`col-lg-${12 / rowLg} col-md-${12 / rowMd} col-sm-${12 / rowSm} col-xs-${12 / rowXs} q-py-sm-sm q-py-xs-xs no-border-radius`" v-for="item in firstLine" :key="item.id">
                <q-card>
                    <q-card-section>
                        <div class="text-subtitle2">{{ item.label }}</div>
                    </q-card-section>
                </q-card>
            </div>
        </div>
<!--        <div class="row container q-col-gutter-x-lg">-->
            <transition-group tag="div" class="row container q-col-gutter-x-lg" name="fade">
                <div :class="`col-lg-${12 / rowLg} col-md-${12 / rowMd} col-sm-${12 / rowSm} col-xs-${12 / rowXs} q-py-sm-sm q-py-xs-xs no-border-radius`"
                     v-for="item in valueArray"
                     v-bind:key="item.value"
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
            <q-btn class="text-weight-bold" color="primary" outline label="Показать все бренды" @click="test"/>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'expand',
  data () {
    return {
      show: false,
      firstLine: [],
      valueArray: [],
      array: this.values
    }
  },
  props: {
    rowLg: Number,
    rowMd: Number,
    rowSm: Number,
    rowXs: Number,
    values: Array
  },
  watch: {
    values (array) {
      this.firstLine = array.filter((value, index) => {
        return index < 6
      })
      // this.valueArray = array.filter((value, index) => {
      //   return index > 5
      // })
    }
  },
  methods: {
    test () {

      this.values.forEach((value, i) => {
        this.debouncedAdd(value)
      })

      // this.values.forEach(value => {
      //   setTimeout(this.add(value), 1000)
      // })
    },
    add (value) {
      if (this.valueArray.indexOf(value) === -1) {
        this.valueArray.push(value)
      } else {
        this.valueArray.splice(this.valueArray.indexOf(value), 1)
      }
    }
  },
  created () {
    this.debouncedAdd = _.throttle(this.add, 100)
  }
}
</script>

<style lang="scss" scoped>
    .fade-enter-active, .fade-leave-active {
        transition: all .5s ease-in-out;
        opacity: 1;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
