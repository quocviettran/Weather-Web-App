<template>
  <div class="forecast">
      
    <v-layout>
          
    <v-flex xs12 sm6 offset-sm3>
      <v-card>


        <v-card-title primary-title>
          <div>
            
          </div>
        </v-card-title>

        <v-card-actions>

        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
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
                .get('http://api.openweathermap.org/data/2.5/forecast?q=London,uk&units=metric&mode=json&cnt=2APPID=' + this.APIKEY)
                .then(response => (this.forecast = response))
            }
        }
    }
</script>