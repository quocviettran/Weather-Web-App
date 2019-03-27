import Vue from "vue";
import Router from "vue-router";
import LandingPage from "@/components/LandingPage/LandingPage.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "LandingPage",
      component: LandingPage
    }
  ]
});
