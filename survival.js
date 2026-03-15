function updateSurvival(){

const total=Object.keys(animals).length;

let dead=0;

Object.keys(animals).forEach(id=>{

if(CONFIG.RED_IDS.includes(parseInt(id)))
dead++;

});

const active=total-dead;

const survival=((active/total)*100).toFixed(1);

document.getElementById("survivalPanel").innerHTML=`
<b>Survival Statistics</b><br>
Released: ${total}<br>
Active: ${active}<br>
Dead: ${dead}<br>
Survival: ${survival}%
`;

}