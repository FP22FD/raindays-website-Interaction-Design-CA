const form = document.querySelector("form");

form.addEventListener("submit", validateForm);

function validateForm(event) {
  event.preventDefault();

  const message = document.querySelector("#input-message");
  const messageError = document.querySelector("#message-error");

  const email = document.querySelector("#input-email");
  const emailError = document.querySelector("#email-error");

  const isFormValid = document.querySelector("#isFormValid");

  const isSubjectValid = message.value.length >= 10;
  if (isSubjectValid) {
    messageError.style.display = "none";
  } else {
    messageError.style.display = "block";
  }

  const isEmailValid = email.value.length > 0 && validateEmail(email.value);
  if (isEmailValid) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  if (isSubjectValid && isEmailValid) {
    isFormValid.style.display = "block";
    document.querySelector("form").reset();
  } else {
    isFormValid.style.display = "none";
    // form.reset();
    // console.log("validation passed");
  }
}

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}
