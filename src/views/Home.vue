<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <LandingPage msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
/* import Components here */
// @ is an alias to /src
import LandingPage from "@/components/LandingPage/LandingPage.vue";
import Forecast from "@/components/Forecast/Forecast.vue";

export default {
  name: "home",
  /*Add components*/
  components: {
    LandingPage,
    Forecast
  }
};
</script>
