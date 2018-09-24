<template>
  <div id="app" v-cloak>
    <div class="container" v-if="user && userLoaded === true">
      <button class="btn"
        @click="signOut">
        log out
      </button>
      <search-bar @searchSubmit="showAddWordModal = true"></search-bar>
      <word-list :loaded="isWordsLoaded" :words="words" ></word-list>
    </div>
    <div class="container" v-if="user === null && userLoaded === false">
      <sign-in @signIn="signIn"></sign-in>
    </div>
    <base-modal 
      @closeModal="showAddWordModal = false"
      v-if="showAddWordModal">
      <add-word @addWord="addWord">
      </add-word>
    </base-modal>
  </div>
</template>

<script>
import { db } from '@/main';
import { auth } from '@/main';
import { provider } from '@/main';

import SearchBar from '@/components/searchBar';
import WordList from '@/components/wordList';
import SignIn from '@/components/signIn';

import AddWord from '@/components/addWord';

export default {
  name: 'app',
  data() {
    return {
      searchWord: String,
      words: Array,
      isWordsLoaded: false,
      user: null,
      userLoaded: true,
      showAddWordModal: false,
    }
  },
  computed: {
  },
  methods: {
    updateWords() {
      const id = this.user.uid;
      this.isWordsLoaded = false;
      return new Promise ((resolve) => {
        db.ref('users/' + id + '/words').once('value')
        .then((data) => {
          console.log(data.val());
          this.words = Object.values(data.val());
          this.isWordsLoaded = true;
          resolve(data.val());
        })
      })
    },
    addWord(word) {
      const wordData = Object.assign({}, word);
      const id = this.user.uid
      const wordsRef = db.ref('users/' + id + '/words');
      wordsRef.push(wordData).then(resp => {
        this.updateWords()
      });
      // eslint-disable-next-line
      console.log(wordData)
    },
    signIn() {
      auth.signInWithPopup(provider)
    },
    signOut() {
      this.user = null;
      this.userLoaded = false;
      auth.signOut();
    }
  },
  components: {
    SearchBar,
    WordList,
    SignIn,
    AddWord,
  },
  created() {
    auth.onAuthStateChanged( user => {
      if (user) {
        this.user = user;
        this.userLoaded = true;
        this.updateWords();
        return user;
      } else {
        this.userLoaded = false;
        return null;
      }
    });
  },
  mounted() {
    // this.updateWords();
  }
}
</script>

<style lang="scss">
  [v-cloak] .v-cloak--hidden{
    display: none;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    color: #1c1c1c;
    font-size: 16px;
    overflow-x: hidden;
  }
  * {
    box-sizing: border-box;
  }
  .container {
    width: 700px;
    margin: 0 auto;
    max-width: 100%;
  }
</style>
