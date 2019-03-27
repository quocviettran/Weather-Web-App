<template>
  <div class="hello">
    <Forecast/>
  </div>
</template>

<script>
import Forecast from "@/components/Forecast/Forecast.vue";
export default {
  name: "LandingPage",
  components: {
    Forecast
  },
  props: {
    msg: String
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
