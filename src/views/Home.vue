<template>
  <div class="home">
    <LandingPage msg="Welcome to Your Vue.js App"/>
    <leaflet
      class="center"
      v-bind:towns="{
      name: 'Trondheim',
      lat: 63.42,
      lng: 10.39,
      temperature: 10}"
    />
  </div>
</template>


<script>
import LandingPage from "@/components/LandingPage/LandingPage.vue";
import leaflet from "@/components/leaflet/leaflet.vue";

export default {
  name: "home",
  /*Add components*/
  data() {
    return {
      lat: 59.93,
      lng: 10.75
    };
  },
  components: {
    LandingPage,
    leaflet
  }
};
</script>
<style>
.center {
  align-items: center;
}
</style>

