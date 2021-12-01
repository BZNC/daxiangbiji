<template>
  <div>
    <h1>noteBookId:{{$route.query.notebookId}}</h1>
    <h1>noteId :{{ $route.query.noteId }}</h1>
    <!--   -->
  </div>
</template>

<script>
export default {
  name: "NoteDetail",
  data() {
    return {
      msg: "笔记详情页"
    };
  }
};
</script>

<style scoped>
div {
  color: red;
}
</style>