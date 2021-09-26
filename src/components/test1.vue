<template>
  <div id="login">
      <h1>{{msg1}}</h1>
  </div>
</template>

<script>
export default {
    name:'login',
    data() {
        return {
            msg:'this is a login page'
        }
    }
}
</script>

<style scoped>
h1 {
    color: red;
}
</style>