<template>
  <div class="forecast">
    <ul>
        {{forecast.data.list}}
    </ul>
  </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name:"forecast",
        data() {
            return {
                forecast: null,
                APIKEY: 'b0e69868ecc23a85343afa989e34cb84'
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData () {
            axios
                .get('http://api.openweathermap.org/data/2.5/forecast?q=London,uk&units=metric&mode=json&APPID=' + this.APIKEY)
                .then(response => (this.forecast = response))
            }
        }
    }
</script>