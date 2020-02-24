import "./styles.css";

const createGoDutchApp = function() {
  const newTripBtn = document.querySelector("#new-event-button");
  const newTripModal = document.querySelector("#new-event-modal");
  newTripModal.style.display = "none";
  const closeModalBtn = document.querySelector("#close-modal");
  const addTripForm = document.querySelector("#event-details-form");
  const addTravellerBtn = document.querySelector("#add-users");
  const travellerDetails = document.querySelector("#user-details");
  const addTripBtn = document.querySelector("#add-event");
  const travelerNameInput = document.querySelectorAll(".user-name");

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

  const addTrip = () => {
    let travellersNameArray = [];
    travelerNameInput.forEach(elem => travellersNameArray.push(elem.value));
    console.log(travellersNameArray);
    toggleModal();
  };

  addTripForm.addEventListener("submit", e => {
    e.preventDefault();
    addTrip();
  });
  newTripBtn.addEventListener("click", toggleModal);
  closeModalBtn.addEventListener("click", toggleModal);
  addTravellerBtn.addEventListener("click", addTraveller);
};

const GoDutchApp = new createGoDutchApp();

const demoState = [
  {
    eventName: "Trip to New York",
    users: [
      { id: 0, name: "Will", userTotalExpenses: 0, amountUserOwes: 0 },
      { id: 1, name: "Mike", userTotalExpenses: 0, amountUserOwes: 0 }
    ],
    expenses: []
  }
];
