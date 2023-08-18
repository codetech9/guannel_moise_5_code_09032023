function displayModal() {
  const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
  modal.setAttribute('aria-hidden', 'false')
  modal.querySelector('input').focus();
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    modal.focus();
    first.value = "";
    last.value = "";
    email.value = "";
    message.value = "";
    errorFirst.textContent = "";
    errorLast.textContent = "";
    errorMail.textContent = "";
}

// DOM Errors
const errorFirst = document.getElementById("errorFirst");
const errorLast = document.getElementById("errorLast");
const errorMail = document.getElementById("errorMail");

// function Firstname
function isFirstNameValid(first, regName) {
  regName = /^[A-Za-z]{2}/;
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
function isLastNameValid(last, regName) {
  regName = /^[A-Za-z]{2}/;
  last = document.getElementById("last").value;
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
function isEmailValid(email, regEmail){
  regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  email = document.getElementById("email").value;
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


////////////////////---Contact-Form--/////////////////////
const form = document.querySelector('#contactForm');
form.onsubmit = (event) =>{
  event.preventDefault();
  if (validate()){
    console.log("validated");
    const validated = document.getElementById("validated");
    validated.style.textAlign = "center";
    validated.innerHTML = "Merci pour votre message";
    validated.style.margin = "50% auto";
   }
   console.log("error check");
};


//validate
function validate (){
  // input values
  const first = document.getElementById('first').value;
  const last = document.getElementById('last').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById("message").value;

  // Errors Validations
  let hasError = false;
  console.log("etat: " + hasError);

  if(!isFirstNameValid(first)){
    hasError = true;
    console.log("etat-2: " + hasError);
  }

  if(!isLastNameValid(last)){
    hasError = true;
    console.log("etat-3: " + hasError);
  }

  if(!isEmailValid(email)){
    hasError = true;
    console.log("etat-4: " + hasError);
  }


  console.log("etat-10: " + hasError);

  return !hasError;
}


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

// Close modal  while ESC key is press

// Get the modal element
function escClose() {
  const modal = document.getElementById("contact_modal");
  // Listen for keydown event on the document
  document.addEventListener("keydown", function(event) {
    // Check if the pressed key is the "Esc" key
    if (event.key === "Escape") {
      // Close the modal
      modal.style.display = "none";
      modal.setAttribute('aria-hidden', 'true');
      resetForm();
    }
  });
}

escClose();
