<template>
  <div id="nav">
    <router-link to="/">Home</router-link>|
    <router-link to="/about">About</router-link>
    <v-layout row wrap>
      <v-flex v-for="(bar, i) in bars" :key="i" xs12 sm12 md6 class="my-3">
        <v-card color="grey lighten-4" flat height="200px">
          <v-toolbar :color="bar.class" :dark="bar.dark">
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-toolbar-title>Title</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>search</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>favorite</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: "NavigationBar",

  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
