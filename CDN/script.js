function Focused(id){
  document.getElementById(id).style.color = '#7BA0CA';
}

function FocusedOUT(id){
  input = id.substring(0, id.length - 5);
  if(document.getElementById(input).value == ""){
  document.getElementById(id).style.color = '#939393';
  }else{
  document.getElementById(id).style.color = '#7BA0CA';
  }
}

function Decode(txt){
  var tex = txt.replace("@", "exameject");
  tex = tex.replace(".", "examejectcool");
  tex = tex.replace(".", "examejectcool");
  tex = tex.replace(".", "examejectcool");
  tex = tex.replace(".", "examejectcool");
  tex = tex.replace(".", "examejectcool");
  return tex;
}

function Encode(txt){
  var tex = txt.replace("exameject", "@");
  tex = tex.replace("examejectcool", ".");
  tex = tex.replace("examejectcool", ".");
  tex = tex.replace("examejectcool", ".");
  tex = tex.replace("examejectcool", ".");
  tex = tex.replace("examejectcool", ".");
  return tex;
}

function inputselector(clas){
  const otpInputs = document.querySelectorAll(clas);

  // Add event listeners to OTP input fields
  otpInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      if (input.value.length >= 1) {
        if (index < otpInputs.length - 1) {
          otpInputs[index + 1].focus();
        }
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace') {
        if (index > 0) {
          setTimeout(()=>{
            otpInputs[index - 1].focus();
          })
        }
      }
    });
  });
}

function Toast(id){
  document.getElementById(id).classList.add("show");
  setTimeout(()=>{
    document.getElementById(id).classList.remove("show");
    },3000)
}

// Random Code Generator
function generateID(numbers) {
  var chars = "0123456789";
  var RawID = "";
  for (var i = 0; i < numbers; i++) {
    RawID += chars[Math.floor(Math.random() * chars.length)];
  }
  return RawID;
}