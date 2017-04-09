/*
Parking Map
Developed by: Yuya Jeremy Ong (yuyajeremyong@gmail.com)
*/

var map;
var geo_loc = false;

// Google Map Handler
function initMap(latitude, longitude) {
    navigator.geolocation.getCurrentPosition(function(position) {
        if (geo_loc) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
        } else {
            var latitude = 38.9283;
            var longitude = -77.1753;
        }

        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: latitude, lng: longitude},
            zoom: 13
        });

        $.ajax({
            url: "http://api.reimaginebanking.com/atms?lat="+latitude+"&lng="+longitude+"&rad=1&key=eb6065587d974500fa01af34b0cce99b"
        }).done(function(data) {
            for (var i=0; i < data['data'].length; i++) {
                var marker = new google.maps.Marker({
                    position: {lat:data['data'][i]['geocode']['lat'], lng:data['data'][i]['geocode']['lng']},
                    map: map
                });
                // console.log(data['data'][i]['name']);
            }
        });

        console.log(position.coords.latitude+' '+position.coords.longitude);
    });
}

$(document).ready(function() {
    $(".dropdown-button").dropdown();
});
