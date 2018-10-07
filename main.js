var mymap = L.map('mapid').setView([52.119998657638156, 19.248046875], 7);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibHV2aXNvbmlhc3R5IiwiYSI6ImNqbXluanBwbDE1MGQza3F2NmE5NWxwZDUifQ.3rE4mu9fRFKvUst4yh1TyA'
}).addTo(mymap);
var popup = L.popup();
var markerId = 1;


function addMarker(geo,name){
    var marker = L.marker(geo,{draggable:'true'});
    marker.name = name; marker.id = markerId; markerId++;
    if(marker.name === "") marker.name = "Unknown name";
    
    $("tbody").append("<tr id="+marker.id+"><th scope='row'>"+marker.id+"</th><td>"+marker.name+"</td><td>"+geo.lat+"</td><td>"+geo.lng+"</td></tr>");
    
    marker.on("dragend", function (e) {
         $("#"+marker.id).html("<th scope='row'>"+marker.id+"</th><td>"+marker.name+"</td><td>"+marker._latlng.lat+"</td><td>"+marker._latlng.lng+"</td>");
    });

    marker.on('click', function () {
        popup.setLatLng(marker._latlng)
        .setContent("<div id='popUpMsg'>Marker name: "+marker.name+"<p>Latitude: "+marker._latlng.lat+"</p><p>Longitude: "+marker._latlng.lng+"</p></div>")
        .openOn(mymap);
    });

    marker.addTo(mymap);
}

function onMapClick(e) {
    popup.setLatLng(e.latlng)
        .setContent("<div id='popUpMsg'>Do you want to add pin at this place?<span id='markerName'>Marker name: (optionally)<input class='form-control'type'text' id='setName'/></span><button type='button' class='btn btn-primary' id='yesBtn'>Yes</button> <button type='button' class='btn btn-primary' id='noBtn'>No</button></div>")
        .openOn(mymap);

    $("#yesBtn").on("click", function() {
        mymap.closePopup();
        addMarker(e.latlng,$("#setName").val());
    });
    $("#noBtn").on("click",function(){
        mymap.closePopup();
    });
}

mymap.on("click", onMapClick);