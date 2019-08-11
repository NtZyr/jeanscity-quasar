<template>
    <q-page-container>
        <q-page class="bg-grey-2 row justify-center items-start">
            <div v-if="children.length > 0" class="row full-width justify-center bg-white">
                <div style="height: 45px" class="row container q-col-gutter-x-lg">
                    <q-tabs
                            v-model="tab"
                            dense
                            class="menu text-grey type-links"
                            indicator-color="grey-2"
                            align="justify"
                            active-bg-color="grey-2"
                            bg-color="white"
                            no-caps
                            style="max-width: 100%;"
                            narrow-indicator
                    >
                        <q-route-tab
                                name="all"
                                label="Все товары"
                                class="bg-white"
                                :to="{ name: 'catalog', params: { parent: $route.params.parent } }"/>
                        <q-route-tab
                                v-for="category in children"
                                :key="category.id" :name="category.slug"
                                :label="category.name"
                                class="bg-white"
                                :to="{ name: 'catalog', params: { parent: $route.params.parent, child: category.slug } }"/>
<!--                        <q-route-tab name="alarms" label="Alarms" class="bg-white" to="/products"/>-->
<!--                        <q-route-tab name="movies" label="Movies" class="bg-white" to="/products"/>-->
                    </q-tabs>
                </div>
            </div>
            <router-view/>
        </q-page>
    </q-page-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Products',
  data () {
    return {
      parent: this.$route.params.parent,
      children: [],
      tab: null
    }
  },
  watch: {
    '$route.params': function (value) {
      this.parent = value.parent
      this.loadChildren()
    }
  },
  methods: {
    ...mapActions({
      filterFromQuery: 'filter/filterFromQuery',
      categoriesShow: 'categories/show',
      filterCategories: 'filter/categories'
    }),
    setCategoriesFilter () {
      let categories = []
      if (this.$route.params.parent && typeof this.$route.params.child === 'undefined') {
        categories = this.children.map(child => {
          return child.id
        })
      } else if (this.$route.params.parent && this.$route.params.child) {
        categories = this.children
          .filter(child => { if (child.slug === this.$route.params.child) { return child } })
          .map(child => { return child.id })
      }

      this.filterCategories(categories)
    },
    loadChildren () {
      this.categoriesShow(this.parent)
        .then(response => {
          this.children = response.data.data.children
          this.setCategoriesFilter()
        })
    }
  },
  beforeMount () {
    // todo направлять с запроса на все фильтры
    this.filterFromQuery(this.$route.query)
  },
  mounted () {
    this.loadChildren()
  }
}
</script>

<style lang="stylus" scoped>
    .menu
        .q-focusable
            border-radius 5px 5px 0 0
</style>
