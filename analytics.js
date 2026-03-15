function haversine(lat1,lon1,lat2,lon2){

const R=6371000;

const dLat=(lat2-lat1)*Math.PI/180;
const dLon=(lon2-lon1)*Math.PI/180;

const a=
Math.sin(dLat/2)*Math.sin(dLat/2)+
Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*
Math.sin(dLon/2)*Math.sin(dLon/2);

return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));

}

function updateAnalytics(id){

if(id==="all") return;

const fixes=animals[id];

let total=0;

for(let i=1;i<fixes.length;i++){

const d=haversine(
fixes[i-1].Latitude,
fixes[i-1].Longitude,
fixes[i].Latitude,
fixes[i].Longitude
);

total+=d;

}

document.getElementById("analyticsPanel").innerHTML=`
<b>Movement Analytics</b><br>
Total Movement: ${Math.round(total)} m
`;

}