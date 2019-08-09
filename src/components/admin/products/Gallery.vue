<template>
    <div class="col-12 q-pt-sm q-pl-sm q-pr-sm">
        <div class="text-h6 q-pb-sm">Галерея товара</div>
        <q-carousel
                arrows
                v-model="slider"
                v-if="gallery.length > 0"
        >
            <q-carousel-slide
                    v-for="(slide, index) in localGallery"
                    :name="index"
                    :key="slide.id"
                    :img-src="storagePath + slide.id + '/' + slide.file_name"
            />
        </q-carousel>
        <q-uploader
                label="Выберите изображения для загрузки"
                ref="uploader"
                accept="image/png, image/jpg, image/jpeg"
                class="full-width q-mt-md q-mb-md"
                flat
                bordered
                multiple
                :factory="uploadFile"
        />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { STORAGE_URL } from '../../../api'

export default {
  name: 'VariantGallery',
  data () {
    return {
      slider: 1,
      localGallery: this.gallery,
      media: []
    }
  },
  props: {
    gallery: Array
  },
  computed: {
    storagePath () {
      return STORAGE_URL
    }
  },
  watch: {
    media (value) {
      this.$emit('uploadMedia', value)
    }
  },
  methods: {
    ...mapActions({
      mediaStore: 'media/store',
      mediaDestroy: 'media/destroy',
      mediaShow: 'media/show'
    }),
    uploadFile (files) {
      this.media = []
      files.forEach(file => {
        let formData = new FormData()
        formData.append('media', file)
        this.mediaStore(formData)
          .then(response => {
            this.message = {
              text: response.data.message,
              status: response.status
            }
            this.media.push(response.data.data.id)
          })
      })
    }
  }
}
</script>

<style scoped>

</style>
