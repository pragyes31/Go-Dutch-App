import "./styles.scss";

const createGoDutchApp = function() {
  const addNewModal = document.querySelectorAll(".modal-window");
  const addNewBtns = document.querySelectorAll(".add-new-btn");
  const addexpenseModal = document.querySelector(".add-expense-modal");
  const addFriendModal = document.querySelector(".add-friend-modal");
  const closeModalBtns = document.querySelectorAll(".close-modal");
  let isModalOpen = false;
  const toggleModal = e => {
    if (!isModalOpen) {
      let isExpenseBtnClicked = e.target.classList.contains("add-expense-btn");
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

  addNewBtns.forEach(btn => btn.addEventListener("click", toggleModal));
  closeModalBtns.forEach(btn => btn.addEventListener("click", closeModal));
};

const goDutchApp = new createGoDutchApp();
