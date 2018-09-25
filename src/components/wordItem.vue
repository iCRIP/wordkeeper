<template>
  <div :class="{
    'word': true,
    'word--no-description': !word.description,
    'word--no-example': !word.example,
    }">
    <div class="word_name">
      {{ word.name }}
    </div>
    <div class="word_description">{{ word.description }}</div>
    <div class="word_example">
      <pre class="word_example_value">{{ word.example }} </pre>
    </div>
    <div class="word_actions">
      <div class="word_actions_btn" tabindex="-1">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="word_actions_popup">
        <a @click="editWordHandler" class="word_action">Редактировать</a>
        <a @click="removeWord" class="word_action">Удалить</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      word: {
        type: Object,
        required: true,
      }
    },
    methods: {
      removeWord() {
        this.$store.dispatch('removeWord', this.word);
      },
      editWordHandler() {
        this.$store.commit('editWordAction', this.word);
      }
    }
  }
</script>

<style scoped lang="scss">
$color: #ccc;
  .word {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid $color;
    padding: 15px 30px 15px 0px;
    display: flex;
    position: relative;
    &:first-child {
      border-top: 1px solid $color;
    }
    &_action {
      display: block;
      
      cursor: default;
      padding: 5px 10px;
      &:hover {
        background: $color;
      }
      &s {
        position: absolute;
        right: 0;
        top: 20px;
        &_popup {
          position: absolute;
          right: 30px;
          top: 0;
          border-radius: 3px;
          border: 1px solid $color;
          background-color: #fff;
          padding: 5px 0;
          opacity: 0;
          pointer-events: none;
          transition: .4s;
          z-index: -1;
        }
        &_btn {
          width: 30px;
          height: 30px;
          text-align: center;
          span {
            display: block;
            margin: 4px auto;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: $color;
            transition: background-color .4s;
            &+span {
              margin-top: 4px;
            }
          }
          
        }
        &:hover {
          .word_actions_btn {
            span {
              background: #1c1c1c;
            }
          }
          .word_actions_popup {
            opacity: 1;
            pointer-events: all;
            z-index: 2;
          }
        }
      }
    }
    &_name, &_description, &_example {
      flex: 1
    }
    &_name, &_description {
      padding: 10px 10px;
    }
    &_example {
      &_value {
        background-color: #eee;
        margin: 0;
        padding: 10px 10px;
        border-radius: 5px;
      }
    }
  }
</style>