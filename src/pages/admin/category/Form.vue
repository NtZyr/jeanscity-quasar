<template>
    <q-form>
        <template v-if="categoryId">
            <h2 class="text-h6">Редактирование категории</h2>
        </template>
        <template v-else>
            <h2 class="text-h6">Создание новой категории</h2>
        </template>
        <q-card>
            <transition name="fade" mode="out-in">
                <q-banner
                    v-if="localMessage.text"
                    inline-actions
                    :class="'text-white ' + ((localMessage.status == 200 || localMessage.status == 201) ? 'bg-positive' : 'bg-negative' )"
                >
                    {{ localMessage.text }}
                </q-banner>
            </transition>
            <q-card-section>
                <div class="q-pa-none">
                    <div class="row items-center q-col-gutter-md" v-if="localCategory.thumbnail">
                        <div class="col-auto">
                            <q-avatar size="100px" square>
                                <q-img :src="localCategory.thumbnail_image"/>
                            </q-avatar>
                        </div>
                        <div class="col">
                            <h6 class="q-ma-none">
                                {{ localCategory.thumbnail.file_name }}
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
                    label="Миниатюра категории"
                    ref="uploader"
                    accept="image/png, image/jpg, image/jpeg"
                    class="full-width q-mt-md q-mb-md"
                    flat
                    bordered
                    :multiple="false"
                    :factory="uploadFile"
                />
                <q-input
                    v-model="localCategory.name"
                    label="Название категории"
                />
                <q-input
                    v-model="localCategory.slug"
                    label="Ссылка"
                />
                <q-input
                    type="textarea"
                    v-model="localCategory.description"
                    label="Описание"
                />
                <q-select
                    emit-value
                    map-options
                    v-model="localCategory.parent_id"
                    label="Родитель"
                    :options="formatParents"
                />
            </q-card-section>
            <q-separator/>
            <q-card-actions>
                <q-btn to="/admin/categories" unelevated>Отменить</q-btn>
                <q-space/>
                <q-btn @click="confirmForm" unelevated color="primary">Сохранить</q-btn>
            </q-card-actions>
        </q-card>
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
    </q-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CategoryForm',
  data () {
    return {
      confirm: false,
      categoryId: null,
      localCategory: {},
      localMessage: {},
      localErrors: [],
      localParents: [],
      rules: {
        name: [ value => !!value || 'Поле обязательно' ]
      }
    }
  },
  computed: {
    formatParents () {
      return this.localParents.filter(parent => {
        if (parent.value !== this.localCategory.id) {
          return parent
        }
      })
    }
  },
  watch: {
    '$route.params.id': function (categoryId) {
      this.loadCategory(categoryId)
    },
    localMessage (value) {
      setTimeout(() => {
        this.localMessage = {}
      }, 2000)
    }
  },
  methods: {
    ...mapActions({
      parents: 'categories/parents',
      categoryShow: 'categories/show',
      categoryUpdate: 'categories/update',
      categoryStore: 'categories/store',
      mediaStore: 'media/store',
      mediaDestroy: 'media/destroy',
      mediaShow: 'media/show'
    }),
    dispatchMediaDestroy () {
      this.mediaDestroy(this.localCategory.thumbnail.id)
        .then(response => {
          this.localMessage = {
            text: response.data.message,
            status: response.status
          }
          this.loadCategory(this.categoryId)
        })
    },
    uploadFile (files) {
      let formData = new FormData()
      formData.append('media', files[0])
      this.mediaStore(formData)
        .then(response => {
          this.localMessage = {
            text: response.data.message,
            status: response.status
          }
          this.localCategory.media = response.data.data.id
        })
    },
    loadCategory (categoryId) {
      this.localCategory = {}
      if (categoryId !== 'undefined') {
        this.categoryId = categoryId

        if (this.categoryId) {
          this.categoryShow(this.categoryId)
            .then(response => {
              this.localCategory = response.data.data
            })
        }
      }
    },
    confirmForm () {
      if (this.categoryId) {
        this.categoryUpdate(this.localCategory)
          .then(
            response => {
              this.localMessage = {
                text: response.data.message,
                status: response.status
              }
              this.localErrors = []
              this.loadCategory(this.categoryId)
            },
            error => {
              this.localMessage = {
                text: error.response.data.message,
                status: error.response.status
              }
              this.localErrors = error.response.data.errors
            })
      } else {
        this.categoryStore(this.localCategory)
          .then(
            response => {
              this.localMessage = {
                text: response.data.message,
                status: response.status
              }
              this.localErrors = []
            },
            error => {
              this.localMessage = {
                text: error.response.data.message,
                status: error.response.status
              }
              this.localErrors = error.response.data.errors
            })
      }
    }
  },
  created () {
    this.loadCategory(this.$route.params.id)
    this.parents()
      .then(
        response => {
          this.localParents = response.data.data
        }
      )
  }
}
</script>

<style scoped>
    .fade-enter {
        opacity: 0;
    }

    .fade-enter-active {
        transition: opacity .3s ease;
    }

    .fade-leave {}

    .fade-leave-active {
        transition: opacity .3s ease;
        opacity: 0;
    }
</style>
