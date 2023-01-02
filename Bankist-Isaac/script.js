"use strict";
/******************************ACCOUNT DATA***********************/
const account1 = {
  email: "isaacestrella12@gmail.com",
  name: "Isaac",
  movements: [200, 455, 300, -400, 50, -200, 300, -55, 400],
  interestRate: 1.2,
  password: "accountnumberone",
};

const account2 = {
  email: "joey@gmail.com",
  name: "Joey",
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

/***************************DOM ELEMENTS BANKING***********************/
const bankingUI = document.querySelector(".app-container");
const welcomeMessage = document.querySelector(".welcome");
const totalBalance = document.querySelector(".balance_value");
const summaryIn = document.querySelector(".summary_value--in");
const summaryOut = document.querySelector(".summary_value--out");
const summaryInterest = document.querySelector(".summary_value--interest");

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

//Displays the name,total balance,in, out, interest,and movments
const displaySummary = function (targetAcc) {
  //Take the text content of the welcome and add the name of the current user
  welcomeMessage.textContent = `${welcomeMessage.textContent} ${targetAcc.name}`;
  // totalBalance.textContent = targetAcc.movements.reduce();
  const total = targetAcc.movements.reduce((acc, mov) => acc + mov, 0);
  console.log(total);
  totalBalance.textContent = `$${total}`;
  summaryOut;
  const totalDeposit = targetAcc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  summaryIn.textContent = `${totalDeposit}`;

  const totalWithdrawal = targetAcc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  summaryOut.textContent = `$${Math.abs(totalWithdrawal)}`;

  const totalInterest = targetAcc.movements
    .filter((mov) => mov > 0)
    .map((mov) => mov * (targetAcc.interestRate / 100))
    .filter((int) => int > 1)
    .reduce((acc, cur) => acc + cur, 0);
  /**account.movements
    .filter(mov => mov > 0)
    .map(mov => mov * (currentAccount.interestRate / 100))
    .filter(int => int > 1)
    .reduce((acc, cur) => acc + cur, 0); */
  console.log(summaryInterest);
  summaryInterest.textContent = `${totalInterest}`;
};

//Display the banking system if inputs are correct
const diplayBanking = function (b, targetAcc) {
  if (b) {
    loginModal.classList.toggle("hidden");
    bankingUI.classList.toggle("hidden");
    displaySummary(targetAcc);
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

//Sets the current user
let currentUser;
const setCurrentUser = function (match, emailInput) {
  if (match) {
    return accounts.find((acc) => acc.email === emailInput);
  } else {
    return 0;
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
  // const currentUser = setCurrentUser(emailPassMatch, emailInput);
  diplayBanking(emailPassMatch, accountWithEmail);
  //
};

btnLogin.addEventListener("click", checkVaildLogin);
