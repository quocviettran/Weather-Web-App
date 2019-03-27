<template>
  <div>
    <div id="mapid"/>
  </div>
</template>
<script>
import leaflet from "leaflet";

export default {
  name: "leaf",
  props: ["localizedName", "latitude", "longitude"],
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      //Instansiate a map
      var container = leaflet.DomUtil.get("mapid");
      if (container != null) {
        container._leaflet_id = null;
      }
      let mymap = leaflet
        .map("mapid")
        .setView([this.latitude, this.longitude], 14);
      //Instansiate a marker, and setting the start coordinate at Noroff
      var marker = leaflet.marker([this.latitude, this.longitude]).addTo(mymap);
      marker.bindPopup(this.localizedName).openPopup();

      //Marker on the clicked coordinate
      let mark;
      mymap.on("click", function(e) {
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

    removeMap(mymap) {
      if (mymap != null) mymap.remove();
    },
    changeLocation() {
      this.initMap();
    }
  }
};
</script>

<style>
#mapid {
  height: 45em;
  width: 70%;
  margin-left: 15%;
  margin-top: 1%;
}
.center {
  display: center;
}
</style>


