<template>
  <div id="app">
    <div class="container" v-if="user">
      <search-bar></search-bar>
      <!-- <word-list :loaded="isWordsLoaded" :words="words" ></word-list> -->
    </div>
    <div class="container" v-if="user === null">
      <sign-in @signIn="signIn"></sign-in>
    </div>
  </div>
</template>

<script>
import { db } from '@/main';
import { auth } from '@/main';
import { provider } from '@/main';
import SearchBar from '@/components/searchBar';
import WordList from '@/components/wordList';
import SignIn from '@/components/signIn';

export default {
  name: 'app',
  data() {
    return {
      searchWord: '',
      words: [],
      isWordsLoaded: false,
      user: null,
    }
  },
  computed: {
  },
  methods: {
    updateWords() {
      this.isWordsLoaded = false;
      return new Promise ((resolve, reject) => {
        db.ref('users').once('value')
        .then((data) => {
          this.words = data.val();
          this.isWordsLoaded = true;
          resolve(data.val());
        })
      })
    },
    signIn() {
      auth.signInWithPopup(provider)
      .then(result => {
        // console.log(result);
      })
      .catch(error => {
        // console.log(error);
      })
    }
  },
  components: {
    SearchBar,
    WordList,
    SignIn
  },
  created() {
    this.user = auth.onAuthStateChanged( user => user );
  },
  mounted() {
   
  }
}
</script>

<style lang="scss">
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
