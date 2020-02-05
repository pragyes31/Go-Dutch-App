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

const demoState = [
  {
    tripName: "Trip to New York",
    travellers: [
      { id: 0, name: "Will", totalExpensesShare: 270, outstandingAmount: 0 },
      { id: 1, name: "Mike", totalExpensesShare: 0, outstandingAmount: 0 }
    ],
    expenses: [
      {
        expnese: "Flights",
        whoPaid: "Mike",
        howMuch: 270
      }
    ]
  }
];

let totalExpenses = demoState[0].expenses.reduce(
  (acc, cur) => acc.howMuch + cur.howMuch
);
console.log(totalExpenses);
let perPersonExpenses = totalExpenses / 2;
//console.log(totalExpenses, perPersonExpenses);
const handleOutstanding = () => {
  demoState[0].travellers.forEach(traveler => {
    traveler.outstandingAmount =
      perPersonExpenses - traveler.totalExpensesShare;
  });
  //console.log(demoState[0].travellers);
};
const splitExpenses = () => {};
handleOutstanding();
/*
{
    tripName: "Trip to StarCourt mall",
    travellers: [
      { id: 1, name: "Will" },
      { id: 2, name: "Mike" },
      { id: 3, name: "Lucas" },
      { id: 4, name: "Dustin" },
      { id: 5, name: "Eleven" },
      { id: 6, name: "Max" }
    ],

    expenses: [
      {
        expnese: "Movies",
        whoPaid: "Max",
        forWhom: ["Will", "Mike", "Lucas", "Dustin", "Eleven", "Max"],
        howMuch: 30
      },
      {
        expnese: "Popcorn",
        whoPaid: "Dustin",
        forWhom: ["Lucas", "Dustin", "Eleven", "Max"],
        howMuch: 5
      }
    ]
  }
*/
