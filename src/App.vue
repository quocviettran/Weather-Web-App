<template>
  <div id="app">
    
    <v-card color="grey lighten-4" flat height="100%" tile>
      <v-toolbar dense>
        <v-toolbar-side-icon></v-toolbar-side-icon>

        <v-toolbar-title>Weather Noroff</v-toolbar-title>
            <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/forecast">Forecast</router-link>
    </div>

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

