<template>
    <q-list separator>
        <component :is="itemType" group="categories" v-for="category in localCategories" :label="category.label" :key="category.id">
            <q-option-group
                    :options="category.children"
                    v-model="localValue"
                    :type="groupType"
            />
        </component>
    </q-list>
</template>

<script>
export default {
  name: 'OptionsList',
  props: {
    groupType: String,
    itemType: String,
    categories: Array,
    value: Array
  },
  data () {
    return {
      localCategories: this.categories,
      localValue: this.value
    }
  },
  watch: {
    localValue (value) {
      this.$emit('changeValue', value)
    }
  }
}
</script>

<style scoped>

</style>
