<template>
    <q-form @submit="confirmForm">
        <template v-if="slideId">
            <h2 class="text-h6">Редактирование слайда</h2>
        </template>
        <template v-else>
            <h2 class="text-h6">Создание нового слайда</h2>
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
                <q-uploader
                        label="Картинка слайда"
                        ref="uploader"
                        accept="image/png, image/jpg, image/jpeg"
                        class="full-width q-mt-md q-mb-md"
                        flat
                        bordered
                        :multiple="false"
                        :factory="uploadFile"
                />
                <q-input
                    v-model="slide.title"
                    label="Заголовок слайда"
                />
                <q-input
                    v-model="slide.text"
                    label="Текст слайда"
                />
                <q-input
                    v-model="slide.link"
                    label="Ссылка кнопки"
                />
                <q-input
                    v-model="slide.link_label"
                    label="Текст кнопки"
                />
            </q-card-section>
            <q-separator/>
            <q-card-actions>
                <q-btn to="/admin/homepage/slider" unelevated>Отменить</q-btn>
                <q-space/>
                <q-btn type="submit" unelevated color="primary">Сохранить</q-btn>
            </q-card-actions>
        </q-card>
    </q-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'HomeSliderForm',
  data () {
    return {
      slideId: null,
      slide: {},
      message: {},
      errors: []
    }
  },
  watch: {
    '$route.params.id': function (slideId) {
      this.loadSlide(slideId)
    },
    message (value) {
      setTimeout(() => {
        this.message = {}
      }, 2000)
    }
  },
  computed: {
    ...mapGetters({
      auth: 'auth/authUser'
    })
  },
  methods: {
    ...mapActions({
      slideStore: 'homeslides/store',
      slideUpdate: 'homeslides/update',
      slideShow: 'homeslides/show',
      mediaStore: 'media/store',
      mediaShow: 'media/show'
    }),
    loadSlide (slideId) {
      this.slide = {}
      this.slideId = slideId
      if (slideId !== 'undefined') {
        this.slideId = slideId

        if (this.slideId) {
          this.slideShow(this.slideId)
            .then(response => {
              this.slide = response.data.data
            })
        }
      }
    },
    uploadFile (files) {
      let formData = new FormData()
      formData.append('media', files[0])
      this.mediaStore(formData)
        .then(response => {
          console.log(response)
          this.message = {
            text: response.data.message,
            status: response.status
          }
          this.slide.media = response.data.data.id
        })
    },
    confirmForm () {
      if (this.slideId) {
        this.slide.creator_id = this.slide.creator.id
        this.slideUpdate(this.slide)
          .then(
            response => {
              this.message = {
                text: response.data.message,
                status: response.status
              }
              this.errors = []
              this.loadSlide(this.slideId)
            },
            error => {
              console.log(error)
              this.message = {
                text: error.response.data.message,
                status: error.response.status
              }
              this.errors = error.response.data.errors
            })
      } else {
        this.slide.creator_id = this.auth.id
        this.slideStore(this.slide)
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
    this.loadSlide(this.$route.params.id)
  }
}
</script>

<style scoped>

</style>
