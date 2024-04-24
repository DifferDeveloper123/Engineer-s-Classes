function out() {
    var dbbRef = firebase.database().ref(`users/`);
    document.getElementById("loader").style.display = "block";
    document.getElementById("wl").style.display = "block";
    dbbRef.child(window.localStorage.getItem("number")).remove().then(()=>{
        window.localStorage.clear();
        window.open("/", "_self");
    });
}

var dbref = firebase.database().ref("users/");
window.onload = () => {
    if (window.localStorage.getItem('rep') == "St") {
        dbref.child(window.localStorage.getItem("number")).on("value", (snap) => {
            if (snap.exists()) {
                document.getElementById("usnam").textContent = window.localStorage.getItem("usnam");
                document.getElementById("num").textContent = window.localStorage.getItem("number");
                document.getElementById("subs").textContent = window.localStorage.getItem("subhject");
                document.getElementById("class").textContent = window.localStorage.getItem("grade");
                document.getElementById("loader").style.display = "none";
                document.getElementById("wl").style.display = "none";
                document.body.style.overflow = 'auto';
            } else {
                window.localStorage.clear();
                window.open("/", "_self");
            }
        })
    } else {
        window.open("/", "_self");
        document.body.style.overflow = 'auto';
    }
}

function log() {
    document.getElementById("conta").classList.remove("hide");
    document.getElementById("ol").classList.remove("invi");
}

function gol() {
    document.getElementById("conta").classList.add("hide");
    document.getElementById("ol").classList.add("invi");
}