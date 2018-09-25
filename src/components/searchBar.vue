<template>
  <div class="search">
    <form
      class="search_form"
      @submit.prevent="$emit('searchSubmit')">
      <input id="search"
        autofocus
        placeholder="Слово"
        v-on:input="$emit('input', $event.target.value)"
        type="text"
        class="search_input" />
      <label
        for="search"
        class="search_label">
        Слово
      </label>
      <button class="search_button"
        type="submit"></button>
    </form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
  }
</script>

<style scoped lang="scss">
  .search {
    &_form {
      width: 500px;
      max-width: 100%;
      margin: 40px auto;
      position: relative;
    }
    &_input {
      width: 100%;
      border-radius: 100px;
      border: 1px solid #ccc;
      height: 46px;
      font-size: 18px;
      line-height: 2;
      padding: 4px 20px;
      transition: .4s;
      
      &:focus {
        box-shadow: 0 0 10px -1px #000;
        outline: none;
        & +.search_label {
          opacity: 0;
        }
      }
    }
    &_button {
      position: absolute;
      right: 0;
      top: 0;
      width: 46px;
      height: 46px;
      background-color: transparent;
      border: none;
      &:focus {
        outline: none;
      }
      &:before, &:after {
        content: '';
        position: absolute;
        display: block;
      }
      &:before {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid #ccc;
        top: 11px;
        left: 11px;
      }
      &:after {
        width: 4px;
        border: 1px solid #ccc;
        top: 32px;
        transform: rotate(45deg);
        left: 30px;
      }
    }
    &_label {
      position: absolute;
      left: 0;
      top: 0;
      height: 46px;
      font-size: 18px;
      line-height: 2;
      padding: 4px 20px;
      transition: .4s;
      opacity: 0;
    }
  }
</style>