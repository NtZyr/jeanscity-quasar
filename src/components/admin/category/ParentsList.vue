<template>
    <q-list bordered class="rounded-borders bg-white">
        <template v-for="category in categories">
            <q-expansion-item :key="category.id">
                <template v-slot:header>
                    <q-item-section v-if="category.thumbnail" side>
                        <q-avatar square>
                            <img :src="category.thumbnail_image" :alt="category.name">
                        </q-avatar>
                    </q-item-section>
                    <q-item-section>
                        <q-list-label caption class="text-grey-8">Родительская категория</q-list-label>
                        <q-list-label class="text-h6">{{ category.name }}</q-list-label>
                        <q-list-label caption class="text-grey">Ссылка: {{ category.slug }}</q-list-label>
                    </q-item-section>
                    <q-item-section side>
                        <q-btn-group outline rounded>
                            <q-btn size="sm" :to="`/admin/categories/edit/${category.slug}`" outline color="primary" round icon="edit"/>
                            <q-btn size="sm" @click="confirmDelete(category)" outline color="negative" round icon="delete"/>
                        </q-btn-group>
                    </q-item-section>
                </template>
                <q-card v-if="category.children.length > 0">
                    <q-card-section>
                        <span>Дочерние категории</span>
                        <q-list>
                            <template v-for="child in category.children">
                                <q-item>

                                </q-item>
                            </template>
                        </q-list>
                    </q-card-section>
                </q-card>
            </q-expansion-item>
            <q-separator/>
        </template>
    </q-list>
</template>

<script>
export default {
  name: 'ParentsList',
  props: {
    categories: Object
  }
}
</script>

<style scoped>

</style>
