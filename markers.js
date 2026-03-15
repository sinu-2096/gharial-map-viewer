function createMarker(record){

const lat=parseFloat(record["Latitude"]);
const lon=parseFloat(record["Longitude"]);

const id=record["Animal ID"];

const marker=L.circleMarker([lat,lon],{
radius:7,
color:"#007bff",
fillOpacity:0.8
});

marker.bindPopup(
"<b>ID:</b> "+id+
"<br><b>Place:</b> "+record["Place"]+
"<br><b>Activity:</b> "+record["Activity"]
);

marker.addTo(markersLayer);

oms.addMarker(marker);

}
