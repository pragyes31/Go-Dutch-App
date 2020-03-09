import "./styles.scss";
import $ from "jquery";

const createGoDutchApp = function() {
  let balanceSheet = [];
  const usersData = document.querySelector(".users-data");
  const friendInput = document.querySelector("#friend-name");
  const expenseAmount = document.querySelector("#expense-amount");
  const expensePartner = document.querySelector("#expense-partner");
  const payer = document.querySelector("#payer");
  const expenseName = document.querySelector("#expense-name");
  let isModalOpen = false;
  let userCount = 0;
  const formatInput = input => {
    let newInput = input.trim();
    return newInput.charAt(0).toUpperCase() + newInput.slice(1);
  };
  const openModal = e => {
    if (!isModalOpen) {
      console.log(e.target);
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
  <div class="user-balance-sheet user-${userCount}-expenses-list"></div>
</div>`;

    usersData.innerHTML += userDataMarkup;
    expensePartner.innerHTML += `<option value="${friendName}">${friendName}</option>`;
    friendInput.value = "";
    userCount++;
    $(".user-data:last-child").on("click", toggleExpenseList);
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
    let balanceToUi = $(`.user-${index}-balance`);
    balanceSheet[index].userBalance > 0
      ? balanceToUi.text(`You owe ${modBalance}`)
      : balanceToUi.text(`owes you ${modBalance}`);
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
    let selectedPartner = $(e.target).val();
    let paidByMarkup = `
    <option value="">--</option>
    <option value="You">You</option>
    <option value=${selectedPartner}>${selectedPartner}</option>
    `;
    payer.innerHTML = paidByMarkup;
  };

  const toggleExpenseList = e => {
    console.log(e.currentTarget.classList);
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
