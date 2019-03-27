
<template>
  <div class="forecast">
    <!--
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-title primary-title>
            <div>Kvittering av:</div>
          </v-card-title>
          <h1>Oslo</h1>
          <h3>Todays forecast</h3>
          <div>Current Temperature {{current}}</div>------------------------------------------------
          <v-card-actions></v-card-actions>
          <div>Minimum Temperature</div>
          <div>{{temperatureArray[0].minTemperature}}</div>
          <div>Maximum Temperature</div>
          <div>{{temperatureArray[0].maxTemperature}}</div>------------------------------------------------
          <h4>Forecast for the next 4 days</h4>
          <div v-for="(temperatureArray, index) of temperatureArray.slice(1)" :key="index">
            <div>Minimum Temperature</div>
            <div>{{temperatureArray.minTemperature}}</div>
            <div>Maximum Temperature</div>
            <div>{{temperatureArray.maxTemperature}}</div>-----------------------------------------------
          </div>
        </v-card>
      </v-flex>
      
    </v-layout>-->
    <v-expansion-panel>
      <v-expansion-panel-content>
        <template v-slot:header>
          <div>Weather</div>
        </template>
        <v-card>
          <v-expansion-panel v-model="panel" expand>
            <v-expansion-panel-content v-for="(item,i) in 5" :key="i">
              <template v-slot:header>
                <div>Today</div>
              </template>
              <v-card>
                <v-card-text>Lorem ipsum dolor sit amet, consec'tetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "forecast",
  data() {
    return {
      APIKEY: "De4gSQukjG9OkTDNmm2kFMq8725A5yo2",
      forecast: null,
      temperatureArray: null,
      todayArray: null,
      current: "",
      oslo: 254946
    };
  },
  created() {
    //this.fetchData();
    //this.fetchCurrent();
  },
  methods: {
    fetchData() {
      axios
        .get(
          "http://dataservice.accuweather.com/forecasts/v1/daily/5day/" +
            this.oslo +
            ".json?apikey=" +
            this.APIKEY +
            "&metric=true"
        )
        .then(response => {
          this.forecast = response.data.DailyForecasts;
          const result = this.forecast.map(forecast => {
            return {
              date: forecast.Date,
              maxTemperature: forecast.Temperature.Maximum.Value,
              minTemperature: forecast.Temperature.Minimum.Value,
              iconNight: forecast.Day.IconPhrase,
              iconDay: forecast.Night.IconPhrase
            };
          });
          this.temperatureArray = result;
        });
    },
    fetchCurrent() {
      axios
        .get(
          "http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/" +
            this.oslo +
            ".json?apikey=" +
            this.APIKEY +
            "&metric=true&details=true"
        )
        .then(response => {
          this.current = response.data[0].Temperature.Value;
        });
    }
  }
};
</script>

<style>
.forecast {
  display: flex;
  flex-flow: row wrap;
  text-align: center;
}
</style>