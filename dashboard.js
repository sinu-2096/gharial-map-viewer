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

document.getElementById("statusText").textContent="Telemetry Loaded";

}
});

}

function processTelemetry(){

animals={};

telemetryData.forEach(r=>{

const id=r["Animal ID"];

const lat=parseFloat(r["Latitude"]);
const lon=parseFloat(r["Longitude"]);

if(!id||lat===0||lon===0||isNaN(lat)||isNaN(lon)) return;

if(!animals[id]) animals[id]=[];

animals[id].push(r);

});

populateDropdown();

}

function renderDashboard(id){

markersLayer.clearLayers();

if(id==="all"){

Object.keys(animals).forEach(a=>{

createMarker(animals[a][0]);

});

}else{

animals[id].forEach(r=>createMarker(r));

}

renderTable(id);

}

function populateDropdown(){

const select=document.getElementById("animalFilter");

Object.keys(animals).forEach(id=>{

const opt=document.createElement("option");

opt.value=id;
opt.textContent=id;

select.appendChild(opt);

});

select.addEventListener("change",e=>{
renderDashboard(e.target.value);
});

}

function renderTable(selected){

const tbody=document.querySelector("#dataTable tbody");

tbody.innerHTML="";

let rows=[];

if(selected==="all"){
rows=telemetryData;
}else{
rows=animals[selected];
}

rows.forEach(r=>{

const signal=r["Signal Strength"]||r["Signal Stength"]||"";

const tr=document.createElement("tr");

tr.innerHTML=`

<td>${r["Animal ID"]}</td>
<td>${r["Timestamp"]}</td>
<td>${r["Place"]}</td>
<td>${r["Activity"]}</td>
<td>${signal}</td>
<td>${r["Latitude"]}</td>
<td>${r["Longitude"]}</td>
<td>${r["Remarks"]}</td>
`;

tbody.appendChild(tr);

});

}

document.addEventListener("DOMContentLoaded",initDashboard);
