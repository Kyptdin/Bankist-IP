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
const logoutBtn = document.querySelector(".logout_btn");
const movementsContainer = document.querySelector(".movements");
const sortBtn = document.querySelector(".sort_btn");
const openTransferBtn = document.querySelector(
  ".movments_options_btn-transfer"
);
const transferModal = document.querySelector(".options_modal--transfer");
const closeModalBtn = document.querySelectorAll(".close_modal_btn");
const balanceLabel = document.querySelector(".balance_value");
// Transfer modal
const transferBtn = document.querySelector(".form_btn--transfer");
const toAccountInput = document.querySelector(".form_input--to");
const amountTransfer = document.querySelector(".form_input--amount");

//Request modal
const requestMoneyBtn = document.querySelector(".movments_options_btn-request");
const requestModal = document.querySelector(".options_modal--request ");
const requestMoneySubmit = document.querySelector(".form_btn--request");

/**DOM ELEMENTS BANKING OPTIONS***********************/
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
  welcomeMessage.textContent = `Hi there, ${targetAcc.name}`;
  // totalBalance.textContent = targetAcc.movements.reduce();
  console.log(totalBalance.textContent + " before");
  const total = targetAcc.movements.reduce((acc, mov) => acc + mov, 0);
  totalBalance.textContent = `$${total}`;
  console.log(totalBalance.textContent);

  const totalDeposit = targetAcc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  summaryIn.textContent = `$${totalDeposit}`;

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
  summaryInterest.textContent = `${totalInterest}`;
};

let sort = false;
// let html;

const determineMov = function (m) {
  if (m > 0) {
    return "deposit";
  } else {
    return "withdrawal";
  }
};

const displayMovments = function (targetAcc, sort = false) {
  let i = 1;
  let html;

  movementsContainer.innerHTML = "";
  if (sort) {
    const greatestToLeast = targetAcc.movements
      .map((mov) => mov)
      .sort((curMov, nextMov) => curMov - nextMov);

    for (const mov of greatestToLeast) {
      html = `<div class="movements_row">
              <div class="movements_type movements_type--${determineMov(
                mov
              )}">${i} ${determineMov(mov)}</div>
              <div class="movements_date">1/2/2022</div>
              <div class="movements_value">$${mov}</div>
            </div>`;
      movementsContainer.insertAdjacentHTML("afterbegin", html);
      i++;
    }
  } else {
    for (const mov of targetAcc.movements) {
      html = `<div class="movements_row">
              <div class="movements_type movements_type--${determineMov(
                mov
              )}">${i} ${determineMov(mov)}</div>
              <div class="movements_date">1/2/2022</div>
              <div class="movements_value">$${mov}</div>
            </div>`;

      movementsContainer.insertAdjacentHTML("afterbegin", html);
      i++;
    }
  }
};

//Display the banking system if inputs are correct
const diplayBanking = function (match, targetAcc, firstTime = true) {
  if (match && firstTime) {
    loginModal.classList.toggle("hidden");
    bankingUI.classList.toggle("hidden");
    displaySummary(targetAcc);
    displayMovments(targetAcc, sort);
  } else if (match && !firstTime) {
    displaySummary(targetAcc);
    displayMovments(targetAcc, sort);
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
  currentUser = accountWithEmail;
  const emailPassMatch = checkPassMatchEmail(passwordInput, accountWithEmail);
  displayError(emailExist, emailPassMatch);
  // const currentUser = setCurrentUser(emailPassMatch, emailInput);
  diplayBanking(emailPassMatch, accountWithEmail);
  //
};

btnLogin.addEventListener("click", checkVaildLogin);

// Logout button
logoutBtn.addEventListener("click", function () {
  loginModal.classList.toggle("hidden");
  bankingUI.classList.toggle("hidden");
  welcomeMessage.textContent = "Hi there,";
  movementsContainer.innerHTML = "";
  totalBalance.textContent = "";
});

sortBtn.addEventListener("click", function () {
  if (sort) {
    sortBtn.innerHTML = "&#x2193; SORT";
  } else {
    sortBtn.innerHTML = "&uarr; SORT";
  }
  sort = !sort;

  displayMovments(currentUser, sort);
});

//Open transfer money btn
openTransferBtn.addEventListener("click", function (e) {
  //ADD
  transferModal.classList.toggle("hidden");
});

//closeModalBtn to clos all the options modal
for (const btn of closeModalBtn) {
  //ADD
  btn.addEventListener("click", function (e) {
    requestModal.classList.add("hidden");
    transferModal.classList.add("hidden");
  });
}

//The transfer money button
transferBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const inputtedName = toAccountInput.value;
  const inputtedAmount = amountTransfer.value;
  const validName =
    accounts.find((acc) => acc.name === inputtedName) &&
    currentUser &&
    currentUser?.name != inputtedName;

  const validAmount =
    inputtedAmount > 0 &&
    inputtedAmount <=
      currentUser.movements
        .map((mov) => mov)
        .reduce((acc, mov) => acc + mov, 0);

  if (validName && validAmount) {
    currentUser.movements.push(Number(-inputtedAmount));
    accounts
      .find((acc) => acc.name === inputtedName)
      .movements.push(Number(inputtedAmount));
    console.log(currentUser.movements);
    diplayBanking(true, currentUser, false);
  } else {
    alert("Invalid transfer!");
  }
});

//Request money opening button
requestMoneyBtn.addEventListener("click", function (e) {
  e.preventDefault();
  // requestModal.classList.toggle("hidden");
  requestModal.classList.toggle("hidden");
});

//Request money submission
requestMoneySubmit.addEventListener("click", function (e) {
  e.preventDefault();
  requestModal.classList.toggle("hidden");
});
