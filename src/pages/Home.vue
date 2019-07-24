<template>
    <q-page class="bg-grey-2">
        <div class="row justify-center q-py-lg">
            <div class="row container gallery-top q-col-gutter-x-lg q-pb-md-xl q-pt-md-md">
                <div class="col-md-6 col-sm-12 col-xs-12 q-py-md-none q-py-sm-md q-py-xs-xs">
<!--                    <q-card class="my-card bg-purple text-white col-12 flex column q-px-lg q-py-md">-->
<!--                        <q-card-section>-->
<!--                            <div class="text-h4 q-pb-md">Заголовок слайда</div>-->
<!--                            <div class="text-subtitle2">by John Doe</div>-->
<!--                        </q-card-section>-->

<!--                        <q-card-actions class="flex card-btn">-->
<!--                            <q-btn color="primary" size="18px" label="Кнопка"></q-btn>-->
<!--                        </q-card-actions>-->
<!--                    </q-card>-->
                    <q-carousel
                        animated
                        v-model="slide"
                        :autoplay="5500"
                        arrows
                        infinite
                        height="325px"
                        class="slider"
                    >
                        <q-carousel-slide class="slider-item" :name="1" img-src="https://picsum.photos/568/325">
                            <q-btn class="slider-btn" to="/contacts" color="primary" size="18px" label="Кнопка"></q-btn>
                            <div class="text-h4 text-black" style="position:absolute; top: 18px; left: 18px; color: #fff;">Заголовок</div>
                        </q-carousel-slide>
                        <q-carousel-slide class="slider-item" :name="2" img-src="https://picsum.photos/568/325">
                            <q-btn class="slider-btn" to="/contacts" color="primary" size="18px" label="Кнопка"></q-btn>
                        </q-carousel-slide>
                        <q-carousel-slide class="slider-item" :name="3" img-src="https://picsum.photos/568/325">
                            <q-btn class="slider-btn" to="/contacts" color="primary" size="18px" label="Кнопка"></q-btn>
                        </q-carousel-slide>
                        <q-carousel-slide class="slider-item" :name="4" img-src="https://picsum.photos/568/325">
                            <q-btn class="slider-btn" to="/contacts" color="primary" size="18px" label="Кнопка"></q-btn>
                        </q-carousel-slide>

                    </q-carousel>
                </div>
                <div class="col-md-3 col-sm-6 col-xs-12 q-py-md-none q-py-sm-sm q-py-xs-xs">
                    <q-card class="my-card bg-purple text-white col-12 flex items-end">
                        <q-card-section>
                            <div class="text-h5 q-pb-lg">Мужской каталог</div>
                        </q-card-section>
                    </q-card>
                </div>
                <div class="col-md-3 col-sm-6 col-xs-12 q-py-md-none q-py-sm-sm q-py-xs-xs">
                    <q-card class="my-card bg-purple text-white col-12 flex items-end">
                        <q-card-section>
                            <div class="text-h5 q-pb-lg">Женский каталог</div>
                        </q-card-section>
                    </q-card>
                </div>
            </div>
            <div class="row container q-col-gutter-x-lg justify-center">
                <div class="col-md-2 col-sm-4 col-xs-6 q-py-sm-sm q-py-xs-xs gallery-bottom" v-for="(item, index) in getFirstLine">
                    <q-card class="my-card bg-purple text-white col-12">
                        <q-card-section>
                            <div class="text-subtitle2">by John Doe</div>
                        </q-card-section>
                    </q-card>
                </div>
            </div>
            <div class="row container q-col-gutter-x-lg justify-center gallery-animation" :class="{collapsed: !show}">
                <div class="col-md-2 col-sm-4 col-xs-6 q-py-sm-sm q-py-xs-xs gallery-bottom"
                     v-for="(item, index) in getArray"
                     :key="item.index"
                >
                    <q-card class="my-card bg-purple text-white col-12">
                        <q-card-section>
                            <div class="text-subtitle2">by John Doe</div>
                        </q-card-section>
                    </q-card>
                </div>
            </div>
            <div class="row container q-col-gutter-x-md justify-center q-py-md">
                <div class="col-md-4 col-sm-5 col-xs-8 btn-dropdown">
                    <q-btn class="text-weight-bold" color="primary" outline label="Показать все бренды" @click="show = !show"/>
                </div>
            </div>

        </div>
    </q-page>
</template>

<style lang="scss" scoped>
    .container {
        max-width: 1200px;
        width: 100%;
    }
    .gallery-top {
        .q-card {
            height: 325px;
            border-right: 2px;
        }
        .my-card {
            justify-content: space-between;
            .q-card__actions {
                justify-content: flex-end;
            }
        }
        .card-btn {
            .q-btn {
                padding: 0 18px;
            }
        }
    }
    .gallery-bottom {
        .q-card {
            border-radius: 0;
        }
    }
    .btn-dropdown {
        .q-btn {
            width: 100%;
        }
    }
    .gallery-animation {
        transition: all .5s ease-in-out;
        max-height: 500px;
        opacity: 1;
    }
    .collapsed {
        max-height: 0px;
        overflow: hidden;
        padding: 0px;
        opacity: 0;
    }
    .slider {
        border-radius: 4px;
        .slider-item {
            position: relative;
            .slider-btn {
                position: absolute;
                bottom: 16px;
                right: 16px;
            }
        }
    }

</style>

<script>
export default {
    name: 'Home',
    data() {
        return {
            slide: 1,
            array: [1,2,31,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            show: false
        }
    },
    computed: {
        getFirstLine() {
            const arr = this.array.filter((item , index)=>{
                return index < 6;
            })
            return arr;
        },
        getArray() {
            const arr = this.array.filter((item , index)=>{
                return index > 5;
            })
            return arr;
        }
    },
    methods: {

    }
}
</script>
