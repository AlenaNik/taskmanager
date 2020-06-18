<template>
  <div class="board">
      <div class="column"
           :key="columnIndex"
           draggable
           @dragstart.self="pickUpColumn($event, columnIndex)"
           @drop="moveTaskOrColumn($event, col.tasks, columnIndex)"
           @dragover.prevent
           @dragenter.prevent
      >
        <div class="flex items-center mb-2 font-bold">
          {{ '📌 ' + col.name }}
        </div>
        <TaskComponent
          v-for="(task, $taskIndex) in col.tasks"
          :col="col"
          :key="$taskIndex"
          :task="task"
          :taskIndex="$taskIndex"
          :columnIndex="columnIndex"
          @on-delete="deleteTask(col.tasks, task.id)"
        />
        <input type="text"
               class="font-bold block p-2 w-full bg-transparent"
               placeholder=" 📝 add new task"
               @keyup.enter="createTask($event, col.tasks)"
        />
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TaskComponent from './TaskComponent'
export default {
  components: {
    TaskComponent
  },
  props: {
    col: {
      type: Object,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState(['board'])
  },
  methods: {
    moveTaskOrColumn (e, toTasks, toColumnIndex, toTaskIndex) {
      const type = e.dataTransfer.getData('type')
      if (type === 'task') {
        this.moveTask(e, toTasks, toTaskIndex !== undefined ? toTaskIndex : toTasks.length)
      } else {
        this.moveColumn(e, toColumnIndex)
      }
    },
    moveTask (e, toTasks, toTaskIndex) {
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')
      const fromTasks = this.board.columns[fromColumnIndex].tasks
      const fromTaskIndex = e.dataTransfer.getData('from-task-index')
      this.$store.commit('MOVE_TASK', {
        fromTasks,
        fromTaskIndex,
        toTasks,
        toTaskIndex
      })
    },
    moveColumn (e, toColumnIndex) {
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')
      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex
      })
    },
    pickUpColumn (e, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'column')
    },
    createTask (e, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: e.target.value
      })
      e.target.value = ''
      tasks.forEach(function (task) {
        if (task.name === 'start by adding new task') {
          tasks.splice(task, 1)
        }
      })
    },
    deleteTask (tasks, id) {
      this.$store.commit('DELETE_TASK', {
        tasks, id
      })
    }
  }
}
</script>

<style>
  .column {
    @apply bg-indigo-lighter p-2 mr-4 text-left shadow rounded;
    min-width: 350px;
    cursor: move; /* fallback if grab cursor is unsupported */
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
  }
</style>
