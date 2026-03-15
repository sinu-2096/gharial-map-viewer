function drawCorridors(){

const segments={};

telemetryData.forEach(r=>{

const lat=r.Latitude;
const lon=r.Longitude;

const key=`${lat.toFixed(3)}_${lon.toFixed(3)}`;

if(!segments[key]) segments[key]=0;

segments[key]++;

});

Object.keys(segments).forEach(k=>{

if(segments[k]<3) return;

const parts=k.split("_");

L.circle(
[parts[0],parts[1]],
{
radius:200,
color:"yellow",
fillOpacity:0.2
}
).addTo(map);

});

}