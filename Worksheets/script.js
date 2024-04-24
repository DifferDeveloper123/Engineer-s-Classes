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
const db = firebase.database();
var id = 0;
const pdfList = document.getElementById('pdfList');
const nextBtn = document.getElementById('nnxt');

var grade = window.localStorage.getItem("grade");
var subh = "E", subs = window.localStorage.getItem("subhject");

window.onload = ()=>{
  if(window.localStorage.getItem('rep') !== "St"){
      window.open("/", "_self");
  }
  document.getElementById("loader").style.display = "none";
  document.getElementById("wl").style.display = "none";
}

if(grade<11){
  document.getElementById("P").textContent = "Science";
  document.getElementById("C").classList.add("hide");
  document.getElementById("B").classList.add("hide");
}

function setDrop(sub, subj) {
  document.getElementById("nnxt").classList.remove("hide");
  document.getElementById("dropdown").checked = false;
  document.getElementById("drop").textContent = sub;
  subh = subj;
  if(grade<11 && subj == "P"){
  document.getElementById("drop").textContent = "Science";
  subh = 'S';
}
}

nextBtn.addEventListener('click', () => {
  document.getElementById('pdfContainer').style.display = 'block';
  document.getElementById('pdfContainer').classList.remove('hide');
  document.getElementById('head').classList.remove('hide');
  document.getElementById('fro').classList.add('hide');
  if(subs.indexOf(subh) > -1){
    renderPDFs(grade);
  }else{
    Toast("donotexist");
    setTimeout(()=>{
      document.getElementById('pdfContainer').style.display = 'none';
      document.getElementById('head').classList.add('hide');
      document.getElementById('fro').classList.remove('hide');
      document.getElementById('pdfContainer').classList.dd('hide');
    }, 2000)
  }
});

function renderPDFs(selectedClass) {
  pdfList.innerHTML = ''; // Clear previous list
  db.ref(`pdfs/${subh}/${grade}`).once('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const pdfData = childSnapshot.val();
      const pdfName = childSnapshot.key;
      const pdfItem = document.createElement('div');
      pdfItem.classList.add("card");
      pdfItem.onclick=()=>{
        opener(pdfData.downloadURL, pdfData.locked);
      };
      pdfItem.setAttribute("onclick", `opener('${pdfData.downloadURL}', ${pdfData.locked})`);

      pdfItem.innerHTML = `
                <div class="card-header">
                <div class="name"><h1>${pdfData.chapterName}</h1></div>
              </div>
      
              <div id=${id} class="card-footer">
                    <button>
                      <i class="fas fa-lock"></i>
                    </button>
                </div>`;
      //   pdfItem.innerHTML = `
      //       <a href="${pdfData.downloadURL}" target="_blank">${pdfData.chapterName}</a>
      //       <button class="btn" onclick="toggleLock('${selectedClass}', '${pdfName}')">
      //           ${pdfData.locked ? 'Unlock' : 'Lock'}
      //       </button>
      //   `;

      pdfList.appendChild(pdfItem);
      if (pdfData.locked !== true) {
        document.getElementById(id).classList.add("hide");
      } else {
        document.getElementById(id).classList.remove("hide");
      }
      id++;
    });
  });
}

// Function to toggle lock/unlock
function toggleLock(selectedClass, pdfName, id) {
  db.ref(`pdfs/${window.localStorage.getItem('subhject')}/${selectedClass}/${pdfName}`).once('value', (snapshot) => {
    const pdfData = snapshot.val();
    db.ref(`pdfs/${window.localStorage.getItem('subhject')}/${selectedClass}/${pdfName}`).update({
      locked: !pdfData.locked
    });
    if (!pdfData.locked == true) {
      document.getElementById(id).classList.add("fa-lock");
      document.getElementById(id).classList.remove("fa-lock-open");
    } else {
      document.getElementById(id).classList.remove("fa-lock");
      document.getElementById(id).classList.add("fa-lock-open");
    }
  });
}

function opener(uril, status) {
  if(!status){
  window.open(uril);
}
}