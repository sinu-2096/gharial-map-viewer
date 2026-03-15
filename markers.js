function createMarker(record){

const lat=parseFloat(record.Latitude);
const lon=parseFloat(record.Longitude);

if(!lat||!lon) return;

const id=record["Animal ID"];

const dead=CONFIG.RED_IDS.includes(parseInt(id));

const color=dead?"red":"blue";

const marker=L.circleMarker([lat,lon],{
radius:8,
color:color,
fillOpacity:0.8
});

marker.bindPopup(`
<b>ID:</b> ${id}<br>
<b>Time:</b> ${record.Timestamp}<br>
<b>Place:</b> ${record.Place}<br>
<b>Activity:</b> ${record.Activity}<br>
<b>Signal:</b> ${record["Signal Strength"]}<br>
<b>Lat:</b> ${lat}<br>
<b>Lon:</b> ${lon}<br>
<b>Remarks:</b> ${record.Remarks}
`);

marker.addTo(markersLayer);

oms.addMarker(marker);

}