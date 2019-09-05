<template>
    <q-layout view="hHh lpR fff">
        <q-header class="bg-white row no-wrap justify-center">
            <div class="container row q-col-gutter-x-lg header">
                <q-toolbar class="col-md-2 col-sm-4 col-xs-12 justify-sm-start justify-xs-center mobile-toolbar-height-fix">
                    <router-link to="/" class="logo-link"><img src="/statics/images/logo.svg" alt=""></router-link>
                </q-toolbar>
                <q-toolbar class="col-md-10 col-sm-8 col-xs-12 justify-md-between justify-sm-end mobile-toolbar-height-fix">
                    <div class="col-md-8 col-xl-8 sm-hide xs-hide">
                        <!-- todo не всегда появляются стрелки, посмотреть, в чем дело -->
                        <q-tabs
                                inline-label
                                v-model="tab"
                                narrow-indicator
                                align="justify"
                                class="bg-white full-width tab-links"
                        >
                            <q-route-tab :name="category.slug" v-for="category in categories" :key="category.id" :to="{ name: 'catalog', params: { parent: category.slug } }" :label="category.name"/>
                            <!-- todo сделать модалку на весь экран с брендами. загрузку брендов подсмотреть на главной -->
                            <brands></brands>
<!--                            <q-tab name="brands" label="Бренды" @click="scrollToElement()"/>-->
                            <q-route-tab :to="{ name: 'catalog', query: { sale: true } }" name="sales" label="Скидки" />
                            <q-route-tab to="/contacts" name="contacts" label="Контакты" />
                        </q-tabs>
                    </div>
                    <div class="col-xs-12 col-sm-auto col-lg-4 col-md-4 col-xl-4 flex justify-md-end justify-xs-between header-btns no-wrap">
                        <q-btn router="tel:+79964539303" flat style="color: #3C3C3C" icon="phone" label="+7 (996) 453-93-03" class="icon-hide"/>
                        <!-- todo поиск по сайту: модалка с выбором – сайт/каталог -->
                        <q-btn router="/" flat style="color: #3C3C3C" icon="search" label="" />
                        <app-cart/>
                        <q-btn-dropdown v-if="$q.screen.lt.md" auto-close stretch flat icon="menu">
                            <q-list separator link class="menu-dropdown" style="color: #3C3C3C; text-decoration: none">
                                <q-item v-for="category in categories" :key="category.id"
                                        :to="{ name: 'catalog', params: { parent: category.slug } }"
                                        :label="category.name"
                                >
                                    <q-item-section>{{ category.slug }}</q-item-section>
                                </q-item>
                                <q-item  :to="{ name: 'catalog', query: { sale: true } }">
                                    <q-item-section>Скидки</q-item-section>
                                </q-item>
                                <q-item to="/contacts">
                                    <q-item-section>Контакты</q-item-section>
                                </q-item>
                            </q-list>
                        </q-btn-dropdown>
                    </div>
                </q-toolbar>
            </div>
        </q-header>

        <router-view />

        <app-footer/>

    </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { scroll } from 'quasar'
import AppFooter from '../components/front/app/Footer'
import AppCart from '../components/front/app/Cart'
import Brands from '../components/front/app/Brands'
const { getScrollTarget, setScrollPosition } = scroll

export default {
  name: 'App',
  data () {
    return {
      tab: null,
    }
  },
  components: {
    AppFooter,
    AppCart,
    Brands
  },
  computed: {
    ...mapGetters({
      shippings: 'shippings/list',
      categories: 'categories/list'
    })
  },
  methods: {
    ...mapActions({
      categoriesIndex: 'categories/index'
    })
  },
  created () {
    this.categoriesIndex({ return: 'parents' })
  }
}
</script>

<style lang="scss">
    *{
        font-family: 'Roboto', sans-serif;
    }
    /*.q-menu {*/
    /*    margin: 0 auto;*/
    /*    width: 100%;*/
    /*    max-width: 1170px;*/
    /*    left: 0 !important;*/
    /*    right: 0;*/
    /*    border-radius: 2px;*/
    /*}*/
    .brands {
        box-shadow: 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12);
        max-width: 1170px !important;
        width: 100%;
        a {
            text-decoration: none;
            color: #3C3C3C;
            font-size: 16px;
            font-weight: 400;
            &:hover {
                text-decoration: underline;
            }
        }
    }
    .container {
        width: 100%;
        max-width: 1200px;
    }
    .q-header {
        color: #3C3C3C;
    }
    .q-tab__indicator {
        color: #E71821;
        height: 4px;
    }
    .q-tab {
        outline: none;
        color: #3C3C3C;
        padding-top: 0;
        padding-bottom: 0;
        min-height: 80px;
    }
    .tab-links {
        .q-tab__label {
            font-weight: 400;
        }
        button {
          font-weight: 400;
          color: #3C3C3C;
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
    .header-btns .q-btn-dropdown__arrow {
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
        .container {
            color: #3C3C3C;
        }
        .title {
            font-weight: 400;
        }
        a {
            text-decoration: none;
            color: #3C3C3C;
            font-size: 16px;
            font-weight: 300;
            &:hover {
                text-decoration: underline;
            }
        }
    }
    .slider {
        .q-btn {
            z-index: 99;
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
            left: 15px;
            right: 15px;
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
