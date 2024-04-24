
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyATLyVUiPP8ZFeoxU6qi-ucRv1uK7ML5Ow",
    authDomain: "engineer-s-classes.firebaseapp.com",
    databaseURL: "https://engineer-s-classes-default-rtdb.firebaseio.com",
    projectId: "engineer-s-classes",
    storageBucket: "engineer-s-classes.appspot.com",
    messagingSenderId: "687410527288",
    appId: "1:687410527288:web:144dfee32606adffc63acd"
};
firebase.initializeApp(firebaseConfig);

var grade = "1", subji = "";
// Reference to the database
var dbRef = firebase.database().ref(`students/${grade}/`);
var dbbRef = firebase.database().ref(`users/`);

window.onload = ()=>{
    if(window.localStorage.getItem('rep') !== "Tr"){
        window.open("/", "_self");
    }
}

function del(id, nu, subs) {
    if (nu == 1) {
        // Remove the student data from the database
        dbRef.child(id).remove();
        dbbRef.child(id).remove();
        // Update the isBlocked flag in the database
        dbRef.child(id).update({ isBlocked: true });
        // Remove the student from the UI
        document.getElementById(id).remove();
    } else {
        var sublen = subs.length;
        var subloc = subs.indexOf(subji) + 1;
        var subas = "";
        if (subloc == sublen) {
            subas = subs.replace("," + subji, "");
        } else if (subloc == 1) {
            subas = subs.replace(subji + ",", "");
        } else {
            subas = subs.replace(subji + ",", "");
        }
        dbRef.child(id).update({ subhject: subas });
        dbbRef.child(id).update({ subhject: subas });
        // Remove the student from the UI
        document.getElementById(id).remove();
    }
}

function send(id, pass){
    window.open(`https://wa.me/+91${id}?text=Hello, this is *Engineer's Classes*, 
    Your username for your account is: ${id}, 
    password is: ${pass}`);
}

function countCommas(str) {
    // Use a regular expression to match all commas in the string
    const commaCount = (str.match(/,/g) || []).length;
    return commaCount;
}

// Function to render student list
function renderStudentList() {
    const studentListDiv = document.getElementById('studentList');
    studentListDiv.innerHTML = ''; // Clear previous list
    dbRef.once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const studentData = childSnapshot.val();
            const studentKey = childSnapshot.key;
            let subhs = studentData.subhject;
            let subhas = "'" + studentData.subhject + "'";
            let subbh = subji;
            var t = 0;
            t = countCommas(subhs) + 1;

            if (subhs.indexOf(subbh) !== -1) {
                if (!studentData.isBlocked) {
                    const studentDiv = document.createElement('div');
                    studentDiv.id = studentKey;
                    studentDiv.classList.add('card');
                    studentDiv.innerHTML = `
                <div class="card-header">
                  <div class="avatar">
                  </div>
                  <div class="name"><h1>${studentData.studentName}</h1></div>
                  <div class="role">${studentData.parentName}</div>
                  <div class="nu">${studentData.phoneNumber}</div>
                </div>
        
                <div class="card-footer">
                  <div class="social-buttons">
                    <button onclick="del(${studentKey},${t}, ${subhas});">
                      <i class="fa fa-trash"></i> Delete
                    </button>
                    <button class="send" onclick="send(${studentKey}, ${studentData.pass});">
                      <i class="fab fa-whatsapp"></i> Send
                    </button>
                  </div>
                </div>`;
                    studentListDiv.appendChild(studentDiv);
                }
            }
        });
    });
}

// Show create student form when the button is clicked
function showCreateForm() {
    document.getElementById('createStudentForm').style.display = 'block';
    document.getElementById('ol').style.display = 'block';
}

// Handle form submission to create new student
document.getElementById('studentForm').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get form values
    const studentName = document.getElementById('studentName').value;
    const parentName = document.getElementById('parentName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    var pass = generateID(6);

    dbRef.child(phoneNumber).once("value").then((snapshot) => {
        if (snapshot.exists()) {
            dbRef.child(`${phoneNumber}/subhject`).once("value", (snapshot) => {
                var subh = snapshot.val();
                subhject = subh + "," + subji;
                // Push new student data to Firebase database
                dbRef.child(phoneNumber).update({
                    studentName: studentName,
                    parentName: parentName,
                    phoneNumber: phoneNumber,
                    subhject: subhject,
                    isBlocked: false // Initially set isBlocked to false
                });
                dbbRef.child(phoneNumber).update({
                    studentName: studentName,
                    parentName: parentName,
                    phoneNumber: phoneNumber,
                    subhject: subhject,
                    isBlocked: false // Initially set isBlocked to false
                });
            })
        } else {
            // Push new student data to Firebase database
            dbRef.child(phoneNumber).update({
                studentName: studentName,
                parentName: parentName,
                phoneNumber: phoneNumber,
                pass: pass,
                logged: false,
                subhject: subji,
                isBlocked: false // Initially set isBlocked to false
            });
            dbbRef.child(phoneNumber).update({
                studentName: studentName,
                parentName: parentName,
                phoneNumber: phoneNumber,
                pass: pass,
                subhject: subji,
                logged: false,
                grade: grade,
                isBlocked: false // Initially set isBlocked to false
            });
        }
    });

    // Clear form fields
    document.getElementById('studentName').value = '';
    document.getElementById('parentName').value = '';
    document.getElementById('phoneNumber').value = '';

    // Hide the form
    document.getElementById('ol').style.display = 'none';
    document.getElementById('createStudentForm').style.display = 'none';
    setTimeout(()=>{
    renderStudentList();
    },2000);
});

function setDrop(grde) {
    document.getElementById("nnxt").classList.remove("hide");
    document.getElementById("dropdown").checked = false;
    document.getElementById("drop").textContent = grde + 'th';
    grade = grde;
    if(grade < 11 && window.localStorage.getItem('subhject') == 'P'){
        subji = 'S';
    }
}

function setClass() {
    document.getElementById("fro").style.display = "none";
    document.getElementById("stus").classList.remove("hide");
    document.getElementById("createStudentBtn").classList.remove("hide");
    document.getElementById("head").classList.remove("hide");
    document.getElementById("drop").textContent = "Select Grade";
    document.getElementById("dropdown").checked = false;
    document.getElementById("studentName").value = "";
    document.getElementById("parentName").value = "";
    document.getElementById("phoneNumber").value = "";
    dbRef = firebase.database().ref(`students/` + grade + ``);
    subji = window.localStorage.getItem('subhject');
    // Render the initial student list
    renderStudentList();
}