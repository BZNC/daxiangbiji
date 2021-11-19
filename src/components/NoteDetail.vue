<template>
  <div>
    <!--{{router.params.noteId}}-->
    {{ $route.params.noteId }}
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      msg: "笔记详情页",
    };
  },
};
</script>

<style scoped>
div {
  color: red;
}
</style>