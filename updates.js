function openUpdates(){

document.getElementById("updatesPanel").classList.add("open");

loadUpdates();

}

function closeUpdates(){

document.getElementById("updatesPanel").classList.remove("open");

}

function loadUpdates(){

Papa.parse(CONFIG.UPDATES_CSV_URL,{
download:true,
header:true,
complete:(res)=>{

let html="";

res.data.reverse().forEach(r=>{

html+=`
<p>
<b>${r.Date}</b><br>
${r.Update}
</p>
`;

});

document.getElementById("updatesContent").innerHTML=html;

}
});

}