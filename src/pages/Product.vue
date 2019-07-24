<template>
    <div class="q-py-md q-px-none row q-col-gutter-x-lg content-margin">
        <div class="col-md-3 col-sm-4 col-xs-12 q-mb-xs-xl">
            <div class="expansion-shadow">
                <q-expansion-item
                    expand-separator
                    label="Цена"
                    class="bg-white expansion-item"
                >
                    <q-card>
                        <q-card-section class="row q-px-xs q-py-sm">
                            <div class="col-12 q-px-md">
                                <q-range
                                    v-model="standard"
                                    :min="0"
                                    :max="200000"
                                />
                            </div>

                            <div class="col-12 items-center q-col-gutter-none">
                                <div class="row items-center">
                                    <div class="col-md-6 col-xs-12 flex items-center justify-center">
                                        <p class="no-margin q-pr-sm">от</p>
                                        <q-input
                                            v-model.number="standard.min"
                                            type="number"
                                            style="max-width: 65px"
                                        />
                                        <p class="no-margin">&#8381;</p>
                                    </div>
                                    <div class="col-md-6 col-xs-12 flex items-center justify-center">
                                        <p class="no-margin q-pr-sm">до</p>
                                        <q-input
                                            v-model.number="standard.max"
                                            type="number"
                                            style="max-width: 65px;"
                                        />
                                        <p class="no-margin">&#8381;</p>
                                    </div>

                                </div>
                            </div>
                            <q-checkbox v-model="teal" label="Скидки" class="col-12 q-py-sm"/>
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
                <q-expansion-item
                    expand-separator
                    label="Размер"
                    class="bg-white expansion-item"
                >
                    <q-card>
                        <q-card-section class="row q-px-xs q-py-sm">
                            <q-checkbox v-model="teal" label="XS" class="col-sm-6 col-xs-12"/>
                            <q-checkbox v-model="teal" label="S" class="col-sm-6 col-xs-12"/>
                            <q-checkbox v-model="teal" label="M" class="col-sm-6 col-xs-12"/>
                            <q-checkbox v-model="teal" label="L" class="col-sm-6 col-xs-12"/>
                            <q-checkbox v-model="teal" label="XL" class="col-sm-6 col-xs-12"/>
                            <q-checkbox v-model="teal" label="XXL" class="col-sm-6 col-xs-12"/>
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
                <q-expansion-item
                    expand-separator
                    label="Бренд"
                    class="bg-white expansion-item"
                >
                    <q-card>
                        <q-card-section class="row q-px-xs q-py-sm">
                            <q-checkbox v-model="teal" label="adidas" class="col-12"/>
                            <q-checkbox v-model="teal" label="tommy hilfiger" class="col-12"/>
                            <q-checkbox v-model="teal" label="under armour" class="col-12"/>
                            <q-checkbox v-model="teal" label="corrymoor" class="col-12"/>
                            <q-checkbox v-model="teal" label="dolche gabana" class="col-12"/>
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
                <q-expansion-item
                    expand-separator
                    label="Сезон"
                    class="bg-white expansion-item"
                >
                    <q-card>
                        <q-card-section class="row q-px-xs q-py-sm">
                            <q-checkbox v-model="teal" label="Лето" class="col-12"/>
                            <q-checkbox v-model="teal" label="Зима" class="col-12"/>
                            <q-checkbox v-model="teal" label="Демисезон" class="col-12"/>
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
                <q-expansion-item
                    expand-separator
                    label="Материал"
                    class="bg-white expansion-item"
                >
                    <q-card>
                        <q-card-section class="row q-px-xs q-py-sm">
                            <q-checkbox v-model="teal" label="Бамбук" class="col-12"/>
                            <q-checkbox v-model="teal" label="Полиэстер" class="col-12"/>
                            <q-checkbox v-model="teal" label="Хлопок" class="col-12"/>
                            <q-checkbox v-model="teal" label="Пикачу" class="col-12"/>
                            <q-checkbox v-model="teal" label="Шёлк" class="col-12"/>
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
                <q-expansion-item
                    expand-separator
                    label="Пол"
                    class="bg-white expansion-item"
                >
                    <q-card>
                        <q-card-section class="row q-px-xs q-py-sm">
                            <q-checkbox v-model="teal" label="Мужчины" class="col-12"/>
                            <q-checkbox v-model="teal" label="Женщины" class="col-12"/>
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
            </div>
        </div>
        <div class="col-md-9 col-sm-8 col-xs-12 product-items">
            <div class="row justify-between q-pb-md">
                <div class="text-h6 text-uppercase">Все товары</div>
                <q-select outlined v-model="model" :options="options" style="min-width: 160px" label="Сортировать" />
            </div>
            <div class="row q-col-gutter-x-lg">
                <div class="col-md-4 col-sm-6 col-xs-12 q-pb-lg" v-for="(item, index) in paginatedItems">
                    <router-link to="products/item" style="text-decoration: none; color: #3C3C3C;">
                        <div class="focused-item">
                            <div class="bg-white q-pa-xs q-mb-sm flex items-center relative-position">
                                <div class="column wrap sizes" style="position:absolute; top: 4px; left: 4px;">
                                    <div class="bg-black text-white sizes-item" v-for="size in sizes">{{size}}</div>
                                </div>
                                <img :src="item.img" width="100%" alt="">
                            </div>
                            <div class="info">
                                <div class="flex">
                                    <div class="text-weight-bold price" :class="{ 'sail': item.sail}" v-show="item.sail">{{item.price}} руб.</div>
                                    <div class="text-weight-bold price" :class="{ 'not-sail': item.sail}">{{item.price}} руб.</div>
                                </div>
                                <p class="no-margin q-pb-sm">{{item.name}}</p>
                                <div class="text-h6 q-pb-lg">{{item.type}}</div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="row q-py-md justify-end">
                    <q-pagination
                        :max="maxPages()"
                        :direction-links="true"
                        v-model="pageNumber"
                        :maxPages="5"
                    >
                    </q-pagination>
            </div>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
    .white-line
        height 44px
        width 100%
        position fixed
        background #fff
        z-index 5
    .container
        max-width 1200px
        width 100%
    .menu
        .q-tab--inactive
            opacity 1
        .q-tab
            min-width 100px
            text-transform none
        .q-tabs
            height 44px
            position fixed
            z-index 5
        .q-focusable
            border-radius 5px 5px 0 0
    .content-margin
        margin-top 44px
    .expansion-shadow
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
    .expansion-item
        z-index 999
        .q-item
            padding 8px 24px 8px 36px
        p
            font-size 13px
        .q-item__section--main
            padding-left 16px
    .product-items
        .text-h5
            font-size 20px
        .text-h6
            font-size 16px
        p
            color #3C3C3C
            font-weight 300
    .focused-item:hover
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
        background #fff
        transform scale(1.15)
        transition transform .3s ease
        border-radius 4px
        .info
            padding-left 10px
            transition padding-left .3s ease
        .sizes
            display flex
    .price
        font-size 20px
        color #3C3C3C
    .sail
        color #B61118
        padding-right 15px
        font-size 20px
    .not-sail
        display flex
        align-items center
        font-size 16px
        color #868686
        text-decoration line-through
    .sizes
        display none
        height 99%
    .sizes-item
        padding 5px 10px
        margin-bottom 1px
        margin-right 1px
        font-weight 700
        text-align center
        opacity .5

</style>

<script>
    export default {
        data () {
            return {
                tab: 'mails',
                teal: false,
                pageNumber: 1,
                size: 4,
                // maxPages: maxPages(),
                standard: {
                    min: 10,
                    max: 111175
                },
                model: null,
                options: [
                    'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
                ],
                sizes: ['xs','s','m','l','xl','s','m','l','xl','s','m','l','xl','xl','s','m','l','xl'],
                listData: [
                    {
                        price: 10000,
                        name: 'Lamborghiny',
                        type: 'Футболка мужская',
                        img: '../assets/images/image.png',
                        sail: true
                    },
                    {
                        price: 10000,
                        name: 'Lamborghiny',
                        type: 'Футболка мужская',
                        img: '../assets/images/image2.png',
                        sail: false
                    },
                    {
                        price: 10000,
                        name: 'Lamborghiny',
                        type: 'Футболка мужская',
                        img: '../assets/images/image.png',
                        sail: true
                    },
                    {
                        price: 10000,
                        name: 'Lamborghiny',
                        type: 'Футболка мужская',
                        img: '../assets/images/image2.png',
                        sail: false
                    },
                    {
                        price: 10000,
                        name: 'Lamborghiny',
                        type: 'Футболка мужская',
                        img: '../assets/images/image.png',
                        sail: true
                    },
                    {
                        price: 10000,
                        name: 'Lamborghiny',
                        type: 'Футболка мужская',
                        img: '../assets/images/image.png'
                    },
                    {
                        price: 10000,
                        name: 'Lamborghiny',
                        type: 'Футболка мужская',
                        img: '../assets/images/image.png'
                    },
                    {
                        price: 10000,
                        name: 'Lamborghiny',
                        type: 'Футболка мужская',
                        img: '../assets/images/image.png'
                    },
                    {
                        price: 10000,
                        name: 'Lamborghiny',
                        type: 'Футболка мужская',
                        img: '../assets/images/image.png'
                    },
                    {
                        price: 10000,
                        name: 'Lamborghiny',
                        type: 'Футболка мужская',
                        img: '../assets/images/image2.png'
                    }
                ]
            }
        },
        methods: {
            maxPages() {
                let pages = Math.floor(this.listData.length / this.size);
                if (this.listData.length % this.size > 0)
                    pages = pages + 1;
                return pages;
            }
        },
        computed: {
            paginatedItems() {
                const start = (this.pageNumber-1) * this.size,
                    end = start + this.size;
                return this.listData.slice(start, end);
            }
        }
    }
</script>
