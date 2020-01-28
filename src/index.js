import "./styles.css";

const createGoDutchApp = function() {
  const newTripBtn = document.querySelector("#new-trip-button");
  const newTripModal = document.querySelector("#new-trip-modal");
  newTripModal.style.display = "none";
  const closeModalBtn = document.querySelector("#close-modal");
  const toggleModal = function() {
    console.log(newTripModal.style.display);
    if (newTripModal.style.display === "none") {
      newTripModal.style.display = "block";
    } else {
      newTripModal.style.display = "none";
    }
  };
  newTripBtn.addEventListener("click", toggleModal);
  closeModalBtn.addEventListener("click", toggleModal);
};

const GoDutchApp = new createGoDutchApp();
