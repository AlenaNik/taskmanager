<template>
  <div class="bg-indigo-900 h-full p-4 bg-white">
      <div class="flex flex-row items-start">
        <ColumnComponent
          v-for="(col, $columnIndex) in board.columns"
          :key="$columnIndex"
          :col="col"
          :columnIndex="$columnIndex"
        />
        <input type="text"
               v-model="colName"
               class="font-bold p-2 mr-2 flex-grow"
               placeholder="+ add new column"
               @keyup.enter="createColumn"
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
import ColumnComponent from '../components/ColumnComponent'

export default {
  components: {
    ColumnComponent
  },
  data () {
    return {
      colName: ''
    }
  },
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
    },
    createColumn () {
      this.$store.commit('CREATE_COLUMN', {
        // from local state
        name: this.colName
      })
      this.colName = ''
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
  @apply flex items-center justify-between flex-wrap shadow mb-2 py-2 px-2 rounded bg-indigo-lightest text-indigo-darkest no-underline;
}
.task-bg {
  @apply pin absolute;
  background: rgba(0,0,0,0.5);
}
</style>
