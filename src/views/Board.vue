<template>
  <div class="board">
      <div class="flex flex-row items-start">
        <div class="column" v-for="(col, $columnIndex) in board.columns"
             :key="$columnIndex"
             draggable
             @dragstart.self="pickUpColumn($event, $columnIndex)"
             @drop="moveTaskOrColumn($event, col.tasks, $columnIndex)"
             @dragover.prevent
             @dragenter.prevent
        >
          <div class="flex items-center mb-2 font-bold">
            {{ col.name }}
          </div>
          <div class="list-reset"
               v-for="(task, $taskIndex) in col.tasks"
               :key="$taskIndex"
               draggable
               @dragenter.prevent
               @dragove.prevent
               @dragstart="pickUpTask($event, $taskIndex, $columnIndex)"
               @drop.stop="moveTaskOrColumn($event, col.tasks, $columnIndex, $taskIndex)"
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
          <input type="text"
                 class="block p-2 w-full bg-transparent"
                 placeholder="+ add new task"
                 @keyup.enter="createTask($event, col.tasks)"
          />
        </div>
        <input type="text"
               class="block p-2 w-full bg-transparent"
               placeholder="+ add new column"
               @keyup.enter="createColumn($event)"
        />
      </div>
      <transition name="fade">
          <div class="task-bg"
               v-if="isModalOpen"
               @click.self="close"

          >
            <router-view></router-view>
          </div>
      </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['board']),
    isModalOpen () {
      // name that comes from router.js in a "task" router
      return this.$route.name === 'task'
    }
  },
  methods: {
    goToTask (task) {
      // eslint-disable-next-line standard/object-curly-even-spacing
      this.$router.push({ name: 'task', params: { id: task.id }})
    },
    close () {
      this.$router.push({ name: 'board' })
    },
    createTask (e, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: e.target.value
      })
      e.target.value = ''
    },
    createColumn (e) {
      this.$store.commit('CREATE_COLUMN', {
        name: e.target.value
      })
    },
    pickUpColumn (e, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'column')
    },
    moveTaskOrColumn (e, toTasks, toColumnIndex, toTaskIndex) {
      const type = e.dataTransfer.getData('type')
      console.log(toTaskIndex)
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
    pickUpTask (e, taskIndex, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('task-index', taskIndex)
      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'task')
      //@dragstart="pickUpTask($event, $taskIndex, $columnIndex)"
    }
  }
 }
</script>

<style lang="css">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}

.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}

.board {
  @apply p-4 bg-white h-full overflow-auto;
}

.task-bg {
  @apply pin absolute;
  background: rgba(0,0,0,0.5);
}
</style>
