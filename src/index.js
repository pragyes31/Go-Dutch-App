import "./styles.scss";

const createGoDutchApp = function() {
  let balanceSheet = [];
  const addNewBtns = document.querySelectorAll(".add-new-btn");
  const addexpenseModal = document.querySelector(".add-expense-modal");
  const addFriendModal = document.querySelector(".add-friend-modal");
  const closeModalBtns = document.querySelectorAll(".close-modal");
  const addFriendForm = document.querySelector(".add-friend-form");
  const addExpenseForm = document.querySelector(".add-expense-form");
  const usersData = document.querySelector(".users-data");
  const friendInput = document.querySelector("#friend-name");
  const expenseAmount = document.querySelector("#expense-amount");
  const expensePartner = document.querySelector("#expense-partner");
  const payer = document.querySelector("#payer");
  const expenseName = document.querySelector("#expense-name");
  let isModalOpen = false;
  let userCount = 1;
  const formatInput = input => {
    let newInput = input.trim();
    return newInput.charAt(0).toUpperCase() + newInput.slice(1);
  };
  const openModal = e => {
    if (!isModalOpen) {
      let isFriendModalOpen = e.target.classList.contains("add-friend-btn");
      isFriendModalOpen
        ? addFriendModal.classList.add("open-modal")
        : addexpenseModal.classList.add("open-modal");
      isModalOpen = !isModalOpen;
    }
  };
  const closeModal = e => {
    let isFriendModalOpen =
      e.target.classList.contains("add-friend-form") ||
      e.target.parentNode.classList.contains("add-friend-form");
    isFriendModalOpen
      ? addFriendModal.classList.remove("open-modal")
      : addexpenseModal.classList.remove("open-modal");
    isModalOpen = !isModalOpen;
  };

  const populateUserDetails = friendName => {
    const userDataMarkup = `
  <div class="user-data user-${userCount}">
  <div class="user-summary">
    <div class="user-details">
      <div class="user-name user-${userCount}">${friendName}</div>
      <div class="user-balance user-${userCount}"></div>
    </div>
    <div class="accordion-logo">
      <img
        src="/src/plus-new.png"
        alt="plus"
        width="25"
        height="25"
      />
    </div>
  </div>
  <div class="user-balance-sheet"></div>
</div>`;
    usersData.innerHTML += userDataMarkup;
    expensePartner.innerHTML += `<option value="${friendName}">${friendName}</option>`;
    friendInput.value = "";
    userCount++;
  };

  const loadUserToSheet = friendName => {
    let user = {
      userName: friendName,
      userId: `${userCount}`,
      expense: []
    };
    balanceSheet = [...balanceSheet, user];
  };

  const addNewFriend = (e, friend) => {
    let friendName = formatInput(friend.value);
    closeModal(e);
    loadUserToSheet(friendName);
    populateUserDetails(friendName);
  };

  const loadExpenseToSheet = (
    expenseName,
    expenseAmount,
    payer,
    indexOfPartner
  ) => {
    let newExpense = {
      type: expenseName,
      paidAmount: expenseAmount,
      paidBy: payer
    };
    balanceSheet[indexOfPartner].expense.push(newExpense);
  };

  const addNewExpense = (
    e,
    expenseAmount,
    expenseName,
    expensePartner,
    paidBy
  ) => {
    let expenseAmountValue = expenseAmount.value;
    let expenseNameValue = formatInput(expenseName.value);
    let expensePartnerValue = expensePartner.value;
    let payer = paidBy.value;
    let indexOfPartner = balanceSheet.findIndex(
      elem => elem.userName === expensePartnerValue
    );
    closeModal(e);
    loadExpenseToSheet(
      expenseNameValue,
      expenseAmountValue,
      payer,
      indexOfPartner
    );
    console.log(balanceSheet);
  };

  const addToPaidByList = e => {
    let selectedPartner = e.target.value;
    let paidByMarkup = `
    <option value="">--</option>
    <option value="You">You</option>
    <option value=${selectedPartner}>${selectedPartner}</option>
    `;
    payer.innerHTML = paidByMarkup;
  };

  addNewBtns.forEach(btn => btn.addEventListener("click", openModal));
  closeModalBtns.forEach(btn => btn.addEventListener("click", closeModal));
  addFriendForm.addEventListener("submit", e => {
    e.preventDefault();
    addNewFriend(e, friendInput);
  });
  addExpenseForm.addEventListener("submit", e => {
    e.preventDefault();
    addNewExpense(e, expenseAmount, expenseName, expensePartner, payer);
  });
  expensePartner.addEventListener("change", addToPaidByList);
};

const goDutchApp = new createGoDutchApp();

const demoState = [
  {
    userName: "Will",
    userId: "user-01",
    expenses: [
      {
        type: "flights",
        paidAmount: 500,
        paidBy: "Will"
      }
    ]
  },
  {
    userName: "Eleven",
    userId: "user-02",
    expenses: [
      {
        type: "Movie tickets",
        paidAmount: 100,
        paidBy: "Rahul"
      }
    ]
  }
];
