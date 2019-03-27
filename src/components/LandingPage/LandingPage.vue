<template>
  <div class="hello middle">
    <h1>{{ msg }}</h1>

    <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>
  <div class="hello">
    <v-layout align-center justify-center>
      <v-form ref="form">
        <v-layout row wrap>
          <v-text-field
            class="centered-input text--darken-3 mt-3"
            label="Location Name"
            placeholder="location"
            v-model="userInput"
          ></v-text-field>
          <v-btn @click="searchLocation">Search</v-btn>
        </v-layout>
      </v-form>
    </v-layout>
    <Forecast/>
  </div>
</template>

<script>

import Forecast from "@/components/Forecast/Forecast.vue";
import axios from "axios";

export default {
  name: "LandingPage",
  components: {
    Forecast
  },
  data() {
    return {
      name: "forecast",
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
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.middle {
  display: center;
}
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
</script>
