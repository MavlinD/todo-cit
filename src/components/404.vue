<template lang='pug'>
  .outline-blue
    p Страница не существует
    router-link(:to="{name:'notes'}").btn.btn-primary Домой

</template>

<script>
  export default {
    name: 'Page404',
  }
</script>
