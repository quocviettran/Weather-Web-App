<template>
  <div>
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
      integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
      crossorigin
    >
    <div>
      <h1>THIS IS TEST</h1>
    </div>

    <div id="mapid"/>
    <button @click="changeLocation">New York</button>
  </div>
</template>
 <!-- Make sure you put this AFTER Leaflet's CSS -->

<script>
import leaflet from "leaflet";

export default {
  name: "leaf",
  props: {
    towns: Object
  },
  data() {
    return {
      mymap: null
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      //Instansiate a map
      this.mymap = leaflet
        .map("mapid")
        .setView([this.towns.lat, this.towns.lng], 10);

      //Instansiate a marker, and setting the start coordinate at Noroff
      var marker = leaflet
        .marker([this.towns.lat, this.towns.lng])
        .addTo(this.mymap);
      marker.bindPopup(this.towns.name).openPopup();

      //Instansiate markers for all preloaded cities
      //TODO Make for each
      /* leaflet.marker([this.towns.lat, this.towns.lng])
                    .addTo(mymap)
                    .bindPopup(this.towns.name + "<br/>" + ' Temperature ' + this.towns.temperature)
                    .openPopup();
                */

      //Marker on the clicked coordinate
      //TODOj
      let mark;
      this.mymap.on("click", function(e) {
        console.log(e.latlng);

        //TODO: ASK TEAM
        if (mark != null) {
          mark.remove();
        }
        mark = leaflet.marker(e.latlng);
        mark
          .addTo(this.mymap)
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
        .addTo(this.mymap);
    }, //End of initMap

    changeLocation() {
      this.towns.lat = 40.779;
      this.towns.lng = -73.96;
      this.towns.name = "New York";
      this.mymap.remove();
      this.initMap();
    }
  }
};
</script>

<style>
#mapid {
  height: 500px;
  width: 100%;
}
.center {
  display: center;
}
</style>


