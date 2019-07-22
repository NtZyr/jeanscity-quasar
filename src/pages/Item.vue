<template>
    <div class="q-py-md q-px-none row q-col-gutter-x-lg content-margin">
        <q-scroll-area class='col-1 offset-1' style="height: 500px;">
            <div v-for="(item, index) in small">
                <img class='q-pb-xl' :src="item.img" width="100%" alt="">
            </div>
        </q-scroll-area>
        <div class="col-10">
            <div class="row q-col-gutter-x-lg">
                <div class="col-6">
                    <img src="../assets/images/image.png" width="100%" alt="">
                </div>
                <div class="col-6 q-pt-lg">
                    <div class="text-h5">Футболка мужская</div>
                    <div class="text-subtitle1 q-pt-sm">Бренд: Lamborghiny</div>
                    <div class="text-h6 q-pt-md" :class="{ 'not-sail': sail}">10000 р.</div>
                    <div class="text-h6 q-pt-md" :class="{ 'sail': sail}" v-show="sail">10000 р.</div>
                    <div class="text-subtitle1 q-pt-md">Размер:</div>
                    <q-select class="q-pb-md" outlined v-model="model" style="max-width: 200px" :options="options" label="Выберите размер" />
                    <q-btn color="red-8" class="q-mb-xl q-mt-xl" label="Добавить в корзину" />
                    <div class="product-info q-pt-xl q-pb-xl q-mb-lg">
                        <div class="text-subtitle1 q-pb-md">О товаре:</div>
                        <p class="no-margin q-pb-sm"><span>пол: </span>мужской</p>
                        <p class="no-margin q-pb-sm"><span>цвет: </span>красный</p>
                        <p class="no-margin q-pb-sm"><span>материал: </span>хлопок</p>
                        <p class="no-margin q-pb-sm"><span>модель (тип): </span>футболка</p>
                        <p class="no-margin q-pb-sm"><span>сезон: </span>лето</p>
                        <p class="no-margin q-pb-sm"><span>артикул: </span>1110151050</p>
                        <p class="no-margin q-pb-sm"><span>страна-производитель: </span>Индонезия</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
    .content-margin
        padding-top 44px
    .text-subtitle1
        color #3C3C3C
        font-weight 300
    .product-info
        span
            color #3C3C3C
            font-weight 300
    .sail
        color #B61118
        padding-top 0
        font-size 28px
    .not-sail
        color #868686
        text-decoration line-through
    .q-scrollarea__thumb--v
        width 5px !important
</style>

<script>
    export default {
        data() {
            return {
                model: null,
                sail: true,
                options: [
                    'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
                ],
                small: [
                    {
                        img: "../assets/images/image.png",
                    },
                    {
                        img: "../assets/images/image2.png",
                    },
                    {
                        img: "../assets/images/image.png",
                    },
                    {
                        img: "../assets/images/image2.png",
                    },
                    {
                        img: "../assets/images/image2.png",
                    },
                    {
                        img: "../assets/images/image2.png",
                    }
                ],
                images: [
                    {
                        id: 1,
                        img: "../assets/images/image.png"
                    },
                    {
                        id: 2,
                        img: "../assets/images/image2.png"
                    },
                    {
                        id: 3,
                        img: "../assets/images/image.png"
                    },
                    {
                        id: 4,
                        img: "../assets/images/image2.png"
                    },
                    {
                        id: 5,
                        img: "../assets/images/image.png"
                    }
                ]
            }
        }
    }
</script>
