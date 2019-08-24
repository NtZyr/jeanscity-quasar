<template>
    <div class="row full-width justify-center">
        <div class="row container q-col-gutter-x-lg">
            <div
                    :class="`col-lg-${12 / rowLg} col-md-${12 / rowMd} col-sm-${12 / rowSm} col-xs-${12 / rowXs} q-py-sm-sm q-py-xs-xs no-border-radius`" v-for="item in firstLine" :key="item.id">
                <q-card>
                    <q-card-section>
                        <div class="text-subtitle2">{{ item.label }}</div>
                    </q-card-section>
                </q-card>
            </div>
        </div>
<!--        <div class="row container q-col-gutter-x-lg">-->
            <transition-group tag="div" class="row container q-col-gutter-x-lg" name="fade" @after-enter="enter"
                              @after-leave="leave">
                <div :class="`col-lg-${12 / rowLg} col-md-${12 / rowMd} col-sm-${12 / rowSm} col-xs-${12 / rowXs} q-py-sm-sm q-py-xs-xs no-border-radius`"
                     v-for="(item, i) in valueArray"
                     v-if="i < idx"
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
            <q-btn class="text-weight-bold" color="primary" outline label="Показать все бренды" @click="run"/>
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
      firstLine: [
        {
          value: '1',
          label: '1'
        },
        {
          value: '2',
          label: '2'
        },
        {
          value: '3',
          label: '3'
        },
        {
          value: '4',
          label: '4'
        },
        {
          value: '5',
          label: '5'
        },
        {
          value: '6',
          label: '6'
        }
      ],
      valueArray: [
        {
          value: '7',
          label: '7'
        },
        {
          value: '8',
          label: '8'
        },
        {
          value: '9',
          label: '9'
        },
        {
          value: '10',
          label: '10'
        },
        {
          value: '11',
          label: '11'
        }
      ],
      values: [
        {
          value: '1',
          label: '1'
        },
        {
          value: '2',
          label: '2'
        },
        {
          value: '3',
          label: '3'
        },
        {
          value: '4',
          label: '4'
        },
        {
          value: '5',
          label: '5'
        },
        {
          value: '6',
          label: '6'
        },
        {
          value: '7',
          label: '7'
        },
        {
          value: '8',
          label: '8'
        },
        {
          value: '9',
          label: '9'
        },
        {
          value: '10',
          label: '10'
        },
        {
          value: '11',
          label: '11'
        }
      ],
      array: this.values,
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
    // this.run()
  },
  watch: {
    values (array) {
      this.firstLine = array.filter((value, index) => {
        console.log(this.firstLine)
        return index < 6
      })
      // this.valueArray = array.filter((value, index) => {
      //   return index > 5
      // })
    }
  },
  methods: {
    run () {
      this.idx += ({ 0: 1, [this.valueArray.length]: -1 })[this.idx]
    },
    enter () {
      this.idx = Math.min(this.valueArray.length, this.idx + 1)
    },
    leave () {
      this.idx = Math.max(0, this.idx - 1)
    },
    test () {
      // this.values.forEach(value => {
      //   // console.log(this.valueArray)
      //   // this.debouncedAdd(value)
      //   this.add(value)
      //   // this.valueArray2 = this.valueArray
      // })

      // this.values.forEach(value => {
      //   setTimeout(this.add(value), 1000)
      // })
    },
    add (value) {
      // for (let i = 0; i < this.values; i++)
      if (this.valueArray.length > 5) {
        if (this.valueArray.indexOf(value) === -1) {
          this.valueArray.push(value)
        } else {
          this.valueArray.splice(this.valueArray.indexOf(value), 1)
        }
      }
    }
  },
  created () {
    this.debouncedAdd = _.throttle(this.add, 100)
  }
}
</script>

<style lang="scss" scoped>
    .fade-enter-active {
        transition: all 0.2s ease;
    }
    .fade-leave-active {
        /*transition: all .2s ease;*/
        transition: all 0.2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        opacity: 1;
    }
    .fade-enter, .fade-leave-to {
        transform: translateX(10px);
        opacity: 0;
    }
</style>
