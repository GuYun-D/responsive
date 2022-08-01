export default {
  namespaced: true,
  state() {
    return {
      historys: []
    }
  },

  mutations: {
    addHistory(state, history) {
      const isFindIndex = state.historys.findIndex(item => item === history)
      if (isFindIndex !== -1) {
        state.historys.splice(isFindIndex, 1)
      }
      state.historys.unshift(history)
    },

    deleteHistory(state, index) {
      state.historys.splice(index, 1)
    },

    deleteAllHistory(state) {
      state.historys = []
    }
  }

}