"use strict";
/******************************ACCOUNT DATA***********************/
const account1 = {
  email: "isaacestrella12@gmail.com",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2,
  password: "accountnumberone",
};

const account2 = {
  email: "isaacestrella12@gmail.com",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  password: "accountnumbertwo",
};

const accounts = [account1, account2];

/***************************DOM ELEMENTS FOR LOGIN PAGE***********************/
const inputLoginEmail = document.querySelector(".login_email");
const inputLoginPassword = document.querySelector(".login_pass");
const btnLogin = document.querySelector(".login_btn");
const loginModal = document.querySelector(".login_container");

//Finds the acount with the inputted email
const findTargetAccount = function (exist, mailInput) {
  if (exist) {
    return accounts.find((acc) => acc.email === mailInput);
  } else {
    return 0;
  }
};

//Checks if the password mataches the correct email
const checkPassMatchEmail = function (inputPass, tarAccount) {
  if (tarAccount) {
    return tarAccount.password === inputPass;
  } else {
    return 0;
  }
};

//Display the banking system if inputs are correct
const diplayBanking = function (b) {
  if (b) {
    loginModal.classList.toggle("hidden");
    console.log(loginModal);
  }
};

//Clears the input fields
const clearLogin = function () {
  inputLoginEmail.value = "";
  inputLoginPassword.value = "";
};

// Prints the alert if email or password is wrong
const displayError = function (e, m) {
  clearLogin();
  if (!e || !m) {
    alert("Wrong input!");
  }
};

const checkVaildLogin = function (e) {
  e.preventDefault();
  //Store the email
  const emailInput = inputLoginEmail.value;
  //Store the password
  const passwordInput = inputLoginPassword.value;
  // Find if the inputted email exist
  const emailExist = accounts.some((acc) => acc.email === emailInput);
  //Return the object with the inputted email that exist
  const accountWithEmail = findTargetAccount(emailExist, emailInput);
  const emailPassMatch = checkPassMatchEmail(passwordInput, accountWithEmail);
  displayError(emailExist, emailPassMatch);
  diplayBanking(emailPassMatch);
  //
};

btnLogin.addEventListener("click", checkVaildLogin);
