<template>
    <q-card-section>
        <q-btn-group
                unelevated
                style="border: 1px solid rgba(0,0,0,0.2)"
                spread
        >
            <q-btn
                    :icon="colors.indexOf(value.value) !== -1 ? 'check' : ''"
                    text-color="black"
                    v-for="value in attribute.values"
                    :style="{ backgroundColor: value.value }"
                    :key="value.value"
                    @click="toggleValue(value.value)"
            />
        </q-btn-group>
    </q-card-section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AttributeTypeColor',
  data () {
    return {
      localValues: this.values || [],
      colors: []
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
    }),
    toggleValue (value) {
      console.log(this.colors.indexOf(value))
      if (this.colors.indexOf(value) === -1) {
        this.colors.push(value)
      } else {
        this.colors.splice(this.colors.indexOf(value), 1)
      }
      this.localValues = this.colors
    }
  }
}
</script>

<style scoped>

</style>
