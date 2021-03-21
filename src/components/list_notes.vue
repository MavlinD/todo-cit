<template lang='pug'>
  .list-notes
    confirm-dialogue(ref="confirmDialogue")
    h3.my-3 Все заметки
    .row.justify-content-center
      router-link(:to="{name:'create'}").btn.btn-primary.my-2 Создать
    .notes-item(v-for="(note, key) in notes" :key='key').row.justify-content-center.align-content-center.mt-3
      router-link(:to="{name: 'update', params:{id:key}}").outline-crimson.px-4.py-2
        span.mr-3 {{key}}
        span {{title(note)}}
      button(@click='_delete(key)').btn.btn-outline-info
        i.icon-trash-empty

</template>

<script>

  import ConfirmDialogue from 'components/confirm_dialogue'
  export default {

    name: 'ListNotes',
    components: { ConfirmDialogue },
    title: 'Все заметки',
    methods: {
      title(note) {
        return note.title?.slice(0, 20)
      },
      async _delete(id) {
        const ok = await this.$refs.confirmDialogue.show()
        if (ok) this.delete_note(id)
      },

    },
  }
</script>

<style lang='scss'>

  .notes-item {
    a {
      width: 270px;
    }
    margin: 0 auto;
  }

</style>
