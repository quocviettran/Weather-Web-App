<template>
  <div id="app">
    <NavigationBar/>
    <router-view/>
  </div>
</template>
<script>
/* import Components here */
// @ is an alias to /src
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";

export default {
  name: "home",
  /*Add components*/
  components: {
    NavigationBar
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

