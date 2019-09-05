<template>
    <q-btn-dropdown auto-close stretch flat label="Бренды" menu-anchor="bottom middle"
                    menu-self="top middle" @click='scrollOrShow'
    >
        <div class="row brands" v-if="show">
            <router-link class="col-3 q-pa-sm"
                         v-for="category in categories" :key="category.id"
                         :to="{ name: 'catalog', params: { parent: category.slug } }"
            >
                {{category.slug}}
            </router-link>
        </div>
    </q-btn-dropdown>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll

export default {
  data () {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters({
      categories: 'categories/list'
    })
  },
  methods: {
    ...mapActions({
      categoriesIndex: 'categories/index'
    }),
    scrollOrShow () {
      console.log(this.$route)
      this.show = false
      if (this.$route.path === '/') {
        this.scrollToElement()
      } else {
        this.show = !this.show
      }
    },
    scrollToElement () {
      const el = document.getElementById('brands')
      const target = getScrollTarget(el)
      const offset = el.offsetTop
      const duration = 1000
      setScrollPosition(target, offset, duration)
    }
  },
  created () {
    this.categoriesIndex({ return: 'parents' })
    // this.show = false
  }
}
</script>

<style lang="stylus">
    .q-btn-dropdown__arrow
        display none
</style>
