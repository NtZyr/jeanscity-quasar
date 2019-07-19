<template>
    <div id="q-app">
        <q-layout view="hHh lpR fff">
            <q-header class="bg-white row justify-center">
                <q-toolbar class="container row q-col-gutter-x-md justify-between">
                    <a class="col-xs-12 col-sm-auto col-md-2 q-py-xs-xs logo-link" href=""><img src="assets/images/logo.svg" alt=""></a>
                    <q-tabs
                        v-model="tab"
                        narrow-indicator
                        :breakpoint="0"
                        align="justify"
                        class="bg-white col-lg-6 col-md-6 sm-hide xs-hide"
                    >
                        <q-tab v-if="$q.screen.gt.sm" name="man" label="Мужское" />
                        <q-tab v-if="$q.screen.gt.sm" name="woman" label="Женское" />
                        <q-tab v-if="$q.screen.gt.sm" name="brands" label="Бренды" />
                        <q-tab v-if="$q.screen.gt.sm" name="sails" label="Скидки" />
                        <q-tab v-if="$q.screen.gt.sm" name="contacts" label="Контакты" />
                    </q-tabs>
                    <div class="col-xs-12 col-sm-auto col-lg-4 col-md-4 flex justify-md-end justify-xs-between header-btns no-wrap">
                        <q-btn router="tel:+79999999999" flat style="color: #3C3C3C" icon="phone" label="+7 (996) 453-93-03" class="icon-hide"/>
                        <q-btn router="/" flat style="color: #3C3C3C" icon="search" label="" />
                        <q-btn router="/" flat style="color: #3C3C3C" icon="shopping_cart" label="" />
                        <q-btn-dropdown v-if="$q.screen.lt.md" style="color: #3C3C3C" auto-close stretch flat icon="menu">
                            <q-list separator link class="menu-dropdown">
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
                <q-toolbar>

                </q-toolbar>
            </q-header>

            <q-page-container>
                <router-view />
            </q-page-container>

            <q-footer class="bg-white text-white">
                <q-toolbar class="row justify-center">
                    <div class="container row q-col-gutter-x-md">
                        <div class="col-5">
                            fdsf
                        </div>
                        <div class="col-3">
                            fdsfs
                        </div>
                        <div class="col-3">
                            fdsf
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
            tab: ''
        }
    }
}
</script>

<style lang="scss">
    .container {
        width: 100%;
        max-width: 1200px;
        align-items: center;
        /*margin: 0;*/
    }
    .q-toolbar {
        a:first-child {
            display: inline-block;
            vertical-align: top;
            line-height: 0;
        }
    }
    /*.q-page-container {*/
    /*    padding-bottom: 0 !important;*/
    /*}*/
    .q-tab__indicator {
        color: #E71821;
        height: 4px;
    }
    .q-tabs__content {
        height: 80px;
    }
    .q-tab {
        outline: none;
        color: #3C3C3C;
        max-width: 100px;
        padding: 0;
    }
    .q-menu {
        left: auto;
        right: 15px;
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
    .phone {
        i {
            display: none;
        }
    }
    .menu-dropdown {
        .q-item {
            min-width: 150px;
        }
    }
    .icon-hide {
        .q-btn__content {
            /*div {*/
            /*    display: none;*/
            /*}*/
            i {
                display: none;
                margin-right: 0;
            }
        }
    }

    //TODO

    @media (max-width: 1023px) {
        .phone {
            font-size: 0;
            i {
                display: block;
            }
        }
        .q-tabs__content {
            /*display: flex;*/
            justify-content: flex-end;
        }
        .toolbar-container {
            div:nth-child(2) {
                order: 3;
            }
        }
        .q-item {
            padding: 8px 10px;
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
        .header-btns {
            .q-btn {
                padding: 4px 8px;
            }
        }
    }
</style>
