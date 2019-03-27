<template>
  <div class="forecast">
    <v-layout align-center justify-center>
      <v-form ref="form">
        <v-flex xs12 sm6 md3>
          <v-text-field
            class="centered-input text--darken-3 mt-3"
            label="Location Name"
            placeholder="location"
            v-model="userInput"
          ></v-text-field>
          <v-btn @click="searchLocation">Search</v-btn>
        </v-flex>
      </v-form>
    </v-layout>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-title primary-title>
            <div>Kvittering av:</div>
          </v-card-title>
          <h1>{{localizedName}}</h1>
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
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "forecast",
  today: {},
  tomorrow: {},
  data() {
    return {
      APIKEY: "De4gSQukjG9OkTDNmm2kFMq8725A5yo2",
      forecast: null,
      temperatureArray: null,
      todayArray: null,
      current: null,
      locationSearch: null,
      userInput: "",
      key: 254946,
      localizedName: "Oslo",
      latitude: "",
      longtitude: ""
    };
  },
  created() {
    this.fetchData();
    this.fetchCurrent();
  },
  methods: {
    fetchData() {
      axios
        .get(
          "http://dataservice.accuweather.com/forecasts/v1/daily/5day/" +
            this.key +
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
            this.key +
            ".json?apikey=" +
            this.APIKEY +
            "&metric=true&details=true"
        )
        .then(response => {
          this.current = response.data[0].Temperature.Value;
        });
    },
    searchLocation() {
      axios
        .get(
          "http://dataservice.accuweather.com/locations/v1/cities/search?" +
            "apikey=" +
            this.APIKEY +
            "&q=" +
            this.userInput
        )
        .then(response => {
          this.locationSearch = response;
          this.key = this.locationSearch.data[0].Key;
          this.localizedName = this.locationSearch.data[0].LocalizedName;
          this.latitude = this.locationSearch.data[0].GeoPosition.Latitude;
          this.longtitude = this.locationSearch.data[0].GeoPosition.Longtitude;
          this.fetchData();
          this.fetchCurrent();
        });
    }
  }
};
</script>