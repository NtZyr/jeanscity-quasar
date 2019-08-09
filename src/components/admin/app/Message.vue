<template>
    <transition name="fade" mode="out-in">
        <q-banner
                v-if="message.text"
                inline-actions
                :class="'text-white ' + ((message.status === 200 || message.status === 201) ? 'bg-positive' : 'bg-negative' )"
        >
            {{ message.text }}
        </q-banner>
    </transition>
</template>

<script>
export default {
  name: 'AppMessage',
  props: {
    message: Object
  }
}
</script>

<style scoped>

</style>
