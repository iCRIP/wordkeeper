<template>
  <form class="form" @submit.prevent="editWordSubmit">
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
      v-show="wordExist">
      Это слово существует
    </div>
    <div class="form_footer">
      <button :disabled="wordExist" class="btn" type="submit">Редактировать</button>
    </div>
  </form>
</template>

<script>

  export default {
    props: ['word'],
    
    data() {
      return {
        editWord: Object.assign({}, this.word),
        wordExist: false,
      }
    },

    computed: {
      oldWord() {
        return Object.assign({}, this.word);
      },
    },

    methods: {
      isWordExist(event) {
        this.$store.getters.getWord(event.target.value)
        .then(res => {
          if(res) {
            if(res[this.oldWord.id]) {
              this.wordExist = false;
            } else {
              this.wordExist = true;
            }
          } else {
            this.wordExist = false;
          }
        })
      },

      editWordSubmit() {
        if ( !this.wordExist ) {
          this.editWord.name = this.editWord.name.toLowerCase();
          this.$store.dispatch('editWord', this.editWord)
          .then(() => {
            this.$store.state.isWordEdit = false;
            this.$emit('wordEdited', this.editWord);
          })
        }
      },

    },
    
    mounted() {
      this.$el[0].focus()
    }
  }
</script>

<style lang="scss">

</style>