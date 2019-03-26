<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <LandingPage msg="Welcome to Your Vue.js App"/>
    <leaflet class="center" v-bind:lat = 59.75 :long = 10.75 />
  </div>
</template>

<script>
/* import Components here */
// @ is an alias to /src
import LandingPage from "@/components/LandingPage/LandingPage.vue";
import leaflet from "@/components/leaflet/leaflet.vue";


export default {
  name: "home",
  /*Add components*/
  components: {
    LandingPage,
    leaflet
    
  }
};
</script>
<style>
  .center{
    align-items: center;
  }
</style>

