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
  <div class="user-data user-${userCount}-data">
  <div class="user-summary">
    <div class="user-details">
      <div class="user-name user-${userCount}-name">${friendName}</div>
      <div class="user-balance user-${userCount}-balance"></div>
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
      expense: [],
      userBalance: 0
    };
    balanceSheet = [...balanceSheet, user];
  };

  const addNewFriend = (e, friend) => {
    let friendName = formatInput(friend.value);
    closeModal(e);
    loadUserToSheet(friendName);
    populateUserDetails(friendName);
  };

  const updateUserBalance = (payer, share, index) => {
    payer === "You"
      ? (balanceSheet[index].userBalance -= share)
      : (balanceSheet[index].userBalance += share);
    let modBalance = Math.abs(balanceSheet[index].userBalance);
    let balanceToUi = document.querySelector(`.user-${index + 1}-balance`);
    balanceSheet[index].userBalance > 0
      ? (balanceToUi.innerHTML = `You owe ${modBalance}`)
      : (balanceToUi.innerHTML = `owes you ${modBalance}`);
  };

  const loadExpenseToSheet = (name, amt, payer, index, share) => {
    let newExpense = {
      type: name,
      paidAmount: amt,
      paidBy: payer
    };
    balanceSheet[index].expense.push(newExpense);
    updateUserBalance(payer, share, index);
  };

  const resetExpenseForm = () => {
    expenseName.value = "";
    expenseAmount.value = "";
    expensePartner.innerHTML = `<option value="">-Choose a friend-</option>`;
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
    let perPersonShare = expenseAmountValue / 2;
    let indexOfPartner = balanceSheet.findIndex(
      elem => elem.userName === expensePartnerValue
    );
    closeModal(e);
    resetExpenseForm();
    loadExpenseToSheet(
      expenseNameValue,
      expenseAmountValue,
      payer,
      indexOfPartner,
      perPersonShare
    );
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
    ],
    userBalance: -56
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
