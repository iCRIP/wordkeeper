<template>
  <form class="form" @submit.prevent="addWordSubmit">
    <div class="input" :class="{'input--error': wordExist}">
      <label 
        class="input_label"
        for="wordName">
        Слово
      </label>
      <input id="wordName"
        autofocus="true"
        required="true"
        class="input_value"
        @input="isWordExist"
        v-model="word.name"
        type="text">
    </div>
    <div class="input">
      <label
        class="input_label"
        for="wordName">
        Описание
      </label>
      <textarea id="wordName"
        class="input_value"
        v-model="word.description"
        type="text"></textarea>
    </div>
    <div class="input">
      <label 
        class="input_label"
        for="wordName">
        Пример
      </label>
      <textarea id="wordName"
        class="input_value"
        v-model="word.example"
        type="text"></textarea>
    </div>
    <div class="form_message"
      v-show="wordExist">
      Это слово существует
    </div>
    <div class="form_footer">
      <button :disabled="wordExist" class="btn" type="submit">Добавить</button>
    </div>
  </form>
</template>

<script>

  export default {
    props: ['wordName'],

    data() {
      return {
        word: {
          name: this.wordName,
          description: '',
          example: '',
        },
        wordExist: false,
      }
    },

    methods: {
      isWordExist(event) {
        this.$store.getters.getWord(event.target.value)
        .then(res => {
          if(res) {
            this.wordExist = true;
          } else {
            this.wordExist = false;
          }
        })
      },
      
      addWordSubmit() {
        if ( !this.wordExist ) {
          this.word.name = this.word.name.toLowerCase();
          this.$store.dispatch('addWord', this.word)
          .then(() => {
            this.$emit('wordAdded');
          })
        }
      }
    },

    mounted() {
      this.$el[0].focus()
    }
  }
</script>

<style lang="scss">
  .form {
    margin: 0 auto;
    width: 300px;
    max-width: 100%;
    &_footer {
      margin: 20px 0 0;
      text-align: center;
    }
  }
  .input {
    display: block;
    position: relative;
    padding: 5px 0;
    &_label {
      display: block;
      margin-bottom: 5px;
      font-size: 14px;
    }
    &_value {
      border: 1px solid #ccc;
      border-radius: 3px;
      min-height: 40px;
      font-size: 16px;
      padding: 5px 5px;
      font-family: Arial;
      min-width: 100%;
      max-width: 100%;
      transition: box-shadow .4s;
      &:focus {
        outline: none;
        box-shadow: 0 0 10px -2px #000;
      }
    }
    textarea.input_value {
      height: 80px;
    }
    &--error {
      .input_value {
        border-color: red;
      }
    }
  }
  .btn {
    border: 2px solid #ccc;
    border-radius: 100px;
    background-color: transparent;
    font-size: 16px;
    padding: 10px 25px;
    font-weight: bold;
    color: #1c1c1c;
    transition: box-shadow .4s;
    &:focus {
      outline: none;
      box-shadow: 0 0 20px -2px #000;
    }
  }
</style>