

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