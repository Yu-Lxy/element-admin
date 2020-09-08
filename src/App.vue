<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState([
      'user',
      'permission'
    ]),
  },
}
</script>

<style>
</style>
