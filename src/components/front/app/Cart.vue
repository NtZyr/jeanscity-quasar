<template>
    <q-btn :to="{ name: 'app.cart' }" flat style="color: #3C3C3C" icon="shopping_cart" label="">
        <q-badge color="red" floating>{{ count }}</q-badge>
    </q-btn>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppCart',
  computed: {
    ...mapGetters({
      count: 'cart/count'
    })
  }
}
</script>

<style scoped>

</style>
