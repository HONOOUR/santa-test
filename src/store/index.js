import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    task: {},
    answers: [],
    submmitted: false
  },
  mutations: {
    setTask(state, payload) {
      state.task = payload;
    },
    setSubmmitted(state, payload) {
      state.submmitted = payload;
    },
    selAnswer(state, payload) {
      let isDummy = true;
      for(const [index, answer] of state.answers.entries()) {
        if(answer.questionId === payload.questionId) {
          state.answers.splice(index, 1);
          state.answers.push(payload);
          isDummy = false;
          break;
        }
      }
      if(isDummy) {
        state.answers.push(payload);
      }
      state.answers.sort((a, b) => {
        return a.questionId < b.questionId ? -1 : a.questionId > b.questionId ? 1: 0;
      });
    },

  },
})
