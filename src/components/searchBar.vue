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
      <button class="search_button" tabindex="-1"
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
      margin: 40px auto 20px;
      position: relative;
      &:focus-within {
        .search_input {
          box-shadow: 0 0 10px -1px #000;
          outline: none;
        }
        .search_label {
          opacity: 0;
        }
      }
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
      border-radius: 50px;
      transition: .4s;
      &:focus, &:hover {
        outline: none;
        box-shadow: 0 0 15px -1px #000;
      }
      &:before, &:after {
        content: '';
        position: absolute;
        display: block;
      }
      &:before {
        width: 4px;
        height: 27px;
        background: #ccc;
        top: 10px;
        left: 21px;
      }
      &:after {
        background-color: #ccc;
        height: 4px;
        width: 28px;
        top: 22px;
        left: 9px;
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