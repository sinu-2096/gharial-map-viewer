let map;
let markersLayer;
let oms;

let telemetryData=[];
let animals={};

function initDashboard(){

map=L.map("map").setView(CONFIG.MAP_CENTER,CONFIG.MAP_ZOOM);

L.tileLayer(
"http://mt0.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
).addTo(map);

markersLayer=L.layerGroup().addTo(map);

oms=new OverlappingMarkerSpiderfier(map);

loadTelemetry();

}

function loadTelemetry(){

Papa.parse(CONFIG.CSV_URL,{
download:true,
header:true,
complete:(res)=>{

telemetryData=res.data;

processTelemetry();

renderDashboard("all");

}
});

}

function processTelemetry(){

animals={};

telemetryData.forEach(r=>{

const id=r["Animal ID"];

if(!id) return;

if(!animals[id]) animals[id]=[];

animals[id].push(r);

});

}

function renderDashboard(id){

markersLayer.clearLayers();

if(id==="all"){

Object.keys(animals).forEach(a=>{

const rec=animals[a][0];

createMarker(rec);

});

}else{

drawTrack(id);

}

renderTable(id);

updateAnalytics(id);

updateSurvival();

}

document.addEventListener("DOMContentLoaded",initDashboard);