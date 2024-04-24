var wname = document.getElementById("wname");
var subject = document.getElementById("subject");
var email = document.getElementById("email");
var message = document.getElementById("message");
var error_message = document.getElementById("error_message");
var nam = document.getElementById("name");

var ready = false;

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

function verifye(email) {
  var re = /\S+@\S+\.\S+/;
  if (re.test(email.value) == true) {
    e = true;
    error_message.style.padding = "0px";
    error_message.textContent = "";
  } else {
    error_message.style.padding = "10px";
    error_message.textContent = "Enter correct email address";
    e = false;
  }
}

var q = false, w = false, e = false, t = false, y = false;

var text;

function vali(val, p, g) {
  var g = g;
  if (val.value == "") {
    g = false;
    text = p;
    error_message.style.padding = "10px";
    error_message.textContent = text;
    return false;
  } else if (val.value !== "") {
    g = true;
    return true;
  }
}

function check() {

  verifye(email);
  if (vali(message, "Enter your message", y)) {
    y = true;
  } else {
    y = false;
  };
  if (vali(subject, "Enter the subject of message", t)) {
    t = true;
  } else {
    t = false;
  };
  if (vali(wname, "Enter your ward's name", w)) {
    w = true;
  } else {
    w = false;
  };
  if (vali(nam, "Enter your name", q)) {
    q = true;
  } else {
    q = false;
  };

  if (q == true && w == true && e == true && t == true && y == true) {
    sendMail();
    return true
  }
}

function sendMail() {
  
  Email.send({
    SecureToken: "5a87715b-f4e5-40ff-b76d-a65cf3c4d85e",
    To: 'prabhanjansinghps@gmail.com',
    From: "The Engineer's Classes <classes.psenglish@gmail.com>",
    Subject: subject.value,
    Body: "This message is sent by " + nam.value + ". His/her child name is " + wname.value + ". The email is " + email.value + ". The message is " + message.value
  })
}

// console.log("0960f569-58ba-4f9d-a0e2-0d45b8ad168f");