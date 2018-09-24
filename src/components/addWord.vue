<template>
  <form class="form" @submit.prevent="$emit('addWord', word)">
    <div class="input">
      <label 
        class="input_label"
        for="wordName">
        Слово
      </label>
      <input id="wordName"
        required="true"
        class="input_value"
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
    <div class="form_footer">
      <button class="btn" type="submit">Добавить</button>
    </div>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        word: {
          name: '',
          description: '',
          example: '',
        }
      }
    }
  }
</script>

<style>
  .form {
    
  }
</style>