<template>
  <div
    @dragstart.self="onDrag">
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    transferData: {
      type: Object
    }
  },
  methods: {
    onDrag (e) {

    }
  }
}
</script>

<style scoped>

</style>
