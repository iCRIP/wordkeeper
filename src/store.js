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
    editingWord: {},
    pageCount: 2,
    wordsOnPage: 6,
    searchword: ''
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
      return db.ref('users/' + state.user.uid + '/words')
        .orderByChild('name')
        .equalTo(word.toLowerCase())
        .once('value')
        .then((snapshot) => {
          return Promise.resolve(snapshot.val())
        })
        
      // const existWord = state.words.find(item => {
      //   return item.name === word.toLowerCase();
      // });
      // return existWord;
    }
  },
  mutations: {
    searchWord(state, val) {
      Vue.set(state, 'searchword', val)
    },
    setWords(state, data) {
      Vue.set(state, 'words', data);
      Vue.set(state, 'isWordsLoaded', true);
    },
    addWords(state, data) {
      state.words.push(...data);
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
    transformWords({ commit }, snapshotData) {
      const wordArray = [];
      for (var key in snapshotData) {
        wordArray.push({
          id: key,
          ...snapshotData[key]
        })
      }
      wordArray.reverse();
      return wordArray;
    },
    getWord({ state }, word) {
      const id = state.user.uid;
      db.ref('users/' + id + '/words')
      .orderByChild('name')
      .equalTo(word)
      .once('value')
      .then((snapshot) => {
        return snapshot.val();
      })
    },
    updateWords({ dispatch, commit, state }) {
      const id = state.user.uid;
      state.isWordsLoaded = false;
      db.ref('users/' + id + '/words')
        .orderByChild('name')
        .startAt(state.searchword)
        .endAt(state.searchword+'\uf8ff')
        .limitToFirst(state.wordsOnPage * state.pageCount)
        .on('value', (snapshot) => {
          const data = snapshot.val();
          dispatch('transformWords', data).then(res => {
            commit('setWords', res);
          });
      })
    },
    loadMoreWords({ dispatch, state }) {
      const limit = state.wordsOnPage * state.pageCount;
      if(state.words.length >= limit) {
        state.pageCount++;
        dispatch('updateWords');
      }
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
    addWord({ state }, word) {
      const wordData = Object.assign({}, word);
      const id = state.user.uid;
      const wordsRef = db.ref('users/' + id + '/words');

      wordsRef.push(wordData);
    },
    removeWord({ state }, word) {
      const id = state.user.uid;
      const wordId = word.id;
      const wordsRef = db.ref('users/' + id + '/words/' + wordId);
      wordsRef.remove()
    },
    editWord({ state }, word) {
      const id = state.user.uid;
      const wordId = word.id;
      const wordsRef = db.ref('users/' + id + '/words/' + wordId);
      wordsRef.set({
        description: word.description,
        name: word.name,
        example: word.example,
      })
    },
  }
})
