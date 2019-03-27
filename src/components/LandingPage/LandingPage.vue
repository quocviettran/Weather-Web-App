<template>
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
    <Forecast :temperatureNow="temperatureNow" :temperatureArray="temperatureArray"/>
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
      APIKEY: "VGozpacgX8kpPwBfbARKKJFxtANGpuxZ",
      temperatureArray: "",
      temperatureNow: "adasd",
      locationSearch: "",
      userInput: "",
      key: 254946,
      localizedName: "Oslo",
      latitude: "",
      longtitude: ""
    };
  },
  mounted() {
    this.searchLocation();
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
          const forecast = response.data.DailyForecasts;
          const result = forecast.map(forecast => {
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
          this.temperatureNow = response.data[0].Temperature.Value;
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
          if (response.data.length !== 0) {
            this.locationSearch = response;
            this.key = this.locationSearch.data[0].Key;
            this.localizedName = this.locationSearch.data[0].LocalizedName;
            this.latitude = this.locationSearch.data[0].GeoPosition.Latitude;
            this.longtitude = this.locationSearch.data[0].GeoPosition.Longtitude;
            // Fetch with location key
            this.fetchData();
            this.fetchCurrent();
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>