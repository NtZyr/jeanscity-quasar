<template>
    <div id="q-app">
        <q-layout view="hHh lpR fff">
            <q-header class="bg-white row no-wrap justify-center">
                <div class="container row q-col-gutter-x-lg header">
                    <q-toolbar class="col-md-2 col-sm-4 col-xs-12 justify-sm-start justify-xs-center mobile-toolbar-height-fix">
                        <a class="logo-link" href="/"><img src="assets/images/logo.svg" alt=""></a>
                    </q-toolbar>
                    <q-toolbar class="col-md-10 col-sm-8 col-xs-12 justify-md-between justify-sm-end mobile-toolbar-height-fix">
                        <q-tabs
                            v-model="tab"
                            narrow-indicator
                            :breakpoint="0"
                            align="justify"
                            class="bg-white col-md-8 col-xl-8 sm-hide xs-hide"
                        >
                            <q-tab v-if="$q.screen.gt.sm" name="man" label="Мужское"/>
                            <q-tab v-if="$q.screen.gt.sm" name="woman" label="Женское" />
                            <q-tab v-if="$q.screen.gt.sm" name="brands" label="Бренды" />
                            <q-tab v-if="$q.screen.gt.sm" name="sails" label="Скидки" />
                            <q-tab v-if="$q.screen.gt.sm" name="contacts" label="Контакты" />
                        </q-tabs>
                        <div class="col-xs-12 col-sm-auto col-lg-4 col-md-4 col-xl-4 flex justify-md-end justify-xs-between header-btns no-wrap">
                            <q-btn router="tel:+79964539303" flat style="color: #3C3C3C" icon="phone" label="+7 (996) 453-93-03" class="icon-hide"/>
                            <q-btn router="/" flat style="color: #3C3C3C" icon="search" label="" />
                            <q-btn router="/card" flat style="color: #3C3C3C" icon="shopping_cart" label="" />
                            <q-btn-dropdown v-if="$q.screen.lt.md" style="color: #3C3C3C" auto-close stretch flat icon="menu">
                                <q-list separator link class="menu-dropdown text-center">
                                    <q-item clickable @click="tab = 'man'">
                                        <q-item-section>Мужское</q-item-section>
                                    </q-item>
                                    <q-item clickable @click="tab = 'woman'">
                                        <q-item-section>Женское</q-item-section>
                                    </q-item>
                                    <q-item clickable @click="tab = 'brands'">
                                        <q-item-section>Бренды</q-item-section>
                                    </q-item>
                                    <q-item clickable @click="tab = 'sails'">
                                        <q-item-section>Скидки</q-item-section>
                                    </q-item>
                                    <q-item clickable @click="tab = 'contacts'">
                                        <q-item-section>Контакты</q-item-section>
                                    </q-item>
                                </q-list>
                            </q-btn-dropdown>
                        </div>
                    </q-toolbar>
                </div>
            </q-header>

            <q-page-container>
                <router-view />
            </q-page-container>

            <q-footer class="bg-white text-white">
                <q-toolbar class="row justify-center text-black q-py-md">
                    <div class="row container q-col-gutter-x-lg">
                        <div class="col-sm-4 col-md-6 col-xs-12">
                            <div class="row">
                                <div class="col-12">
                                    <div class="text-h6 text-uppercase">Подписка на рассылку</div>
<!--                                    <h6 class="text-uppercase">Подписка на рассылку</h6>-->
                                </div>
                                <div class="col-12">
                                    <div class="row wrap items-sm-center q-col-gutter-x-md">
                                        <div class="col-xs-12 col-sm-12 col-md-7 col-sm-7 q-py-xs-lg">
                                            <q-input style="height: 40px" v-model="email" type="email" label="email"></q-input>
                                        </div>
                                        <div class="col-xs-12 col-sm-12 col-md-4 self-md-end q-py-md-lg q-pb-xs-xl subscription-btn">
                                            <q-btn color="red-8" text-color="white" label="Подписаться" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4 col-md-3 col-xs-12">
                            <div class="row">
                                <div class="col-12">
                                    <div class="text-h6 text-uppercase">Информация</div>
<!--                                    <h6 class="text-uppercase">Информация</h6>-->
                                </div>
                                <div class="col-12 column q-py-lg">
                                    <a href="">Оплата</a>
                                    <a href="" class="q-py-sm">Доставка</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4 col-md-3 col-xs-12">
                            <div class="row">
                                <div class="col-12">
                                    <div class="text-h6 text-uppercase">Контакты</div>
<!--                                    <h6 class="text-uppercase">Контакты</h6>-->
                                </div>
                                <div class="col-12 column q-py-lg">
                                    <a href="">+7 (996) 453-93-03</a>
                                    <a href="" class="q-py-sm text-">jeanscity@gmail.com </a>
                                    <a href="">jeanscity@gmail.com </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </q-toolbar>
            </q-footer>

        </q-layout>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            tab: '',
            email: ''
        }
    }
}
</script>

<style lang="scss">
    .container {
        width: 100%;
        max-width: 1200px;
    }
    .q-header {
        .q-toolbar {
            a:first-child {
                display: inline-block;
                vertical-align: top;
                line-height: 0;
            }
        }
    }
    .q-tab__indicator {
        color: #E71821;
        height: 4px;
    }
    .header .q-tabs__content {
        height: 80px;
    }
    .q-tab {
        outline: none;
        color: #3C3C3C;
        max-width: 110px;
        padding: 0;
    }
    .header-links {
        i {
            font-size: 24px;
        }
        a {
            color: #3C3C3C;
            text-decoration: none;
            &:first-child {
                padding-right: 35px;
                align-items: center;
            }
            &:last-child {
                padding-left: 35px;
            }
        }
    }
    .header-btns {
        a {
            text-decoration: none;
            color: #3C3C3C;
            display: flex;
            align-items: center;
        }
        .q-btn__content i {
            font-size: 24px;
        }
        .q-btn-dropdown i {
            font-size: 28px;
        }
    }
    .q-btn-dropdown__arrow {
        display: none;
    }
    .menu-dropdown {
        .q-item {
            min-width: 150px;
        }
    }
    .icon-hide {
        .q-btn__content {
            font-weight: 500;
            i {
                display: none;
                margin-right: 0;
            }
        }
    }
    .q-footer {
        a {
            text-decoration: none;
            color: #000;
            font-size: 16px;
            &:hover {
                text-decoration: underline;
            }
        }
    }

    //TODO

    @media (min-width: 1440px) {
        .q-header .q-tab__content {
            min-width: auto;
        }
    }

    @media (max-width: 1023px) {
        .toolbar-container {
            div:nth-child(2) {
                order: 3;
            }
        }
        .icon-hide {
            .q-btn__content {
                div {
                    display: none;
                }
                i {
                    display: block;
                }
            }
        }
    }

    @media (max-width: 599px) {
        .logo-link {
            text-align: center;
        }
        .toolbar-container {
            img {
                height: 32px;
            }
        }
        .q-menu {
            width: 90%;
            left: auto;
            right: 8px;
        }
        .subscription-btn {
            .q-btn {
                width: 100%;
            }
        }
        .mobile-toolbar-height-fix {
            min-height: auto;
            padding-bottom: 6px;
        }
    }
</style>
