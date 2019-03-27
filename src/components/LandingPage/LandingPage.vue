<template>
  <div class="hello middle">
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
    <Forecast
      :localizedName="localizedName"
      :temperatureNow="temperatureNow"
      :temperatureArray="temperatureArray"
    />
    <leaflet
      class="center"
      v-bind:towns="{
      name: localizedName,
      lat: latitude,
      lng: longtitude
      }"
    />
  </div>
</template>

<script>
import Forecast from "@/components/Forecast/Forecast.vue";
import Leaflet from "@/components/leaflet/leaflet.vue";
import axios from "axios";

export default {
  name: "LandingPage",
  components: {
    Forecast,
    Leaflet
  },
  data() {
    return {
      name: "forecast",
      APIKEY: "NUymEiY6InvgzytEW6ZRQMi6XQglI91P",
      temperatureArray: "",
      temperatureNow: "",
      locationSearch: "",
      userInput: "",
      key: 254946,
      localizedName: "Oslo",
      latitude: 59.91,
      longtitude: 10.75
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
          const forecast = response.data.DailyForecasts;
          const result = forecast.map(forecast => {
            if (forecast.Day.Icon.toString.length === 2) {
              forecast.Day.Icon =
                "https://developer.accuweather.com/sites/default/files/" +
                forecast.Day.Icon +
                "-s.png";
            } else {
              forecast.Day.Icon =
                "https://developer.accuweather.com/sites/default/files/0" +
                forecast.Day.Icon +
                "-s.png";
            }
            return {
              date: forecast.Date,
              averageTemperature:
                (forecast.Temperature.Maximum.Value +
                  forecast.Temperature.Minimum.Value) /
                2,
              iconDay: forecast.Day.Icon
            };
          });
          this.temperatureArray = result;
          console.log(this.temperatureArray);
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
          this.temperatureNow = {
            temperature: response.data[0].Temperature.Value,
            icon: ""
          };
          if (response.data[0].WeatherIcon.toString().length === 2) {
            this.temperatureNow.icon =
              "https://developer.accuweather.com/sites/default/files/" +
              response.data[0].WeatherIcon +
              "-s.png";
          } else {
            this.temperatureNow.icon =
              "https://developer.accuweather.com/sites/default/files/0" +
              response.data[0].WeatherIcon +
              "-s.png";
          }
        });
    },
    searchLocation() {
      console.log("hei");
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
