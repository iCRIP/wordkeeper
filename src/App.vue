<template>
  <div id="app" class="app" v-cloak>
    <div class="container"
      v-if="$store.state.user &&
        $store.state.userLoaded === true">
      <header class="app_header">
        <button class="btn"
          @click="signOut">
          log out
        </button>
      </header>
      <search-bar
        v-model="searchWord"
        @searchSubmit="showAddWordModal = true">
      </search-bar>
      <word-list
        :loaded="$store.state.isWordsLoaded"
        :words="words" ></word-list>
    </div>
    <div class="container"
      v-if="$store.state.user === null &&
        $store.state.userLoaded === false">
      <sign-in @signIn="signIn"></sign-in>
    </div>
    <base-modal
      @closeModal="showAddWordModal = false"
      v-if="showAddWordModal">
      <add-word :wordName="searchWord"
        @wordAdded="wordAdded">
      </add-word>
    </base-modal>
    <!-- <base-modal
      @closeModal="showAddWordModal = false"
      v-if="showAddWordModal">
      <add-word>
      </add-word>
    </base-modal> -->
  </div>
</template>

<script>
import { auth } from '@/main';
import { provider } from '@/main';

import SearchBar from '@/components/searchBar';
import WordList from '@/components/wordList';
import SignIn from '@/components/signIn';

import AddWord from '@/components/addWord';

export default {
  name: 'app',
  data() {
    auth.onAuthStateChanged( user => {
      if (user) {
        this.$store.dispatch('signInStore', user)
      } else {
        this.$store.dispatch('signOutStore');
      }
    });
    return {
      searchWordStatic: '',
      showAddWordModal: false,
    }
  },
  computed: {
    searchWord: {
      get() {
        return this.searchWordStatic;
      },
      set(value) {
        this.searchWordStatic = value;
      }
    },
    words() {
      return this.$store.getters.searchWords(this.searchWord);
    }
  },
  methods: {
    wordAdded() {
      this.showAddWordModal = false;
    },
    signIn() {
      auth.signInWithPopup(provider)
    },
    signOut() {
      this.$store.dispatch('signOutStore')
    }
  },
  components: {
    SearchBar,
    WordList,
    SignIn,
    AddWord,
  },
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
  .app {
    &_header {
      text-align: right;
      margin: 10px 0;
    }
  }
</style>
