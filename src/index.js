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

// use condition later on to whether there are one or more expenses.
// Do not use reduce in below function if just one expense.
let totalExpenses = demoState[0].expenses.reduce(
  (acc, cur) => acc.howMuch + cur.howMuch
).howMuch;

let perPersonExpenses = totalExpenses / demoState[0].travellers.length;

const handleOutstanding = () => {
  demoState[0].travellers.forEach(traveler => {
    traveler.outstandingAmount =
      perPersonExpenses - traveler.totalExpensesShare;
  });
};

const sortByOutstanding = () => {
  demoState[0].travellers.sort(
    (a, b) => b.outstandingAmount - a.outstandingAmount
  );
};
handleOutstanding();
sortByOutstanding();
const splitExpenses = () => {
  let highestOutstanding = demoState[0].travellers.reduce((a, b) =>
    Math.max(a.outstandingAmount, b.outstandingAmount)
  );
  let highestObj = demoState[0].travellers.find(elem => {
    return elem.outstandingAmount === highestOutstanding;
  });

  let lowestOutstanding = demoState[0].travellers.reduce((a, b) =>
    Math.min(a.outstandingAmount, b.outstandingAmount)
  );
  let lowestObj = demoState[0].travellers.find(
    elem => elem.outstandingAmount === lowestOutstanding
  );
console.log(lowestObj, highestObj)
 /* if (Math.abs(highestOutstanding) <= Math.abs(lowestOutstanding) ) {
    lowestObj.outstandingAmount = lowestObj.outstandingAmount + highestOutstanding;
   highestObj.outstandingAmount = 0;
  }
  else {

  }
  */
};
splitExpenses();

/*
A: 135 B -230

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
