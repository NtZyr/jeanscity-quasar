<template>
    <q-page class="bg-grey-2">
        <div class="row justify-center">
            <div class="white-line"></div>
            <div class="row container q-col-gutter-x-lg">
                <div class="col-12 menu">
                    <q-tabs
                        v-model="tab"
                        dense
                        class="text-grey"
                        indicator-color="grey-2"
                        align="justify"
                        active-bg-color="grey-2"
                        bg-color="white"
                    >
                        <q-route-tab name="all" label="Все товары" class="bg-white" to="/products"/>
                        <q-route-tab name="alarms" label="Alarms" class="bg-white" to="/products"/>
                        <q-route-tab name="movies" label="Movies" class="bg-white" to="/products"/>
                    </q-tabs>
                    <router-view/>
                </div>
            </div>
        </div>
    </q-page>
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
        box-shadow: 9px 10px 9px -4px rgba(0,0,0,0.41);
    .expansion-item
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
        box-shadow 9px 10px 9px -4px rgba(0,0,0,0.41)
        background #fff
        transform scale(1.15)
        transition transform .3s ease
        border-radius 4px
        .info
            padding-left 10px
            transition padding-left .3s ease
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
                listData: [
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
