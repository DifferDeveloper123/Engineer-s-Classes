function out(){
var dbbRef = firebase.database().ref("VIP");
document.getElementById("loader").style.display = "block";
    document.getElementById("wl").style.display = "block";
dbbRef.child("" + window.localStorage.getItem("subhject")+"").remove().then(()=>{
    window.localStorage.clear();
    window.open("/", "_self");
});
}

window.onload = ()=>{
    if(window.localStorage.getItem('rep') == "Tr"){
    document.getElementById("usnam").textContent = window.localStorage.getItem("usnam");
    document.getElementById("num").textContent = window.localStorage.getItem("number");
    document.getElementById("subs").textContent = window.localStorage.getItem("subject");
    
    document.getElementById("loader").style.display = "none";
        document.getElementById("wl").style.display = "none";
        document.body.style.overflow = 'auto';
    }else{
        window.open("/", "_self");
    }
}

function log(){
    document.getElementById("conta").classList.remove("hide");
    document.getElementById("ol").classList.remove("invi");
}

function gol(){
    document.getElementById("conta").classList.add("hide");
    document.getElementById("ol").classList.add("invi");
}