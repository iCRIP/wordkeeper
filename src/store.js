import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { auth } from '@/main';
import { db } from '@/main';

export default new Vuex.Store({
  state: {
    words: [],
    isWordsLoaded: false,
    user: null,
    userLoaded: true,
  },
  mutations: {
    setWords(state, data) {
      Vue.set(state, 'words', data);
      // state.words = data;
      Vue.set(state, 'isWordsLoaded', true);
      // state.isWordsLoaded = true;
    },
    setUser(state, data) {
      Vue.set(state, 'user', data);
      Vue.set(state, 'userLoaded', true);
    },
    // searchWords(state) {
    //   const worded = state.words.filter(item => {
    //     if (item.name.match(this.searchWord)) {
    //       return item;
    //     }
    //   });
    //   state.words = worded;
    // },
  },
  actions: {
    updateWords({ commit, state }) {
      const id = state.user.uid;
      state.isWordsLoaded = false;
      db.ref('users/' + id + '/words').once('value')
      .then((data) => {
        const wordArray = [];
        for (var key in data.val()) {
          wordArray.push({
            key,
            ...data.val()[key]
          })
        }
        commit('setWords', wordArray);
      })
    },
    signInStore({ commit, dispatch }, user) {
      commit('setUser', user)
      dispatch('updateWords');
    },
    signOutStore({ state }) {
      state.user = null;
      state.userLoaded = false;
      auth.signOut();
    },
    addWord(context, word) {
      const wordData = Object.assign({}, word);
      const id = context.user.uid
      const wordsRef = db.ref('users/' + id + '/words');

      wordsRef.push(wordData).then(() => {
        context.commit('updateWords')
      });
    },
  }
})
