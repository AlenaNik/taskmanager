<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <input type="text"
             :value="task.name"
             class="p-2 mr-2 flex-grow text-xl font-bold w-full"
             @change="updateTaskProperty($event, 'name')"
             @keyup.enter="closeAfterUpdate"
      >
        <textarea
          class="w-full relative bg-transparent px-2 border mt-2 h-64 border-none leading-normal"
          :value="task.description"
          @change="updateTaskProperty($event, 'description')"
          @keyup.enter="closeAfterUpdate"
        ></textarea>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['id'],
  computed: {
    ...mapGetters(['getTask']),
    task () {
      return this.getTask(this.id)
    }
  },
  methods: {
    updateTaskProperty (e, key) {
      this.$store.commit('UPDATE_TASK', {
        task: this.task,
        key,
        value: e.target.value
      })
    },
    closeAfterUpdate() {
      this.$router.push({ name: 'board' })
    }
  }
}
</script>

<style>
.task-view {
  @apply relative flex flex-row bg-white pin mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>
