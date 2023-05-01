function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

////////////////////---Contact-Form--/////////////////////
const first = document.getElementById("first");
const last = document.getElementById("last");
const email = document.getElementById("email");
const message = document.getElementById("message");

// REGEX
const regName = /^[A-Za-z]{2}/;
const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regMessage = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// DOM Errors
const errorFirst = document.getElementById("errorFirst");
const errorLast = document.getElementById("errorLast");
const errorMail = document.getElementById("errorMail");
const errorMessage = document.getElementById("errorMessage");

// function Firstname
function isFirstNameValid(first) {

  if(!regName.test(first)){
      console.log(first);
      errorFirst.textContent ='Prénom invalide.';
      errorFirst.style.color = 'red';
      errorFirst.style.fontSize = "1rem";
      return false;
  }else{
      console.log(first);
      errorFirst.textContent ='';
      return true;
  }
}

// function Lastname
function isLastNameValid(last) {
  if(!regName.test(last)){
      console.log(last);
      errorLast.textContent ='Nom invalide.';
      errorLast.style.color = 'red';
      errorLast.style.fontSize = "1rem";
      return false;
  }else{
    console.log(last)
    errorLast.textContent='';
    errorLast.style.color = 'green';
    return true;
  }
}

// function Email
function isEmailValid(email){
  if(regEmail.test(email)){
    console.log("Email valide: " + email);
    errorMail.textContent ='';
    errorMail.style.color = 'green';
    return true;
  }else {
    console.log("Invalid email given.");
    errorMail.textContent ='Mail invalide.';
    errorMail.style.color = 'red';
    errorMail.style.fontSize = "1rem";
    return false;
  }
}

// function  message
function isMessageValid(message) {
  if(!regMessage.test(message)){
      console.log(message);
      errorMessage.textContent ='Nom invalide';
      errorMessage.style.color = 'red';
      errorMessage.style.fontSize = "1rem";
      return false;
  }else{
    console.log(message)
    errorMessage.textContent='';
    errorMessage.style.color = 'green';
    return true;
  }
}

const form = document.querySelector('#contactForm');
const submit = document.getElementById("btnSubmit");
form.onsubmit = (event) =>{
  event.preventDefault();
  if (validate()){
    console.log("validated");
    const validated = document.getElementById("validated");
    validated.style.textAlign = "center";
    validated.innerHTML = "Merci pour votre message";
    validated.style.margin = "35% auto";
    const contents = document.getElementById("contents");
    contents.appendChild(closeButton);
   }
   console.log("error check");
};

// Clear form
function resetForm() {
  // input values
  const first = document.getElementById('first');
  first.value = "";
  const last = document.getElementById('last');
  last.value = "";
  const email = document.getElementById('email');
  email.value = "";
  const message = document.getElementById("message");
  message.value = "";
}
