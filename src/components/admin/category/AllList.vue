<template>
    <q-list bordered class="rounded-borders bg-white">
        <template v-for="category in categories">
            <q-item :key="category.id">
                <q-item-section side>
                    <q-avatar square>
                        <img :src="category.thumbnail" :alt="category.name">
                    </q-avatar>
                </q-item-section>
                <q-item-section>
                    <template v-if="category.parent === null">
                        <q-list-label caption class="text-grey-8">Родительская категория</q-list-label>
                    </template>
                    <template v-else>
                        <q-list-label caption class="text-grey-8">Подкатегория {{ category.parent.name }}</q-list-label>
                    </template>
                    <q-list-label class="text-h6">{{ category.name }}</q-list-label>
                    <q-list-label caption class="text-grey">Ссылка: {{ category.slug }}</q-list-label>
                </q-item-section>
                <q-item-section side>
                    <q-btn-group outline rounded>
                        <q-btn size="sm" :to="`/admin/categories/edit/${category.id}`" outline color="primary" round icon="edit"/>
                        <q-btn size="sm" @click="confirmDelete(category)" outline color="negative" round icon="delete"/>
                    </q-btn-group>
                </q-item-section>
            </q-item>
            <q-separator/>
        </template>
    </q-list>
</template>

<script>
export default {
  name: 'AllList',
  props: {
    categories: Object
  }
}
</script>

<style scoped>

</style>
