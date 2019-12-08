import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    answers: [],
    data: {},
    selectedAnswer: [],
    submitDialogModel: false,
    submitted: false,
  },
  mutations: {
    setData(state, payload) {
      state.data = payload;
    },
    setPreview(state, payload) {
      state.data.preview = payload;
    },
    selAnswer(state, payload) {
      state.answers[payload.questionId] = payload;
      // 답변 정렬
      state.answers.sort((a, b) => {
        return a.questionId < b.questionId ? -1 : a.questionId > b.questionId ? 1: 0;
      });
    },
    setSelectedAnswer(state, payload) {
      state.selectedAnswer = payload;
    },
    changeSelectedAnswer(state, payload) {
      state.selectedAnswer[payload.index] = payload.content;
    },
    setSubmitDialogModel(state, payload) {
      state.submitDialogModel = payload;
    },
    submitAnswer(state, payload) {
      state.submitted = payload;
    }
  },
})
