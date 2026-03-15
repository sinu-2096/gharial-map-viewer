function openUpdates(){

const panel=document.getElementById("updatesPanel");

panel.classList.toggle("open");

if(panel.classList.contains("open")){
loadUpdates();
}

}

function loadUpdates(){

Papa.parse(CONFIG.UPDATES_URL,{
download:true,
header:true,
complete:function(res){

const container=document.getElementById("updatesContent");

container.innerHTML="";

res.data.reverse().forEach(r=>{

const div=document.createElement("div");

div.className="update-item";

div.innerHTML="<b>"+r["Date"]+"</b><br>"+r["Update"];

container.appendChild(div);

});

}
});

}
