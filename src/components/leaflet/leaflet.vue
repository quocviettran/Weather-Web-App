<template>
    <div>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
            integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
            crossorigin=""/> 
        <div>
            <h1> THIS IS TEST </h1>
        </div>  
        <div id="mapid">

        </div>

    </div>
</template>
 <!-- Make sure you put this AFTER Leaflet's CSS -->

<script>
    import leaflet from 'leaflet';

    export default {
        name: "leaf",
        props: {
            lat: Number,
            long: Number
        },
        mounted(){
            this.initMap();
               
        },
        methods: {
            initMap() {
                console.log(this.lat);
                console.log(this.long);
                
                
                //Instansiate a map
                const mymap = leaflet.map('mapid').setView([this.lat, this.long],4);
                
                //Instansiate a marker, and setting the start coordinate at Noroff
                var marker = leaflet.marker([this.lat, this.long]).addTo(mymap);
                marker.bindPopup('Noroff AS').openPopup();

                //Marker on the clicked coordinate
                //TODO
                mymap.on('click',function(e){
                    console.log(e.latlng);
                    //TODO: ASK TEAM 
                    //leaflet.marker(e.latlng).addTo(mymap);
                })

                
                this.tileLayer = leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox.streets',
                    accessToken: 'pk.eyJ1Ijoid29raW5nIiwiYSI6ImNqdHByejVjcjA3Nm80ZHIwZTgydDA0aWYifQ.A7Nu-j7baTtMJnjPzrTlNA'
                }).addTo(mymap);
                
                console.log(marker);
                
                
            }, //End of initMap
            

        }
    };
</script>

<style>
    #mapid {
        height: 500px;
        width: 50%;
        margin-left: 25%;
    }
    .center{
        display:center;
    }
</style>


