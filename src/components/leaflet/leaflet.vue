<template>
  <div>
    <div id="mapid"/>
    <v-btn @click="changeLocation()"> Go to location </v-btn>
  </div>
</template>
 <!-- Make sure you put this AFTER Leaflet's CSS -->

<script>
import leaflet from "leaflet";

export default {
  name: "leaf",
  props: {
    towns: Object,
    allLocations: Array
  },
  update(){
      this.changeLocation();
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      //Instansiate a map 
      var container = leaflet.DomUtil.get("mapid");
      console.log(container);
      if(container != null){
          container._leaflet_id=null;
      }
       let mymap =  leaflet.map("mapid").setView([this.towns.lat, this.towns.lng], 10)
       console.log(this.towns.lat + ' ' + this.towns.lng);
      //Instansiate a marker, and setting the start coordinate at Noroff
      var marker = leaflet
        .marker([this.towns.lat, this.towns.lng])
        .addTo(mymap);
      marker.bindPopup(this.towns.name).openPopup();

      //Instansiate markers for all preloaded cities
      //TODO Make for each
      /* leaflet.marker([this.towns.lat, this.towns.lng])
                    .addTo(mymap)
                    .bindPopup(this.towns.name + "<br/>" + ' Temperature ' + this.towns.temperature)
                    .openPopup();
                */

      //Marker on the clicked coordinate
      let mark;
      mymap.on("click", function(e) {
        console.log(e.latlng);

        if (mark != null) {
          mark.remove();
        }
        mark = leaflet.marker(e.latlng);
        mark
          .addTo(mymap)
          .bindPopup()
          .openPopup();
      });

      this.tileLayer = leaflet
        .tileLayer(
          "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
          {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox.streets",
            accessToken:
              "pk.eyJ1Ijoid29raW5nIiwiYSI6ImNqdHByejVjcjA3Nm80ZHIwZTgydDA0aWYifQ.A7Nu-j7baTtMJnjPzrTlNA"
          }
        )
        .addTo(mymap); 
    }, //End of initMap

    removeMap(mymap){
        console.log(mymap);
        if(mymap!=null)
            mymap.remove();
    },
    changeLocation() {  
        this.initMap();
    }
  }
};
</script>

<style>
#mapid {
  height: 500px;
  width: 50%;
  margin-top:10px;
  margin-left: 25%;
}
.center {
  display: center;
}
</style>


