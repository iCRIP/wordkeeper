<template>
  <form class="form" @submit.prevent="editWordSubmit">
    <div class="input" :class="{'input--error': isWordExist}">
      <label 
        class="input_label"
        for="wordName">
        Слово
      </label>
      <input id="wordName"
        autofocus="true"
        required="true"
        class="input_value"
        v-model="editWord.name"
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
        v-model="editWord.description"
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
        v-model="editWord.example"
        type="text"></textarea>
    </div>
    <div class="form_message"
      v-show="isWordExist">
      Это слово существует
    </div>
    <div class="form_footer">
      <button :disabled="isWordExist" class="btn" type="submit">Добавить</button>
    </div>
  </form>
</template>

<script>

  export default {
    props: ['word'],
    data() {
      return {
        editWord: Object.assign({}, this.word),
      }
    },
    computed: {
      
      oldWord() {
        return Object.assign({}, this.word);
      },
      isWordExist() {
        const foundWord = this.$store.getters.getWord(this.editWord.name);

        if ( foundWord && foundWord.name !== this.oldWord.name) {
          return true;
        }
        return false;
      }
    },
    methods: {
      editWordSubmit() {
        if ( !this.isWordExist ) {
          this.editWord.name = this.editWord.name.toLowerCase();
          this.$store.dispatch('editWord', this.editWord)
          .then(() => {
            this.$store.state.isWordEdit = false;
            this.$emit('wordEdited', this.editWord);
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

</style>