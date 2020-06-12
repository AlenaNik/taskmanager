import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board'

Vue.use(Vuex)

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export const store = new Vuex.Store({
  state: {
    board
  },
  mutations: {}
})
