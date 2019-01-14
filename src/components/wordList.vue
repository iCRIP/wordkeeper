<template>
  <div class="word-list">
    <div class="word-list_message" v-if="!words.length && loaded && !search">
      Ваш словарь пуст.
    </div>
    <div class="word-list_message" v-if="!words.length && loaded && search">
      Слов не найдено.
    </div>
    <div class="word-list_message" v-if="!loaded">
      Загрузка...
    </div>
    <template v-if="words.length">
      <word-item
        v-for="(word, uid) in words"
        :word="word"
        :key="uid"
        ></word-item>
    </template>
  </div>
</template>

<script>
  import WordItem from '@/components/wordItem'

  export default {
    props: {
      loaded: {
        type: Boolean,
        default: false
      },
      search: {
        type: String,
        default: ''
      },
      words: {
        type: Array,
      }
    },
    components: {
      WordItem
    },
    methods: {
      handleScroll: function () {
        function getScrollTop(){
          if(typeof pageYOffset!= 'undefined'){
            //most browsers except IE before #9
            return pageYOffset;
          }
          else{
            const B = document.body; //IE 'quirks'
            let D = document.documentElement; //IE with doctype
            D = (D.clientHeight)? D: B;
            return D.scrollTop;
          }
        }
        const bodyHeight = document.body.clientHeight;
        const windowHeight = window.innerHeight;
        if ((bodyHeight - getScrollTop()) - windowHeight < 0) {
          this.$store.dispatch('loadMoreWords')
        }
      }
    },

    created: function () {
      window.addEventListener('scroll', this.handleScroll);
    },
    
    destroyed: function () {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }
</script>

<style lang="scss">
  .word-list {
    position: relative;
    padding-top: 20px;
    &_message {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      text-align: center;
    }
  }
</style>