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
        @input="searchHandler"
        @searchSubmit="showAddWordModal = true">
      </search-bar>
      <word-list
        :search="searchWordStatic"
        :loaded="$store.state.isWordsLoaded"
        :words="$store.state.words" ></word-list>
    </div>
    <div class="container"
      v-if="$store.state.user === null &&
        $store.state.userLoaded === false">
      <sign-in @signIn="signIn"></sign-in>
    </div>
    <base-modal
      @closeModal="showAddWordModal = false"
      v-if="showAddWordModal">
      <add-word :wordName="searchWordStatic"
        @wordAdded="wordAdded">
      </add-word>
    </base-modal>
    <base-modal
      @closeModal="$store.state.isWordEdit = false"
      v-if="$store.state.isWordEdit">
      <edit-word :word="$store.state.editingWord">
      </edit-word>
    </base-modal>
    <pre>
      {{ showEditWord }}
    </pre>
  </div>
</template>

<script>
import { auth } from '@/main';
import { provider } from '@/main';

import SearchBar from '@/components/searchBar';
import WordList from '@/components/wordList';
import SignIn from '@/components/signIn';

import AddWord from '@/components/addWord';
import EditWord from '@/components/editWord';

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
    showEditWord () {
      return this.$store.isWordEdit;
    },
  },
  methods: {
    searchHandler(val) {
      this.searchWordStatic = val;
      this.$store.commit('searchWord', val)
      this.$store.dispatch('updateWords')
    },
    wordAdded() {
      const searchInput = document.getElementById('search');
      
      searchInput.value = '';
      searchInput.focus();
      this.searchWordStatic = '';
      this.showAddWordModal = false;
    },
    signIn() {
      auth.signInWithRedirect(provider)
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
    EditWord,
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
    padding: 0 10px;
    max-width: 100%;
  }
  .app {
    &_header {
      text-align: right;
      margin: 10px 0;
    }
  }
</style>
