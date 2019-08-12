<template>
  <div>
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
                <div class="q-pa-none">
                    <div class="row items-center q-col-gutter-md" v-if="attribute.thumbnail">
                        <div class="col-auto">
                            <q-avatar size="100px" square>
                                <q-img :src="attribute.thumbnail_image"/>
                            </q-avatar>
                        </div>
                        <div class="col">
                            <h6 class="q-ma-none">
                                {{ attribute.thumbnail.file_name }}
                            </h6>
                        </div>
                        <div class="col-auto">
                            <q-btn
                                    round
                                    unelevated
                                    icon="delete"
                                    size="sm"
                                    color="negative"
                                    @click="confirm = true"
                            />
                        </div>
                    </div>
                </div>
                <q-uploader
                        label="Миниатюра атрибута"
                        ref="uploader"
                        accept="image/png, image/jpg, image/jpeg"
                        class="full-width q-mt-md q-mb-md"
                        flat
                        bordered
                        :multiple="false"
                        :factory="uploadFile"
                />
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
    <q-card class="q-mt-lg q-mb-lg" v-if="attribute.categories">
      <q-card-section>
        <q-card-label class="text-h6">Категории атрибута:</q-card-label>
      </q-card-section>
      <q-separator/>
      <q-list separator>
        <q-expansion-item v-for="category in categories" :label="category.label" :key="category.id">
          <q-option-group
            :options="category.children"
            v-model="attribute.categories"
            type="checkbox"
          />
        </q-expansion-item>
      </q-list>
    </q-card>
<!--    todo valuev-->
<!--    <q-card style="height: 400px; overflow-y: auto" class="q-mt-lg q-mb-lg" v-if="attribute.values">-->
<!--      <q-card-section>-->
<!--        <q-card-label class="text-h6">Значения атрибута:</q-card-label>-->
<!--      </q-card-section>-->
<!--      <q-separator/>-->
<!--      <q-list separator>-->
<!--        <q-item :key="value.id" v-for="value in attribute.values">-->
<!--          <q-item-section>-->
<!--            {{ value.content }}-->
<!--          </q-item-section>-->
<!--          <q-item-section side>-->
<!--            <q-btn-group unelevated rounded>-->
<!--              <q-btn color="negative" size="sm" round outline icon="delete"/>-->
<!--            </q-btn-group>-->
<!--          </q-item-section>-->
<!--        </q-item>-->
<!--      </q-list>-->
<!--    </q-card>-->
      <q-dialog v-model="confirm" persistent>
          <q-card>
              <q-card-section class="row items-center">
                  <span>Удалить миниатюру?</span>
              </q-card-section>

              <q-card-actions align="right">
                  <q-btn flat label="Отмена" color="primary" v-close-popup />
                  <q-btn flat label="Удалить" @click="dispatchMediaDestroy" color="negative" v-close-popup />
              </q-card-actions>
          </q-card>
      </q-dialog>
  </div>
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
      errors: [],
      categories: []
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
  computed: {
    ...mapGetters({
      values: 'values/list'
    })
  },
  methods: {
    ...mapActions({
      attributeShow: 'attributes/show',
      attributeStore: 'attributes/store',
      attributeUpdate: 'attributes/update',
      attributeTypes: 'attributes/types',
      valuesIndex: 'values/index',
      categoriesArray: 'categories/parents',
      mediaStore: 'media/store',
      mediaDestroy: 'media/destroy',
      mediaShow: 'media/show'
    }),
    dispatchMediaDestroy () {
      this.mediaDestroy(this.attribute.thumbnail.id)
        .then(response => {
          this.message = {
            text: response.data.message,
            status: response.status
          }
          this.loadAttribute(this.attributeId)
        })
    },
    uploadFile (files) {
      let formData = new FormData()
      formData.append('media', files[0])
      this.mediaStore(formData)
        .then(response => {
          this.message = {
            text: response.data.message,
            status: response.status
          }
          this.attribute.media = response.data.data.id
        })
    },
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
    this.categoriesArray({
      return: 'parents'
    })
      .then(response => {
        this.categories = response.data.data
      })
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
