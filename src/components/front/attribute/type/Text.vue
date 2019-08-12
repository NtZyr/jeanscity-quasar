<template>
    <q-option-group
            v-model="localValues"
            :options="attribute.values"
            type="checkbox"
            inline
            class="column-inline"
    />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AttributeTypeText',
  data () {
    return {
      localValues: this.values || []
    }
  },
  props: {
    values: Array,
    attribute: Object
  },
  watch: {
    localValues (values) {
      let attribute = {}

      attribute[this.attribute.slug] = values
      this.filterAttributes(attribute)
    }
  },
  methods: {
    ...mapActions({
      filterAttributes: 'filter/attributes'
    })
  }
}
</script>

<style lang="stylus" scoped>

</style>
