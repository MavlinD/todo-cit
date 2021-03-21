<template lang="pug">
  .outline-crimson.update-note.row.justify-content-center
    h3.my-3.col-12 Обновить заметку \#{{id}}
    .update-note__body.outline-crimson.col-md-6
      router-link(:to="{name:'notes'}").btn.btn-primary Домой
      note-form(v-on='form_listeners' :textarea='textarea' action='update' :id='id').outline-crimson
</template>

<script>
  import NoteForm from 'src/components/note_form'
  export default {
    name: 'UpdateNote',
    components: { NoteForm },
    props: ['id'],
    computed: {
      textarea() {
        return this.notes?.[this.id]?.title
      }
    },
    mounted() {
      document.title = `Заметка: ${this.id}`
      if (!this.notes[this.id]) {
        this.$router.push('404')
      }
    }
  }
</script>

<style lang='scss'>
  .update-note {
    form {
      display: grid;

      .btn {
        place-self: center;
      }
    }
  }

  .update-note__body {
    display: grid;
    place-items: start center;
  }
</style>
