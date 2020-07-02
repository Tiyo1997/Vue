<template>
  <div id="app"  class="container" v-cloak>
    <!-- <Shop /> -->
    <Tab />
  </div>
</template>

<script>
// import Shop from './components/Shop'
import Tab from './components/Tab'

export default {
  name: 'App',
  components: {
    // Shop,
    Tab
  }
}
</script>

<style>
  [v-cloak]{
    display: none;
  }
</style>
