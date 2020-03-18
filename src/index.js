import "./styles.scss";
import $ from "jquery";

const createGoDutchApp = function() {
  const usersData = document.querySelector(".users-data");
  const friendInput = document.querySelector("#friend-name");
  const expenseAmount = document.querySelector("#expense-amount");
  const expensePartner = document.querySelector("#expense-partner");
  const payer = document.querySelector("#payer");
  const expenseName = document.querySelector("#expense-name");
  let allUsers = [
    {
      userName: "You",
      userId: "user-0",
      userBalance: 0
    }
  ];
  let allExpenses = [];
  let isModalOpen = false;
  let userCount = 0;
  let expenseCount = 1;
  const formatInput = input => {
    let newInput = input.trim();
    return newInput.charAt(0).toUpperCase() + newInput.slice(1);
  };
  const openModal = e => {
    if (!isModalOpen) {
      let isFriendModalOpen = $(e.target).hasClass("add-friend-btn");
      isFriendModalOpen
        ? $(".add-friend-modal").show()
        : $(".add-expense-modal").show();
      isModalOpen = !isModalOpen;
    }
  };
  const closeModal = e => {
    let isFriendModalOpen =
      $(e.target).hasClass("add-friend-form") ||
      $(e.target.parentNode).hasClass("add-friend-form");
    isFriendModalOpen
      ? $(".add-friend-modal").hide()
      : $(".add-expense-modal").hide();
    isModalOpen = !isModalOpen;
  };

  const populateUserDetails = friendName => {
    const userDataMarkup = `
  <div class="user-data user-${userCount}-data">
  <div class="user-summary">
    <div class="user-details">
      <div class="user-name user-${userCount}">${friendName}</div>
      <div class="user-balance user-${userCount}-balance"></div>
    </div>
    </div>
  <div class="user-balance-sheet user-${userCount}-expenses-list"></div>
</div>`;

    usersData.innerHTML += userDataMarkup;
    expensePartner.innerHTML += `<option value="${friendName}">${friendName}</option>`;
    friendInput.value = "";
    $(".user-data:last-child").on("click", toggleExpenseList);
  };

  const loadUserToSheet = friendName => {
    userCount++;
    let user = {
      userName: friendName,
      userId: `user-${userCount}`,
      userBalance: 0
    };
    allUsers = [...allUsers, user];
  };

  const addNewFriend = (e, friend) => {
    let friendName = formatInput(friend.value);
    loadUserToSheet(friendName);
    populateUserDetails(friendName);
    closeModal(e);
  };

  const updateUserBalance = (share, indexOfPartner, indexOfPayer) => {
    indexOfPartner === indexOfPayer
      ? (allUsers[indexOfPartner].userBalance += share)
      : (allUsers[indexOfPartner].userBalance -= share);
    let modBalance = Math.abs(allUsers[indexOfPartner].userBalance);
    let balanceToUi = $(`.user-${indexOfPartner}-balance`);
    allUsers[indexOfPartner].userBalance > 0
      ? balanceToUi.text(`You owe ${modBalance}`)
      : balanceToUi.text(`owes you ${modBalance}`);
  };

  const addExpenseToUi = (expenseObj, indexOfPayer, indexOfPartner) => {
    console.log(expenseObj, indexOfPayer, indexOfPartner);
    let payerObj = allUsers.filter(
      user => user.userId === `user-${indexOfPayer}`
    );
    console.log(payerObj);
    //     let expenseToAdd = `
    // <div class="expense-${expenseCount} expense-item">
    // <div class="expense-detail">
    //   ${payerObj[0].userName} paid ${expenseObj.paidAmount} for ${expenseObj.type}
    // </div>
    // <div class="modify-expense">
    //   <div class="edit-expense">Edit</div>
    //   <div class="delete-expense">Delete</div>
    // </div>
    // </div>`;
    //     $(`.user-${indexOfPartner}-expenses-list`).append(expenseToAdd);
  };

  const loadExpenseToSheet = (
    name,
    amt,
    indexOfPartner,
    indexOfPayer,
    share
  ) => {
    let newExpense = {
      type: name,
      paidAmount: amt,
      paidBy: `user-${indexOfPayer}`,
      expenseId: `expense-${expenseCount}`
    };
    //console.log(newExpense);
    allExpenses = [...allExpenses, newExpense];
    addExpenseToUi(newExpense, indexOfPayer, indexOfPartner);
    updateUserBalance(share, indexOfPartner, indexOfPayer);
    expenseCount++;
  };

  const resetExpenseForm = () => {
    expenseName.value = "";
    expenseAmount.value = "";
    expensePartner[0].setAttribute("selected", true);
    payer.innerHTML = "";
  };

  const addNewExpense = (
    e,
    expenseAmount,
    expenseName,
    expensePartner,
    paidBy
  ) => {
    let expenseNameValue = formatInput(expenseName.value);
    let amount = expenseAmount.value;
    let partner = expensePartner.value;
    let payer = paidBy.value;
    let perPersonShare = amount / 2;
    let indexOfPartner = allUsers.findIndex(elem => elem.userName === partner);
    let indexOfPayer = allUsers.findIndex(elem => elem.userName === payer);
    closeModal(e);
    resetExpenseForm();
    loadExpenseToSheet(
      expenseNameValue,
      amount,
      indexOfPartner,
      indexOfPayer,
      perPersonShare
    );
  };

  const addToPaidByList = e => {
    let selectedPartner = $(e.target).val();
    let paidByMarkup = `
    <option value="">--</option>
    <option value="You">You</option>
    <option value=${selectedPartner}>${selectedPartner}</option>
    `;
    payer.innerHTML = paidByMarkup;
  };

  const toggleExpenseList = e => {
    let expenseList = $(e.currentTarget)
      .children()
      .last();
    expenseList.toggle(400);
  };

  $(".add-new-btn").on("click", openModal);
  $(".close-modal").on("click", closeModal);
  $(".add-friend-form").on("submit", e => {
    e.preventDefault();
    addNewFriend(e, friendInput);
  });
  $(".add-expense-form").on("submit", e => {
    e.preventDefault();
    addNewExpense(e, expenseAmount, expenseName, expensePartner, payer);
  });
  $("#expense-partner").on("change", addToPaidByList);
};

const goDutchApp = new createGoDutchApp();

const demoAllUsers = [
  [
    {
      userName: "You",
      userId: "user-0",
      userBalance: 0
    },
    {
      userName: "Bill",
      userId: "user-02",
      userBalance: 0
    },
    {
      userName: "Eleven",
      userId: "user-3",
      userBalance: 0
    }
  ]
];

const demoAllExpenses = [
  {
    type: "Movie tickets",
    paidAmount: 100,
    paidBy: "Rahul"
  },
  {
    type: "flights",
    paidAmount: 500,
    paidBy: "Will"
  }
];
