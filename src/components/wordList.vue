<template>
  <div class="word-list">
    <div class="word-list_message" v-if="!words.length && loaded">
      Ваш словарь пуст
    </div>
    <div class="word-list_message" v-if="!loaded">
      Загрузка
    </div>
    <word-item
      v-if="words.length"
      v-for="(word, uid) in words"
      :word="word"
      :key="uid"
      ></word-item>
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
      words: {
        type: Array,
      }
    },
    components: {
      WordItem
    },
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