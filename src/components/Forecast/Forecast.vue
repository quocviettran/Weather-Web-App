
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
/*
<v-layout>
                  <v-flex xs12 sm6 offset-sm3>
                    <v-card>
                      <v-card-title primary-title>
                        <div>Kvittering av:</div>
                      </v-card-title>
                      <h1> Oslo </h1>
                      <h3>Todays forecast</h3>
                      <div>Current Temperature {{current}}</div>------------------------------------------------
                      <v-card-actions></v-card-actions>
                      <div>Minimum Temperature</div>
                      <div>{{temperatureArray[0].minTemperature}}</div>
                      <div>Maximum Temperature</div>
                      <div>{{temperatureArray[0].maxTemperature}}</div>------------------------------------------------
                      <h4>Forecast for the next 4 days</h4>
                      <div
                        v-for="(temperatureArray, index) of temperatureArray.slice(1)"
                        :key="index"
                      >
                        <div>Minimum Temperature</div>
                        <div>{{temperatureArray.minTemperature}}</div>
                        <div>Maximum Temperature</div>
                        <div>{{temperatureArray.maxTemperature}}</div>-----------------------------------------------
                      </div>
                    </v-card>
                  </v-flex>
                </v-layout>

*/
export default {
  props: ["localizedName", "temperatureNow", "temperatureArray"]
};
</script>