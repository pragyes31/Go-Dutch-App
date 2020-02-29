import "./styles.scss";

const createGoDutchApp = function() {
  const addNewModal = document.querySelectorAll(".modal-window");

  const addFriendBtn = document.querySelector(".add-friend-btn");
  const closeModalBtn = document.querySelectorAll(".close-modal");
  let isModalOpen = false;
  const toggleModal = () => {
    if (!isModalOpen) {
      addNewModal.style.display = "block";
      isModalOpen = !isModalOpen;
    }
  };
  const closeModal = () => {
    addNewModal.style.display = "block";
    isModalOpen = !isModalOpen;
  };

  addFriendBtn.addEventListener("click", toggleModal);
  closeModalBtn.forEach(btn => btn.addEventListener("click", closeModal));
};

const goDutchApp = new createGoDutchApp();
