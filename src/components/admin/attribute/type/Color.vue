<template>
    <div class="col-6 q-pa-sm">
        <q-select
                map-options
                emit-value
                new-value-mode="add-unique"
                :label="localAttribute.name"
                :options="localAttribute.values"
                v-model="localValue"
        >
            <template v-if="localValue" v-slot:prepend>
                <q-icon v-if="editable" name="colorize" class="cursor-pointer">
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-color no-footer no-header v-model="localValue" />
                    </q-popup-proxy>
                </q-icon>
                <q-avatar :style="`background-color: ${localValue}; border: 1px solid rgba(0,0,0,0.1)`"/>
            </template>
            <template v-slot:option="scope">
                <q-item
                        v-bind="scope.itemProps"
                        v-on="scope.itemEvents"
                >
                    <q-item-section avatar>
                        <q-avatar :style="`background-color: ${scope.opt.label}; border: 1px solid rgba(0,0,0,0.1)`"/>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label v-html="scope.opt.label"/>
                    </q-item-section>
                </q-item>
            </template>
        </q-select>
    </div>
</template>

<script>
export default {
  name: 'AttributeTypeColor',
  data () {
    return {
      localValue: this.value,
      localAttribute: this.attribute
    }
  },
  props: {
    attribute: Object,
    value: String,
    editable: Boolean
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
