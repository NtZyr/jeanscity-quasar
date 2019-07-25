<template>
    <q-page class="bg-grey-2">
        <div class="row justify-center q-py-lg">
            <div class="row container q-col-gutter-x-lg q-pb-md-xl">
                <div class="col-md-8 col-sm-12">
                    <img src="../assets/images/map.svg" alt="" width="100%">
                </div>
                <div class="col-md-4 col-sm-12">
                    <p class="icon map q-mb-lg">Адрес будет находитсья здесь</p>
                    <p class="icon phone q-mb-lg">+7 (996) 453-93-03</p>
                    <p class="icon mail q-mb-lg">jeanscity@gmail.com </p>
                    <p class="icon vk q-mb-lg">https://vk.com/malkovich_21</p>
                    <q-form
                        @submit="onSubmit"
                        @reset="onReset"
                        class="form-background q-pa-lg flex justify-center"
                    >
                        <div class="text-uppercase text-h5 q-pb-md flex justify-center">Заказать звонок</div>
                        <q-input
                            required
                            filled
                            v-model="fullName"
                            label="имя и фамилия"
                            type="text"
                            class="full-width q-mb-md"
                        />
                        <q-input
                            filled
                            v-model="email"
                            label="email"
                            type="email"
                            class="full-width q-mb-md"
                        />
                        <q-input
                            required
                            filled
                            v-model="phone"
                            type="tel"
                            label="телефон"
                            mask="(###) ### - ####"
                            unmasked-value
                            fill-mask
                            class="q-mb-md full-width"
                        />
                        <q-input
                            required
                            filled
                            v-model="message"
                            label="сообщение"
                            type="textarea"
                            autogrow
                            class="full-width"
                        />
                        <q-btn class="q-mt-lg text-weight-bold" type="submit" outline color="primary" label="Отправить заявку" />
                    </q-form>
                </div>
            </div>
        </div>
    </q-page>
</template>

<style lang="stylus" scoped>
    .form-background
        background #FAFAFA
        border-radius 4px
        box-shadow: 0px 0.883469px 4.41734px rgba(0, 0, 0, 0.2), 0px 2.65041px 3.53388px rgba(0, 0, 0, 0.12), 0px 1.76694px 3.53388px rgba(0, 0, 0, 0.14);
    .icon
        position: relative
        padding-left 40px
        width 100%
        color #3C3C3C
        &:before
            content: ''
            position: absolute
            height 24px
            width 24px
            left 0
            top 0
            background-repeat no-repeat
    .map
        &:before
            background-image url("../assets/images/icon-map.svg")
            background-size 18px 24px
    .phone
        &:before
            background-image url("../assets/images/icon-phone.svg")
            background-size 22px 22px
    .mail
        &:before
            background-image url("../assets/images/icon-mail.svg")
            background-size 24px 20px
    .vk
        &:before
            background-image url("../assets/images/icon-vk.svg")
            background-size 24px 16px
</style>

<script>
    export default {
        data() {
            return {
                fullName: null,
                email: null,
                phone: null,
                message: null
            }
        }
    }
</script>
