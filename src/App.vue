<template>
  <div id="app">
    <v-card color="grey lighten-4" flat height="100%" tile>
      <v-toolbar dense>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>Weather Noroff</v-toolbar-title>
      </v-toolbar>
      <router-view/>
    </v-card>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

