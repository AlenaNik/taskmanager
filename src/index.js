import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board'
import { saveStatePlugin } from './utils'

Vue.use(Vuex)

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export const store = new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  mutations: {}
})
