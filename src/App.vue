<template>
  <div id="app">
    <vue-custom-scrollbar class="scroll-area"  :settings="settings" @ps-scroll-y="scrollHanle">
      <router-view />
    </vue-custom-scrollbar>
  </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
export default {
  components: {
    vueCustomScrollbar
  },
  data () {
    return {
      settings: {
        maxScrollbarLength: 60
      }
    }
  },
  methods: {
    scrollHanle (evt) {
      console.log(evt)
    }
  }
}
</script>
<style>
@import 'assets/styles/tailwind.postcss';

body, html {
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

a {
  text-decoration: none;
}

.container {
  @apply mx-auto;
}

.scroll-area {
  position: relative;
  width: 100%;
  margin: auto;
  height: 100vh;
}
</style>
