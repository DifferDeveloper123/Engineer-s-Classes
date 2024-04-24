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
const classDropdown = document.getElementById('class');
const nextBtn = document.getElementById('nnxt');
const uploadForm = document.getElementById('uploadForm');
const pdfFileInput = document.getElementById('pdfFile');
const uploadBtn = document.getElementById('uploadBtn');
const pdfContainer = document.getElementById('pdfContainer');
const pdfList = document.getElementById('pdfList');

window.onload = ()=>{
  if(window.localStorage.getItem('rep') !== "Tr"){
      window.open("/", "_self");
  }
  document.getElementById("loader").style.display = "none";
  document.getElementById("wl").style.display = "none";
}

var grade = 1, subji = "";
function setDrop(grde) {
  document.getElementById("nnxt").classList.remove("hide");
  document.getElementById("dropdown").checked = false;
  document.getElementById("drop").textContent = grde + 'th';
  grade = grde;
  subji = window.localStorage.getItem('subhject');
  if(grade<11 && window.localStorage.getItem('subhject') == "P"){
    subji = 'S';
  }
}

nextBtn.addEventListener('click', () => {
  document.getElementById('pdfContainer').style.display = 'block';
  document.getElementById('head').classList.remove('hide');
  document.getElementById('fro').classList.add('hide');
  renderPDFs(grade);
});

var a =true;

function changement(){
  document.getElementById("count").textContent = document.getElementById('counting').value.length;
  $(".button_outer").removeClass("hide");
  if(document.getElementById("count").textContent > 30){
    document.getElementById("counter").style.color = "red";
    $(".button_outer").addClass("hide");
   a = true;
  }else if(document.getElementById("count").textContent <= 30 && document.getElementById("count").textContent > 0){
    document.getElementById("counter").style.color = "black";
    $(".button_outer").removeClass("hide");
    btntoupld.removeClass("hide");
    btnOuter.removeClass("hide");
    a = false;
  }else{
    document.getElementById("counter").style.color = "red";
    $(".button_outer").addClass("hide");
  }
}

var btnUpload = $("#upload_file"),
  btnOuter = $(".button_outer"), btntoupld = $(".btn_upload");
var file;

btnUpload.on("change", function (e) {
  file = e.target.files[0];

  if (!file || file.type !== "application/pdf") {
    $(".error_msg").text("Please select a PDF file.");
    return;
  }

  $(".error_msg").text("");

  var reader = new FileReader();
  reader.onload = function (event) {
    var pdfData = new Uint8Array(event.target.result);
    pdfjsLib.getDocument({ data: pdfData }).promise.then(function (pdf) {
      pdf.getPage(1).then(function (page) {
        var canvas = document.getElementById("pdf_preview");
        var context = canvas.getContext("2d");
        var viewport = page.getViewport({ scale: 1.0 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        page.render(renderContext);

        // setTimeout(function() {
        $("#uploaded_view").addClass("show");
        $(".cname").addClass("hide");
        $(".count").addClass("hide");
        $("#uploaded_view").removeClass("hide");
        btntoupld.addClass("hide");
        btnOuter.addClass("hide");
        // }, 1000);
      });
    });
  };
  reader.readAsArrayBuffer(file);
});

function k9(sta) {
  $("#uploaded_view").addClass("add");
  $("#uploaded_view").removeClass("show");
  $("#pdf_preview").get(0).getContext("2d").clearRect(0, 0, $("#pdf_preview").width(), $("#pdf_preview").height());
  $("#uploaded_view").addClass("hide");
  $(".progress").removeClass("hide");

  if (sta == true) {
    var name = generateID(8);
    var chapterName = document.getElementById('counting').value;
      // Code to upload the file and save metadata to Firebase
      const storageRef = firebase.storage().ref(`pdfs/${subji}/${grade}/${name}`);
      const uploadTask = storageRef.put(file);
      uploadTask.on('state_changed',
        (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    document.getElementById("pro").style.width = progress + "%";
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
    if (progress==100){
      document.getElementById("pro").style.width = "100.8%";
      $(".progress").addClass("hide");
      $(".ol").addClass("hide");
      $(".container").addClass("hide");
      $(".progress").removeClass("show");
      $(".cname").removeClass("hide");
      $(".count").removeClass("hide");
      document.getElementById('counting').value = "";
      document.getElementById("count").textContent = 0;
    }
        },
        (error) => {
          console.error('Error uploading file:', error);
        },
        () => {
          // Upload complete
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            // Save metadata to Firebase database
            db.ref(`pdfs/${subji}/${grade}/${name}`).update({
              chapterName: chapterName,
              downloadURL: downloadURL,
              locked: false // Default to unlocked
            });
            renderPDFs(grade);
            pdfContainer.style.display = 'block';
          });
        }
      );
      $("#upload_file").val('');
  } else {
    $("#upload_file").val('');
    $(".progress").removeClass("show");
    $(".progress").addClass("hide");
    $(".cname").removeClass("hide");
    $(".count").removeClass("hide");
    document.getElementById('counting').value = "";
    document.getElementById("count").textContent = 0;
  }
}

function upload(){
  $(".ol").removeClass("hide");
  $(".container").removeClass("hide");
}

//   uploadBtn.addEventListener('click', () => {
//     var name = generateID(8);
//       const pdfFile = pdfFileInput.files[0];
//       if (pdfFile) {
//           const confirmUpload = confirm("Do you want to continue uploading?");
//           if (confirmUpload) {
//               const chapterName = prompt("Enter the name of the chapter:");
//               if (chapterName) {
//                   // Code to upload the file and save metadata to Firebase
//                   const storageRef = firebase.storage().ref(`pdfs/${grade}/${name}`);
//                   const uploadTask = storageRef.put(pdfFile);
//                   uploadTask.on('state_changed', 
//                       (snapshot) => {
//                           // Progress tracking
//                       }, 
//                       (error) => {
//                           console.error('Error uploading file:', error);
//                       }, 
//                       () => {
//                           // Upload complete
//                           uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//                               // Save metadata to Firebase database
//                               db.ref(`pdfs/${grade}/${name}`).update({
//                                   chapterName: chapterName,
//                                   downloadURL: downloadURL,
//                                   locked: false // Default to unlocked
//                               });
//                               renderPDFs(grade);
//                               pdfContainer.style.display = 'block';
//                           });
//                       }
//                   );
//               } else {
//                   alert("Chapter name cannot be empty!");
//               }
//           }
//       } else {
//           alert("Please select a PDF file to upload.");
//       }
//   });

// Function to render PDFs
function renderPDFs(selectedClass) {
  pdfList.innerHTML = ''; // Clear previous list
  db.ref(`pdfs/${subji}/${selectedClass}`).once('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const pdfData = childSnapshot.val();
      const pdfName = childSnapshot.key;
      const pdfItem = document.createElement('div');
      pdfItem.classList.add("card");
      pdfItem.innerHTML = `
                <div class="card-header">
                <div class="name"><h1>${pdfData.chapterName}</h1></div>
              </div>
      
              <div class="card-footer">
                    <button class="view" onclick="opener('${pdfData.downloadURL}')">
                      <i class="fa fa-eye"></i>
                    </button>
                    <button onclick="toggleLock('${selectedClass}', '${pdfName}', ${id})">
                      <i id=${id} class="fas fa-lock-open"></i>
                    </button>
                </div>`;
      //   pdfItem.innerHTML = `
      //       <a href="${pdfData.downloadURL}" target="_blank">${pdfData.chapterName}</a>
      //       <button class="btn" onclick="toggleLock('${selectedClass}', '${pdfName}')">
      //           ${pdfData.locked ? 'Unlock' : 'Lock'}
      //       </button>
      //   `;

      pdfList.appendChild(pdfItem);
      if (pdfData.locked == true) {
        document.getElementById(id).classList.add("fa-lock");
        document.getElementById(id).classList.remove("fa-lock-open");
      } else {
        document.getElementById(id).classList.remove("fa-lock");
        document.getElementById(id).classList.add("fa-lock-open");
      }
      id++;
    });
  });
}

// Function to toggle lock/unlock
function toggleLock(selectedClass, pdfName, id) {
  db.ref(`pdfs/${subji}/${selectedClass}/${pdfName}`).once('value', (snapshot) => {
    const pdfData = snapshot.val();
    db.ref(`pdfs/${subji}/${selectedClass}/${pdfName}`).update({
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

function opener(uril) {
  window.open(uril);
}