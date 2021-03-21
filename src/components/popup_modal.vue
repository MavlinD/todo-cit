<template>
  <transition name="fade">
      <div class="popup-modal" v-if="isVisible" @keyup.esc="close" @click.self='close' ref='popup' tabindex='0'>
          <div class="window">
              <slot></slot>
          </div>
      </div>
  </transition>
</template>

<script>
  export default {
    name: 'PopupModal',

    data: () => ({
      isVisible: false,
    }),

    methods: {
      async open() {
        this.isVisible = true
        await this.$nextTick()
        this.$refs.popup.focus()
      },

      close() {
        this.isVisible = false
      },
    },
  }
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.popup-modal {
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.5);
}

.window {
  max-width: 480px;
  margin-right: auto;
  margin-left: auto;
  padding: 3rem;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background: #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

</style>
