import "./styles.css";

const createGoDutchApp = function() {
  const newTripBtn = document.querySelector("#new-trip-button");
  const newTripModal = document.querySelector("#new-trip-modal");
  //newTripModal.style.display = "none";
  const closeModalBtn = document.querySelector("#close-modal");
  let isModalOpen = false;
  const toggleModal = function() {
    console.log("boom");
    isModalOpen
      ? (newTripModal.style.display = "none")
      : (newTripModal.style.display = "block");
    newTripBtn.disabled = !isModalOpen;
    isModalOpen = !isModalOpen;
  };
  const closeModal = function(e) {
    if (!e.target.matches("#new-trip-modal, #new-trip-button") && isModalOpen)
      toggleModal();
  };
  newTripBtn.addEventListener("click", toggleModal);
  closeModalBtn.addEventListener("click", toggleModal);
  //document.addEventListener("click", closeModal);
};

const GoDutchApp = new createGoDutchApp();
