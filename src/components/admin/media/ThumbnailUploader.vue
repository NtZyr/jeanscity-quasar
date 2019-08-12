<template>
    <div>
        <div class="q-pa-none">
            <div class="row items-center q-col-gutter-md" v-if="localThumbnail">
                <div class="col-auto">
                    <q-avatar size="100px" square>
                        <q-img :src="thumbnailPath"/>
                    </q-avatar>
                </div>
                <div class="col">
                    <h6 class="q-ma-none">
                        {{ localThumbnail.file_name }}
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
                label="Выберите миниатюру"
                ref="uploader"
                accept="image/png, image/jpg, image/jpeg"
                class="full-width q-mt-md q-mb-md"
                flat
                bordered
                :multiple="false"
                :factory="uploadFile"
        />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    thumbnail: Object,
    thumbnailPath: String
  },
  data () {
    return {
      localThumbnail: this.thumbnail
    }
  },
  name: 'MediaThumbnailUploader',
  methods: {
    ...mapActions({
      mediaStore: 'media/store',
      mediaDestroy: 'media/destroy',
      mediaShow: 'media/show'
    }),
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
  }
}
</script>

<style scoped>

</style>
