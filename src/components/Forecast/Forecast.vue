<template>
  <div class="forecast">
    <ul>{{forecast.data.list}}</ul>
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
      forecast: null,
      APIKEY: "b0e69868ecc23a85343afa989e34cb84"
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get(
          "http://api.openweathermap.org/data/2.5/forecast?q=London,uk&units=metric&mode=json&APPID=" +
            this.APIKEY
        )
        .then(response => {
          this.forecast = response;
          var list = response.data.list;

          var d = new Date(response.data.list[0].dt_txt);
          console.log(d.getHours());
          //list.length
          for (let i = 0; i < 4; i++) {
              console.log(list.[i].dt_txt);

          }
        });
    }
  }
};
</script>