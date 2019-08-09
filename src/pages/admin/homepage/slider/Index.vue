<template>
    <div class="row q-col-gutter-lg">
        <div class="col-lg-6">
            <h1 class="text-h6">Слайдер на главной странице</h1>
            <q-carousel
                animated
                v-model="slide"
                :autoplay="false"
                arrows
                infinite
                height="325px"
                class="slider"
            >
                <q-carousel-slide v-for="(item, index) in slider" :key="item.id" class="slider-item" :name="index" :img-src="item.media_image">
                    <q-btn-group unelevated class="actions-group">
                        <q-badge color="grey">{{ slide + 1 }} / {{ slider.length }}</q-badge>
                        <q-btn :to="`/admin/homepage/slider/edit/${item.id}`" replace color="primary" size="sm" icon="edit"/>
                        <q-btn @click="confirmDelete(item)" replace color="negative" size="sm" icon="delete"/>
                    </q-btn-group>
                    <q-btn class="slider-btn" type="a" :href="item.link" replace color="primary" size="18px" :label="item.link_label"/>
                    <div class="text-h4 text-black" style="position:absolute; top: 18px; left: 18px; color: #fff;">{{item.title}}</div>
                </q-carousel-slide>
            </q-carousel>
        </div>
        <q-dialog v-model="confirm" persistent>
            <q-card>
                <q-card-section class="row items-center">
                    <template v-if="slideItem">
                        <span>Удалить слайд?</span>
                    </template>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Отмена" color="primary" v-close-popup />
                    <q-btn flat label="Удалить" @click="deleteAttribute" color="negative" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <div class="col-lg-6">
            <router-view/>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'HomeSliderIndex',
  data () {
    return {
      slide: 1,
      slideItem: {},
      confirm: false
    }
  },
  computed: {
    ...mapGetters({
      slider: 'homeslides/list',
    })
  },
  methods: {
    ...mapActions({
      sliderIndex: 'homeslides/index',
      slideDestroy: 'homeslides/destroy'
    }),
    confirmDelete (slide) {
      this.slideItem = slide
      this.confirm = true
    },
    deleteAttribute () {
      this.slideDestroy(this.slideItem.id)
    }
  },
  created () {
    this.sliderIndex()
  }
}
</script>

<style lang="scss" scoped>
    .slider {
        border-radius: 4px;
        .slider-item {
            position: relative;
            .slider-btn {
                position: absolute;
                bottom: 16px;
                right: 16px;
            }
            .actions-group {
                z-index: 20;
                position: absolute;
                top: 16px;
                right: 16px;
            }
        }
    }
</style>
