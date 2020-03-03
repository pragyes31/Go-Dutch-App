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
  const selectPayer = document.querySelector("#select-payer");
  let isModalOpen = false;
  let userCount = 1;
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
    console.log(isFriendModalOpen);
    console.log(e.target);
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
    selectPayer.innerHTML += `<option value="${friendName}">${friendName}</option>`;
    friendInput.value = "";
    userCount++;
  };

  const loadUserToSheet = friendName => {
    let user = {
      userName: friendName,
      userId: `${userCount}`
    };
    balanceSheet = [...balanceSheet, user];
  };

  const addNewFriend = (e, friendName) => {
    closeModal(e);
    loadUserToSheet(friendName);
    populateUserDetails(friendName);
  };

  const addNewExpense = e => {
    console.log("boom");
    closeModal(e);
  };

  addNewBtns.forEach(btn => btn.addEventListener("click", openModal));
  closeModalBtns.forEach(btn => btn.addEventListener("click", closeModal));
  addFriendForm.addEventListener("submit", e => {
    e.preventDefault();
    addNewFriend(e, friendInput.value);
  });
  addExpenseForm.addEventListener("submit", e => {
    e.preventDefault();
    addNewExpense(e);
  });
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
