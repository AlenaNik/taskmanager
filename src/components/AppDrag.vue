<template>
  <div
    @dragstart.self="onDrag">
    <slot/>
  </div>
</template>

<script>
export default {
  methods: {
    onDrag (e) {

    }
  }
}
</script>

<style scoped>

</style>
