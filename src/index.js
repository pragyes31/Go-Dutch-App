import "./styles.scss";

const createGoDutchApp = function() {
  const addNewBtns = document.querySelectorAll(".add-new-btn");
  const addexpenseModal = document.querySelector(".add-expense-modal");
  const addFriendModal = document.querySelector(".add-friend-modal");
  const closeModalBtns = document.querySelectorAll(".close-modal");
  const addFriendForm = document.querySelector(".add-friend-form");
  let isModalOpen = false;
  let userCount = 0;
  const toggleModal = e => {
    if (!isModalOpen) {
      console.log(e.target.parentNode.classList);
      // for(key in e.target.classList) {
      //   if(e.target.classList[key].indexOf("friend")===-1) {
      //     let isFriendBtnClicked =
      //   }
      // }
      let isExpenseBtnClicked = e.target.classList.contains(
        "add-expense-btn" || "expense-btn"
      );
      isExpenseBtnClicked
        ? addexpenseModal.classList.add("open-modal")
        : addFriendModal.classList.add("open-modal");
      isModalOpen = !isModalOpen;
    }
  };
  const closeModal = e => {
    let isCancelExpenseBtnClicked = e.target.classList.contains(
      "close-expense-modal"
    );
    isCancelExpenseBtnClicked
      ? addexpenseModal.classList.remove("open-modal")
      : addFriendModal.classList.remove("open-modal");
    isModalOpen = !isModalOpen;
  };

  const addNewFriend = e => {
    closeModal(e);
  };

  addNewBtns.forEach(btn => btn.addEventListener("click", toggleModal));
  closeModalBtns.forEach(btn => btn.addEventListener("click", closeModal));
  addFriendForm.addEventListener("submit", e => {
    e.preventDefault();
    addNewFriend(e);
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
