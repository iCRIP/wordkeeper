<template>
  <div class="sign-in">
    <button class="sign-in_btn" 
      autofocus
      @click="$emit('signIn')">
      Войти с помощью Google
    </button>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped lang="scss">
  .sign-in {
    width: 300px;
    margin: 100px auto;
    &_btn {
      width: 100%;
      border-radius: 100px;
      font-size: 16px;
      text-align: center;
      border: none;
      background-color: #ccc;
      color: #111;
      padding: 10px 20px;
      &:focus {
        outline: none;
        box-shadow: 0 0 10px -2px #000;
      }
    }
  }
</style>