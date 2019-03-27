<template>
  <div class="hello middle">
    <v-layout align-center justify-center>
      <v-form ref="form">
        <v-layout row wrap>
          <v-text-field
            @keyup.enter="searchLocation()"
            class="centered-input text--darken-3 mt-3"
            label="Location Name"
            placeholder="location"
            v-model="userInput"
          ></v-text-field>
          <v-btn @click="searchLocation()">Search</v-btn>
        </v-layout>
      </v-form>
    </v-layout>
    <Forecast
      :localizedName="localizedName"
      :temperatureNow="temperatureNow"
      :temperatureArray="temperatureArray"
    />
    <leaflet
      ref="leaflet_component"
      :localizedName="localizedName"
      :latitude="latitude"
      :longitude="longitude"
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
      APIKEY: "bU3YrXCADsTUOyElNTta8c9BPd7IvZmJ",
      temperatureArray: "",
      temperatureNow: null,
      locationSearch: "",
      userInput: "",
      key: 254946,
      localizedName: "Oslo",
      latitude: 59.91,
      longitude: 10.75
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
          this.temperatureArray = forecast.map(forecast => {
            //Pre fix icon 
            if (forecast.Day.Icon >= 10) {
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
            //Pre fix date format
            var date = new Date(forecast.Date);
            forecast.Date = date.getDate() + "/" + (date.getMonth()+1); 
            return {
              date: forecast.Date,
              maxTemperature: forecast.Temperature.Maximum.Value,
              iconDay: forecast.Day.Icon
            };
          });
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
          //Run an update to leaflet component
          this.$refs.leaflet_component.initMap();
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
            this.longitude = this.locationSearch.data[0].GeoPosition.Longitude;
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
