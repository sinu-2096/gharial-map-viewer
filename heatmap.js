function generateHeatmap(){

const points=[];

telemetryData.forEach(r=>{

const lat=parseFloat(r.Latitude);
const lon=parseFloat(r.Longitude);

if(!lat||!lon) return;

points.push([lat,lon,1]);

});

L.heatLayer(points,{
radius:25
}).addTo(map);

}