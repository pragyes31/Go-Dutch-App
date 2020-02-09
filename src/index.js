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

const demoState = [
  {
    eventName: "Trip to New York",
    users: [
      { id: 0, name: "Will", userTotalExpenses: 270, amountUserOwes: 0 },
      { id: 1, name: "Mike", userTotalExpenses: 0, amountUserOwes: 0 }
    ],
    expenses: [
      {
        expneseName: "Flights",
        whoPaid: "Mike",
        howMuch: 270
      }
    ]
  }
];

// use condition later on to check whether there are one or more expenses.
// Do not use reduce in below function if just one expense.
let totalExpenses = demoState[0].expenses.reduce(
  (acc, cur) => acc.howMuch + cur.howMuch
).howMuch;

let perPersonExpense = totalExpenses / demoState[0].users.length;

const perPersonDebt = () => {
  demoState[0].users.forEach(traveler => {
    traveler.amountUserOwes = perPersonExpense - traveler.userTotalExpenses;
  });
};

perPersonDebt();

let highestDebtAmount = () =>
  demoState[0].users.reduce((a, b) =>
    Math.max(a.amountUserOwes, b.amountUserOwes)
  );

let lowestDebtAmount = () =>
  demoState[0].users.reduce((a, b) =>
    Math.min(a.amountUserOwes, b.amountUserOwes)
  );

const splitExpenses = () => {
  let highestDebt = highestDebtAmount();
  let lowestDebt = lowestDebtAmount();
  let highestDebtObj = demoState[0].users.find(elem => {
    return elem.amountUserOwes === highestDebtAmount;
  });

  let lowestDebtObj = demoState[0].users.find(
    elem => elem.amountUserOwes === lowestDebtAmount
  );
  /* if (Math.abs(highestDebt) <= Math.abs(lowestDebt) ) {
    lowestObj.amountUserOwes = lowestObj.amountUserOwes + highestDebt;
   highestDebtObj.amountUserOwes = 0;
  }
  else {
}

  }
  */
};
splitExpenses();
