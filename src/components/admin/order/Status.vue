<template>
    <q-badge
        :color="statusColor"
        :text-color="statusTextColor"
    >
        {{ status.key }}
    </q-badge>
</template>

<script>
export default {
  name: 'OrderStatus',
  props: {
    status: Object
  },
  computed: {
    statusTextColor () {
      let color = 'white'
      return color
    },
    statusColor () {
      let color = null
      if (this.status.value === 1) {
        color = 'primary'
      } else if (this.status.value === 2) {
        color = 'positive'
      } else if (this.status.value === 3) {
        color = 'orange'
      } else if (this.status.value === 4 || this.status.value === 5) {
        color = 'grey'
      } else if (this.status.value === 6) {
        color = 'negative'
      }
      return color
    }
  }
}
</script>

<style scoped>

</style>
