<template lang='pug'>
  form.my-3.w-100.notes-form(@submit.prevent)
    confirm-dialogue(ref="confirmDialogue")
    textarea(v-model='newNote' tabindex=1 ref='textarea').form-control
    template(v-if="action==='update'")
      .outline-blue.controls.row.justify-content-center
        button.btn.btn-primary.my-3(@click="$emit('cancel')" tabindex=3 :disabled='$parent.undoLog.size===0') Отменить редактирование
        button.btn.btn-primary.my-3(@click="undo" tabindex=4 :disabled='$parent.undoId<1')
          i.icon-ccw
          span {{$parent.undoId}}
        button.btn.btn-primary.my-3(@click='_delete' tabindex=5)
          i.icon-trash-empty
        button.btn.btn-primary.my-3(@click='redo' tabindex=6 :disabled='$parent.redoId<1')
          i.icon-cw
          span {{$parent.redoId}}
    button.btn.btn-primary.my-3(@click="submit" tabindex=2 :disabled='newNote.trim()===textarea') Сохранить

</template>

<script>

  import ConfirmDialogue from 'components/confirm_dialogue'
  export default {
    name: 'NoteForm',
    components: { ConfirmDialogue },
    props: ['textarea', 'action', 'id'],
    data: function() {
      return {
        newNote: this.textarea ?? 'test',
      }
    },
    async mounted() {
      await this.$nextTick()
      this.$refs.textarea.focus()
    },
    methods: {
      async _delete() {
        const ok = await this.$refs.confirmDialogue.show()
        if (ok) this.$emit('this_delete_note')
      },
      submit() {
        this.$emit(this.action, this.newNote)
      },
      async undo() {
        this.$emit('undo', this.newNote)
        await this.$nextTick()
        this.newNote = JSON.parse(this.$parent.undoLog.get(this.$parent.undoId))?.[this.id]?.title
      },
      async redo() {
        this.$emit('redo', this.newNote)
        await this.$nextTick()
        this.newNote = JSON.parse(this.$parent.redoLog.get(this.$parent.redoId))?.[this.id]?.title
      },
    },
  }
</script>

<style lang='scss'>
  .notes-form {
    .controls {
      gap: 1rem;
    }
  }

</style>
