import "./styles.css";

const createGoDutchApp = function() {
  const newTripBtn = document.querySelector("#new-trip-button");
  const newTripModal = document.querySelector("#new-trip-modal");
  newTripModal.style.display = "none";
  const closeModalBtn = document.querySelector("#close-modal");
  const addTravellerBtn = document.querySelector("#add-travellers");
  const travellerDetails = document.querySelector("#traveller-details");
  const addTripBtn = document.querySelector("#add-trip");
  let isModalOpen = false;

  const toggleModal = function() {
    travellerDetails.innerHTML = "";
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

    travellerName.className += "traveller-name";
    travellerName.placeholder = "Add traveller's name";

    travellerDetails.appendChild(breakLine);
    labelElem.innerHTML = "Traveller's name: ";
    travellerDetails.appendChild(labelElem);
    travellerDetails.appendChild(travellerName);
  };

  newTripBtn.addEventListener("click", toggleModal);
  closeModalBtn.addEventListener("click", toggleModal);
  addTravellerBtn.addEventListener("click", addTraveller);
};

const addTrip = function() {};

const GoDutchApp = new createGoDutchApp();

// const closeModal = function(e) {
//   if (!e.target.matches("#new-trip-modal, #new-trip-button") && isModalOpen)
//     toggleModal();
// };
