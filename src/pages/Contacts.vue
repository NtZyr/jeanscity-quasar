<template>
    <q-page-container>
        <q-page class="bg-grey-2">
            <div class="row justify-center q-py-lg">
                <div class="row container q-col-gutter-x-lg q-pb-md-xl">
                    <div class="col-md-8 col-sm-12 q-pb-xs-lg q-pb-md-none overflow-hidden">
                        <GmapMap
                                ref="mapRef"
                                :zoom="13"
                                :center="{lat:10, lng:10}"
                                style="width: 100%; height: 100%;"
                        >
                        </GmapMap>
                    </div>
                    <div class="col-md-4 col-sm-12">
                        <p class="icon map q-mb-lg">
                            <i class="material-icons">
                                location_on
                            </i>
                            Адрес будет находитсья здесь
                        </p>
                        <p class="icon phone q-mb-lg">
                            <i class="material-icons">
                                phone
                            </i>
                            +7 (996) 453-93-03
                        </p>
                        <p class="icon mail q-mb-lg">
                            <i class="material-icons">
                                email
                            </i>
                            jeanscity@gmail.com
                        </p>
                        <p class="icon-custom vk q-mb-lg">https://vk.com/malkovich_21</p>
                        <q-form
                            @submit="callbackSubmit"
                            class="form-background q-pa-lg flex justify-center"
                        >
                            <h5 class="text-uppercase no-margin q-pb-md flex justify-center">Заказать звонок</h5>
                            <q-input
                                required
                                filled
                                v-model="callback.customer.name"
                                label="Имя и фамилия"
                                type="text"
                                class="full-width q-mb-md"
                            />
                            <q-input
                                filled
                                v-model="callback.customer.email"
                                label="Email"
                                type="email"
                                class="full-width q-mb-md"
                            />
                            <q-input
                                required
                                filled
                                v-model="callback.customer.phone"
                                type="tel"
                                label="Телефон"
                                mask="+7 (###) ### - ####"
                                unmasked-value
                                fill-mask
                                class="q-mb-md full-width"
                            />
                            <q-input
                                    required
                                    filled
                                    v-model="callback.subject"
                                    label="Тема сообщения"
                                    class="q-mb-md full-width"
                            />
                            <q-input
                                required
                                filled
                                v-model="callback.text"
                                label="Сообщение"
                                type="textarea"
                                class="full-width"
                            />
                            <q-btn class="q-mt-lg text-weight-medium" type="submit" outline color="primary" label="Отправить заявку" />
                        </q-form>
                    </div>
                </div>
            </div>
        </q-page>
    </q-page-container>
</template>

<style lang="stylus" scoped>
    .form-background
        background #FAFAFA
        border-radius 4px
        box-shadow 0px 0.883469px 4.41734px rgba(0, 0, 0, 0.2), 0px 2.65041px 3.53388px rgba(0, 0, 0, 0.12), 0px 1.76694px 3.53388px rgba(0, 0, 0, 0.14)
        h5
            color #3C3C3C
    .icon
        position: relative
        width 100%
        color #3C3C3C
        font-size 15px
        i
            font-size 26px
            color #A4A4A4
            margin-right 15px
    .icon-custom
        position: relative
        padding-left 40px
        width 100%
        color #3C3C3C
        font-size 15px
        &:before
            content: ''
            position: absolute
            height 24px
            width 24px
            left 0
            top 0
            background-repeat no-repeat
    .vk
        &:before
            background-image url("/statics/images/icon-vk.svg")
            background-size 24px 16px
</style>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      callback: {
        customer: {
          name: null,
          email: null,
          phone: null
        },
        subject: null,
        text: null
      }
    }
  },
  methods: {
    ...mapActions({
      callbackStore: 'callbacks/store'
    }),
    clearCallback () {
      this.callback = {}
    },
    callbackSubmit () {
      this.callbackStore(this.callback)
        .then(response => {
          this.$q.notify({
            message: response.data.message,
            color: 'positive',
            position: 'top'
          })
          this.clearCallback()
        })
    }
  }
}
</script>
