<template>
    <div class="col-12 q-pa-sm">
        <q-select
                use-input
                map-options
                emit-value
                new-value-mode="add-unique"
                :label="localAttribute.name"
                :options="localAttribute.values"
                v-model="localValue"
                @new-value="createValue"
        >
            <template v-if="localValue && editable" v-slot:append>
                <q-icon name="cancel" @click.stop="localValue = null" class="cursor-pointer" />
            </template>
        </q-select>
    </div>
</template>

<script>
export default {
  name: 'AttributeTypeText',
  props: {
    attribute: Object,
    value: String,
    editable: Boolean
  },
  data () {
    return {
      localValue: this.value,
      localAttribute: this.attribute
    }
  },
  methods: {
    createValue (val, done) {
      console.log(val)
      if (val.length > 0) {
        if (!this.localAttribute.values.includes(val)) {
          this.localAttribute.values.push(val)
        }
        done(val, 'add-unique')
      }
    }
  }
}
</script>

<style scoped>

</style>
