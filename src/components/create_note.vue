<template lang='pug'>
  .create-note.row.justify-content-center
    h3.my-3.col-12 Создать заметку
    .create-note__body.outline-crimson.col-md-6
      router-link(:to="{name:'notes'}").btn.btn-primary Домой
      note-form(v-on='form_listeners' action='create')
</template>

<script>

  import NoteForm from 'src/components/note_form'

  export default {
    components: { NoteForm },
    title: 'Создать',
    name: 'Create',
  }
</script>

<style lang='scss'>
  .create-note {
    form {
      display: grid;

      .btn {
        place-self: center;
      }
    }
  }

  .create-note__body {
    display: grid;
    place-items: start center;
  }
</style>
