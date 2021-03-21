<template lang='pug'>
  .container(id="app")
    .row
      h5.col-12 тестовое задание для: &nbsp;
        strong ЦИТ
      router-view.col-md.outline-blue
</template>

<script>

  import ListNotes from 'src/components/list_notes'
  export default {
    name: 'App',
    components: { ListNotes },
  }
</script>
