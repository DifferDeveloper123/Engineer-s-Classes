// document.getElementById("i").addEventListener("click", ()=>{
//     window.open(`tel:+917417809186`, "_self");
// })

// document.getElementById("ii").addEventListener("click", ()=>{
//     window.open(`tel:+919870939480`, "_self");
// })

// document.getElementById("iii").addEventListener("click", ()=>{
//     window.open(`tel:+919559271190`, "_self");
// })

var dbref = firebase.database().ref("users/");
window.onload = ()=>{
    if(window.localStorage.getItem('rep') == "Tr"){
        document.getElementById("sent").classList.remove("hide");
        document.getElementById("wsheet").href = "/Worksheet";
        document.getElementById("propic").href = "/Profiles";
        document.getElementById("wsheet").classList.remove("hide");
        document.getElementById("sign").classList.add("hide");
        document.getElementById("propic").classList.remove("hide");
        document.getElementById("nav").classList.add("proo");
        document.getElementById("loader").style.display = "none";
        document.getElementById("wl").style.display = "none";
        document.body.style.overflow = 'auto';
    }
    else if(window.localStorage.getItem('rep') == "St"){
        dbref.child(window.localStorage.getItem("number")).on("value", (snap)=>{
            if(snap.exists()){
                    document.getElementById("wsheet").classList.remove("hide");
                    document.getElementById("sign").classList.add("hide");
                    document.getElementById("propic").classList.remove("hide");
                    document.getElementById("nav").classList.add("proo");
                    document.getElementById("wsheet").href = "/Worksheets";
                    document.getElementById("propic").href = "/Profile";
                    dbref.child(window.localStorage.getItem("number")+"/subhjects").on("value",(dat)=>{
                        window.localStorage.setItem("subhject", dat.val());
                    })
                    document.getElementById("nav").classList.add("proo");
                    document.getElementById("loader").style.display = "none";
                    document.getElementById("wl").style.display = "none";
                    document.body.style.overflow = 'auto';
            }else{
                window.localStorage.clear();
            }
        })
    }else{
        document.getElementById("loader").style.display = "none";
        document.getElementById("wl").style.display = "none";
        document.body.style.overflow = 'auto';
    }
}

contacts = ["+919870939480", "+917417809186","+919559271190"]

function conta(i){
    window.open(`tel:${contacts[i-1]}`, "_self");
    // return false;
}

document.getElementById("mpb").addEventListener("click", ()=>{
        window.open(`https://maps.app.goo.gl/GnVKroYZ6i38aJ9e6`);
    })