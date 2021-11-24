<template></template>

<script>
import Auth from "@/apis/auth.js";

export default {
  //   created() {
  //     Auth.getInfo().then((res) => {
  //       if (!res.isLogin) {
  //         console.log("1");
  //         this.$router.push({ path: "/login" });
  //       }
  //     });
  //   },
  created() {
    Auth.getInfo().then((res) => {
      if (!res.isLogin) {
        this.$router.push({ path: "/login" });
      }
    });
  },
};
</script>

<style>
</style>