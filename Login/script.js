var pasput = document.getElementById("password-container").value;
var emput = document.getElementById("email-container").value;
var emailAccept = false, passAccept = false;
var db = firebase.database();
var pwss = ["English@PS.rameti9186", 'Maths@SP.tilak9559', "Physics@tilak.AD9870", "Bio@PBS.jaipuria2262", "Chemistry@tilak.3590VP"];
var emss = ["7417809186", "9559271190", "9870939480", "8960922262", "8533953590"];
var usnam = ["Prabhanjan Singh", "Shikhar Patel", "Anuj Dwivedi", "Pushpendra Bhadauriya", "Vaibhav Pandey"];
var tr = ["E", "M", "P", "C", "B"];
var trf = ["English", "Mathematics", "Physics", "Chemistry", "Biology"];
var grade = 9;
var dbRef = firebase.database().ref(`students/${grade}/`);


window.onload = ()=>{
  if(window.localStorage.getItem('rep') == "Tr" || window.localStorage.getItem('rep') == "St"){
    window.open("/", "_self");
  }
}

function Checkout() {
  var empIndex = emss.indexOf(document.getElementById("email-container").value);
  if (empIndex !== -1) {
    if (pwss[empIndex] === document.getElementById("password-container").value) {
      var trr = tr[empIndex];
      db.ref(`VIP/${trr}/log`).once("value", (snapshot) => {
        var data = snapshot.val();
        if(snapshot.exists()){
        if (data == false) {
          db.ref(`VIP/${trr}/`).update({
            log: true
          })

          window.localStorage.setItem("subhject", trr);
          window.localStorage.setItem("usnam", usnam[empIndex]);
          window.localStorage.setItem("subject", trf[empIndex]);
          window.localStorage.setItem("rep", "Tr");
          // window.localStorage.setItem("access", "PES");
          window.localStorage.setItem("number", emss[empIndex]);
          window.open("/", "_self");
        } else {
          Toast("alerror");
        }}else{
          db.ref(`VIP/${trr}/`).update({
            log: true
          })

          window.localStorage.setItem("subhject", trr);
          window.localStorage.setItem("usnam", usnam[empIndex]);
          window.localStorage.setItem("subject", trf[empIndex]);
          window.localStorage.setItem("rep", "Tr");
          // window.localStorage.setItem("access", "PES");
          window.localStorage.setItem("number", emss[empIndex]);
          window.open("/", "_self");
        }
      });
    } else {
      Toast("error");
    }
  } else {
    var dbRef = firebase.database().ref(`users/`);
    dbRef.child(document.getElementById("email-container").value).once("value", (data) => {
      if (data.exists()) {
        dbRef.child(`${document.getElementById("email-container").value}/pass`).once("value", (snapshot) => {
          var pass = snapshot.val();
          if (document.getElementById("password-container").value == pass) {
            dbRef.child(`${document.getElementById("email-container").value}/logged`).once("value", (dat) => {
              dbRef.child(`${document.getElementById("email-container").value}/isBlocked`).once("value", (da) => {
                if (dat.val() == false && da.val() == false) {
                  dbRef.child(`${document.getElementById("email-container").value}/logged`).set(true);
                  dbRef.child(`${document.getElementById("email-container").value}/subhject`).once("value", (d) => {
                    window.localStorage.setItem("subhject", d.val());
                    dbRef.child(`${document.getElementById("email-container").value}/grade`).once("value", (date) => {
                      window.localStorage.setItem("grade", date.val());
                      dbRef.child(`${document.getElementById("email-container").value}/phoneNumber`).once("value", (datee) => {
                        window.localStorage.setItem("number", datee.val());
                        dbRef.child(`${document.getElementById("email-container").value}/studentName`).once("value", (dateee) => {
                          window.localStorage.setItem("usnam", dateee.val());
                          window.localStorage.setItem("rep", "St");
                          window.open("/", "_self");
                        })
                      })
                    })
                  })
                } else {
                  Toast("alerror");
                }
              })
            })

          } else {
            Toast("error");
          }
        })
      } else {
        Toast("errormains");
      }
    })

    // Toast("error");
  }
}