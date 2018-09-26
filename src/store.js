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
    isWordEdit: false,
    editingWord: {}
  },
  getters: {
    searchWords: (state) => (word) => {
      const lowerCase = word.toLowerCase();
      const worded = state.words.filter(item => {
        if (item.name.match(lowerCase)) {
          return item;
        }
      });
      return worded;
    },
    getWord: (state) => (word) => {
      const existWord = state.words.find(item => {
        return item.name === word.toLowerCase();
      });
      return existWord;
    }
  },
  mutations: {
    setWords(state, data) {
      Vue.set(state, 'words', data);
      Vue.set(state, 'isWordsLoaded', true);
    },
    setUser(state, data) {
      Vue.set(state, 'user', data);
      Vue.set(state, 'userLoaded', true);
    },
    editWordAction( state, word ) {
      Vue.set(state, 'editingWord', word);
      Vue.set(state, 'isWordEdit', true);
    },
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
            id: key,
            ...data.val()[key]
          })
        }
        wordArray.reverse();
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
    addWord({ state, dispatch }, word) {
      const wordData = Object.assign({}, word);
      const id = state.user.uid;
      const wordsRef = db.ref('users/' + id + '/words');

      wordsRef.push(wordData).then(() => {
        dispatch('updateWords')
      });
    },
    removeWord({ state, dispatch }, word) {
      const id = state.user.uid;
      const wordId = word.id;
      const wordsRef = db.ref('users/' + id + '/words/' + wordId);
      wordsRef.remove().then(() => {
        dispatch('updateWords')
      });
    },
    
    editWord({ state, dispatch }, word) {
      const id = state.user.uid;
      const wordId = word.id;
      const wordsRef = db.ref('users/' + id + '/words/' + wordId);
      wordsRef.set({
        description: word.description,
        name: word.name,
        example: word.example,
      }).then(() => {
        dispatch('updateWords');
      });
    },
  }
})
