<template>
  <transition name="modal">
    <div class="modal_wrap">
      <div class="modal_overlay"
        @click.prevent="$emit('closeModal')">
      </div>
      <div class="modal">
        <div class="modal_close"
          @click="$emit('closeModal')">
        </div>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'BaseModal'
  }
</script>

<style lang="scss">
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-height: 100px;
    min-width: 100%;
    max-height: 100%;
    max-width: 100%;
    overflow: auto;
    background: #fff;
    box-shadow: 0 0 20px -2px #000;
    border-radius: 3px;
    padding: 30px 0px 25px;
    z-index: 11;
    &_wrap {
      transition: .4s;
    }
    &_overlay {
      z-index: 10;
      background-color: #fff;
      opacity: .8;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
    }
    &_close {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 30px;
      height: 30px;
      background-color: #ccc;
      border-radius: 50%;
      z-index: 12;
      text-align: center;
      line-height: 30px;
      &:before {
        content: '+';
        display: block;
        color: #fff;
        transform: rotate(45deg);
        font-size: 32px;
      }
    }
  }
  // transition
  .modal-enter {
    opacity: 0;
  }
  .modal-leave-active {
    opacity: 0;
  }
  @media (min-width: 768px) {
    .modal {
      padding: 40px 15px 25px;
      min-width: 250px;
    }
  }
</style>