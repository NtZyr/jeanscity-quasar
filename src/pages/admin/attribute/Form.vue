<template>
    <q-form @submit="confirmForm">
        <template v-if="attributeId">
            <h2 class="text-h6">Редактирование атрибута</h2>
        </template>
        <template v-else>
            <h2 class="text-h6">Создание нового атрибута</h2>
        </template>
        <q-card>
            <transition name="fade" mode="out-in">
                <q-banner
                    v-if="message.text"
                    inline-actions
                    :class="'text-white ' + ((message.status == 200 || message.status == 201) ? 'bg-positive' : 'bg-negative' )"
                >
                    {{ message.text }}
                </q-banner>
            </transition>
            <q-card-section>
                <q-input
                    v-model="attribute.name"
                    label="Название"
                />
                <q-input
                    v-model="attribute.slug"
                    label="Отображение в ссылке"
                />
                <q-select
                    v-model="attribute.type"
                    label="Тип атрибута"
                    :options="types"
                />
            </q-card-section>
            <q-separator/>
            <q-card-actions>
                <q-btn to="/admin/attributes" unelevated>Отменить</q-btn>
                <q-space/>
                <q-btn type="submit" unelevated color="primary">Сохранить</q-btn>
            </q-card-actions>
        </q-card>
    </q-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AttributeForm',
  data () {
    return {
      attributeId: null,
      attribute: {},
      types: [],
      message: {},
      errors: []
    }
  },
  watch: {
    '$route.params.id': function (attributeId) {
      this.loadAttribute(attributeId)
    },
    message (value) {
      setTimeout(() => {
        this.message = {}
      }, 2000)
    }
  },
  methods: {
    ...mapActions({
      attributeShow: 'attributes/show',
      attributeStore: 'attributes/store',
      attributeUpdate: 'attributes/update',
      attributeTypes: 'attributes/types'
    }),
    loadAttribute (attributeId) {
      this.attribute = {}
      this.attributeId = attributeId
      if (attributeId !== 'undefined') {
        this.attributeId = attributeId

        if (this.attributeId) {
          this.attributeShow(this.attributeId)
            .then(response => {
              this.attribute = response.data.data
            })
        }
      }
    },
    confirmForm () {
      if (this.attributeId) {
        this.attributeUpdate(this.attribute)
          .then(
            response => {
              this.message = {
                text: response.data.message,
                status: response.status
              }
              this.errors = []
            },
            error => {
              this.message = {
                text: error.response.data.message,
                status: error.response.status
              }
              this.errors = error.response.data.errors
            })
      } else {
        this.attributeStore(this.attribute)
          .then(
            response => {
              this.message = {
                text: response.data.message,
                status: response.status
              }
              this.errors = []
            },
            error => {
              this.message = {
                text: error.response.data.message,
                status: error.response.status
              }
              this.errors = error.response.data.errors
            })
      }
    }
  },
  created () {
    this.loadAttribute(this.$route.params.id)
    this.attributeTypes()
      .then(response => {
        this.types = response.data.data
      })
  }
}
</script>

<style scoped>

</style>
