<template>
  <div class="board">
    {{ board }}
      <div class="flex flex-row items-start">
        <div class="column" v-for="(col, idx) in board.columns" :key="idx">
          <div class="flex items-center mb-2 font-bold">
            {{ col.name }}
          </div>
          <div class="list-reset"   v-for="(task, idx) in col.tasks"
               :key="idx">
            <router-link v-if="task.id" :to="{ name: 'task', params: { id: task.id } }">
              <div class="task"
              >
                <span class="w-full flex-no-shrink font-bold"> {{ task.name }}</span>
                <p
                  v-if="task.description"
                  class="w-full flex-no-shrink mt-1 text-sm">
                  {{ task.description }}
                </p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="task-bg"
            v-if="isModalOpen"
            @click.self="close"
        >
        <router-view></router-view>
      </div>
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
    close () {
      this.$router.push({ name: 'board' })
    }
  }
}
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}

.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}

.board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
}

.task-bg {
  @apply pin absolute;
  background: rgba(0,0,0,0.5);
}
</style>
