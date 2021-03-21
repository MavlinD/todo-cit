<template lang='pug'>
  popup-modal(ref="popup")
      h5 {{ title }}
      p {{ message }}
      .btns
          button.w-25.btn.btn-outline-info(@click="_cancel" ref='ok_btn') {{ cancelButton }}
          button.w-25.btn.btn-outline-info(@click="_confirm" @keyup.esc='_cancel' tabindex="0") {{ okButton }}
</template>

<script>
  import PopupModal from './popup_modal'

  export default {
    name: 'ConfirmDialogue',

    components: { PopupModal },

    data: () => ({
      // Parameters that change depending on the type of dialogue
      title: 'Последнее предупреждение;)',
      message: 'Уверены?', // Main text content
      okButton: 'да', // Text for confirm button; leave it empty because we don't know what we're using it for
      cancelButton: 'нет', // text for cancel button

      // Private variables
      resolvePromise: undefined,
      rejectPromise: undefined,
    }),

    methods: {
      async show(opts = {}) {
        this.title = opts.title ?? this.title
        this.message = opts.message ?? this.message
        this.okButton = opts.okButton ?? this.okButton
        if (opts.cancelButton) {
          this.cancelButton = opts.cancelButton
        }
        this.$refs.popup.open()
        await this.$nextTick()
        this.$refs.ok_btn.focus()
        return new Promise((resolve, reject) => {
          this.resolvePromise = resolve
          this.rejectPromise = reject
        })
      },

      _confirm() {
        this.$refs.popup.close()
        this.resolvePromise(true)
      },

      _cancel() {
        this.$refs.popup.close()
        this.resolvePromise(false)
      },
    },
  }
</script>

<style scoped>
.btns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

</style>
