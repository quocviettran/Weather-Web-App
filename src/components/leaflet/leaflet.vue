<template>
    <div>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
            integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
            crossorigin=""/>   
        
        <div class="center" id="mapid">
            <h1> Hva skjer brur </h1>
                
        </div>   

    </div>
</template>
 <!-- Make sure you put this AFTER Leaflet's CSS -->

<script>
    import leaflet from 'leaflet';

    export default {
        name: "Map",
        mounted(){
            this.initMap();
            
        },
        methods: {
            
            initMap() {
                var mymap = leaflet.map('mapid').setView([51.505, -0.09], 13);
                this.tileLayer = leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox.streets',
                    accessToken: 'pk.eyJ1Ijoid29raW5nIiwiYSI6ImNqdHByejVjcjA3Nm80ZHIwZTgydDA0aWYifQ.A7Nu-j7baTtMJnjPzrTlNA'
                }).addTo(mymap);
            }

        }
    };
</script>

<style scoped>
    #mapid {
        height: 500px;
        width: 500px;
    }
</style>


