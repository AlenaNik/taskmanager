<template>
  <div class="list-reset"
       draggable
       @dragenter.prevent
       @dragove.prevent
       @dragstart="pickUpTask($event, taskIndex, columnIndex)"
       @drop.stop="moveTaskOrColumn($event, col.tasks, columnIndex, taskIndex)"
  >
    <router-link v-if="task.id" :to="{ name: 'task', params: { id: task.id } }">
      <div class="task"
      >
        <span class="w-full flex-no-shrink font-bold no-underline"> {{ task.name }}</span>
        <p
          v-if="task.description"
          class="w-full flex-no-shrink mt-1 text-sm"
        >
          {{ task.description }}
        </p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    },
    col: {
      type: Object,
      required: true
    }
  },
  methods: {
    pickUpTask (e, taskIndex, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.setData('task-index', taskIndex)
      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'task')
      // @dragstart="pickUpTask($event, $taskIndex, $columnIndex)"
    },
    moveTaskOrColumn (e, toTasks, toColumnIndex, toTaskIndex) {
      const type = e.dataTransfer.getData('type')
      console.log(toTaskIndex)
      if (type === 'task') {
        this.moveTask(e, toTasks, toTaskIndex !== undefined ? toTaskIndex : toTasks.length)
      } else {
        this.moveColumn(e, toColumnIndex)
      }
    }
  }
}
</script>

<style scoped>

</style>
