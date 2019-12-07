import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // task: {},
    answers: [],
    questions: []
  },
  mutations: {
    // setTask(state, payload) {
    //   state.task = payload;
    // },
    setQuestion(state, payload) {
      state.questions = payload;
    },
    submitAnswer(state, payload) {
      state.answers = payload;
    },
  },
})
