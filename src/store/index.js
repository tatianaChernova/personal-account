import { createStore } from 'vuex';

export default createStore({
    state: {
        parentStore: [],
        kidsStore: [],
    },
    mutations: {
        setParent(state, newItems) {
            state.parent = newItems; 
          },
          setKids(state, newItems) {
            state.kids = newItems; 
          },
    },
    actions: {
        updateParent({ commit }, newItems) {
            commit('setParent', newItems); 
          },
          updateKids({ commit }, newItems) {
            commit('setKids', newItems); 
          },
    },
    getters: {
        getParent(state) {
            return state.parent;
          },
          getKids(state) {
            return state.kids; 
          },
    },
});