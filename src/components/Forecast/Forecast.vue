<template>
  <div class="forecast">
    <v-expansion-panel v-model="panel" expand>
      <v-expansion-panel-content>
        <template v-slot:header>
          <div>Weather</div>
        </template>
        <v-card>
          <v-card-title>
            <h4>{{ localizedName}}</h4>
          </v-card-title>
          <img :src="temperatureNow.icon">
          <p>{{temperatureNow.temperature}}</p>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>
<script>
export default {
  props: ["localizedName", "temperatureNow", "temperatureArray"]
};
</script>