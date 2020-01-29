import "./styles.css";

const createGoDutchApp = function() {
  const newTripBtn = document.querySelector("#new-trip-button");
  const newTripModal = document.querySelector("#new-trip-modal");
  //newTripModal.style.display = "none";
  const closeModalBtn = document.querySelector("#close-modal");
  const addTravellerBtn = document.querySelector("#add-travellers");
  const tripDetailsForm = document.querySelector("#trip-details-form");
  const travellerDetails = document.querySelector("#traveller-details");
  let isModalOpen = false;
  const toggleModal = function() {
    console.log("boom");
    isModalOpen
      ? (newTripModal.style.display = "none")
      : (newTripModal.style.display = "block");
    newTripBtn.disabled = !isModalOpen;
    isModalOpen = !isModalOpen;
  };
  const addTraveller = function(e) {
    e.preventDefault();
    let labelElem = document.createElement("label");
    let travellerName = document.createElement("input");
    let breakLine = document.createElement("br");
    travellerDetails.appendChild(breakLine);
    labelElem.innerHTML = "Traveller's name:";
    travellerDetails.appendChild(labelElem);
    travellerDetails.appendChild(travellerName);
  };

  // const closeModal = function(e) {
  //   if (!e.target.matches("#new-trip-modal, #new-trip-button") && isModalOpen)
  //     toggleModal();
  // };

  newTripBtn.addEventListener("click", toggleModal);
  closeModalBtn.addEventListener("click", toggleModal);
  addTravellerBtn.addEventListener("click", addTraveller);
  //document.addEventListener("click", closeModal);
};

const GoDutchApp = new createGoDutchApp();
