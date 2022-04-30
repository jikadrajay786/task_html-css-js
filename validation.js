function getDate() {
  var todayDate = new Date();
  var month = todayDate.getMonth() + 1;
  var year = todayDate.getUTCFullYear();
  var tDate = todayDate.getDate();

  if (month < 10) {
    month = "0" + month;
  }
  if (tDate < 10) {
    tDate = "0" + tDate;
  }

  var maxDate = year + "-" + month + "-" + tDate;
  document.getElementById("dob").setAttribute("max", maxDate);
}
function validate() {
  const nameValidate = validateName();
  const dateValidate = validateDate();
  const phoneValidate = validatePhone();
  const emailValidate = validateEmail();

  let name = document.getElementById("employeeName");
  name.addEventListener("keyup", () => {
    validateName();
  });

  let dob = document.getElementById("dob");
  dob.addEventListener("keyup", () => {
    validateDate();
  });

  let email = document.getElementById("Email");
  email.addEventListener("keyup", () => {
    validateEmail();
  });

  let phone = document.getElementById("Phone");
  phone.addEventListener("keyup", () => {
    validatePhone();
  });

  if (nameValidate == true && dateValidate == true && phoneValidate == true && emailValidate == true) {
    return true;
  } else {
    return false;
  }
}
function validateName() {
  let name = document.getElementById("employeeName").value;
  let reg = /^[0-9a-zA-Z]+$/;
  let numberReg =/^[0-9]+$/;
  if (name.length == 0) {
    document.getElementById("nameErrorText").innerHTML = "* Please enter name";
    return false;
  } else if (name.length < 4 || name.length > 20) {
    document.getElementById("nameErrorText").innerHTML ="* input length should be greater then 4 or less then 20";
    return false;
  } else if (!name.match(reg)) {
    document.getElementById("nameErrorText").innerHTML = "* not valid format";
    return false;
  }else if(name.match(numberReg)){
    document.getElementById("nameErrorText").innerHTML = "* not valid format";
    return false;
  } 
  else {
    document.getElementById("nameErrorText").innerHTML = "";
  }
  return true;
}
function validateDate() {
  var todayDate = new Date();
  var month = todayDate.getMonth() + 1;
  var tDate = todayDate.getDate();

  if (month < 10) {
    month = "0" + month;
  }
  if (tDate < 10) {
    tDate = "0" + tDate;
  }
  let getDob = document.getElementById("dob").value;
  if (getDob.length == 0) {
    document.getElementById("dobErrorText").innerHTML = "* please select date";
    return false;
  } else {
    document.getElementById("dobErrorText").innerHTML = "";
    return true;
  }
  return true;
}
function validateEmail() {
  let getEmail = document.getElementById("Email").value;
  let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (getEmail == "") {
    document.getElementById("emailErrorText").innerHTML = "* please enter email";
    return false;
  } else if (!getEmail.match(emailReg)) {
    document.getElementById("emailErrorText").innerHTML = " enter valid email";
    return false;
  } else {
    document.getElementById("emailErrorText").innerHTML = "";
  }
  return true;
}
function validatePhone() {
  let getPhone = document.getElementById("Phone").value;
  if (getPhone == "") {
    document.getElementById("phoneErrorText").innerHTML = "";
  } else {
    if (!getPhone.match(/^[0-9]+$/)) {
      document.getElementById("phoneErrorText").innerHTML = "* must be number";
      return false;
    } else if (getPhone.length > 10 || getPhone.length < 10) {
      document.getElementById("phoneErrorText").innerHTML ="* phone length must be 10 digit";
      return false;
    } else {
      document.getElementById("phoneErrorText").innerHTML = "";
    }
  }
  return true;
}