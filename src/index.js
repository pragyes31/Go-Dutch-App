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
      { id: 1, name: "Mike", userTotalExpenses: 0, amountUserOwes: 0 },
      { id: 2, name: "Eleven", userTotalExpenses: 0, amountUserOwes: 0 },
      { id: 3, name: "Dustin", userTotalExpenses: 450, amountUserOwes: 0 }
    ],
    expenses: [
      {
        expneseName: "Flights",
        whoPaid: "Mike",
        howMuch: 270
      },
      {
        expneseName: "Flights",
        whoPaid: "Dustin",
        howMuch: 450
      }
    ]
  }
];

// use condition later on to check whether there are one or more expenses.
// Do not use reduce in below function if just one expense.
let totalExpenses = demoState[0].expenses.reduce(
  (acc, cur) => acc + cur.howMuch,
  0
);
let perPersonExpense = totalExpenses / demoState[0].users.length;
const perPersonDebt = () => {
  demoState[0].users.forEach(traveler => {
    traveler.amountUserOwes = perPersonExpense - traveler.userTotalExpenses;
  });
};
perPersonDebt();

//console.table(demoState[0].users)

let isAmountUserOwesZero = () => {
  return demoState[0].users.every(user => user.amountUserOwes === 0);
};
console.log(isAmountUserOwesZero());
let highestDebtAmountFn = () =>
  demoState[0].users.reduce(
    (a, b) => (a > b.amountUserOwes ? a : b.amountUserOwes),
    0
  );

let highestLenderAmtFn = () =>
  demoState[0].users.reduce(
    (a, b) => (a < b.amountUserOwes ? a : b.amountUserOwes),
    0
  );
console.log(highestLenderAmtFn());
let getHighestDebtObjFn = () => {
  return demoState[0].users.find(elem => elem.amountUserOwes === highestDebt);
};
let gethighestLenderObjFn = () => {
  return demoState[0].users.find(
    elem => elem.amountUserOwes === highestLenderAmt
  );
};

let highestDebt = highestDebtAmountFn();
let highestLenderAmt = highestLenderAmtFn();
let highestDebtObj = getHighestDebtObjFn();
let highestLenderObj = gethighestLenderObjFn();
//console.log(highestDebt);
const splitExpenses = () => {
  while (!isAmountUserOwesZero()) {
    if (Math.abs(highestDebt) <= Math.abs(highestLenderAmt)) {
      highestLenderObj.amountUserOwes += highestDebt; // 150
      highestDebtObj.amountUserOwes = 0;
      // print "highestDebtObj" owes "highestLenderObj" Math.abs(highestDebt)
      console.log(
        `${highestDebtObj.name} owes ${highestLenderObj.name} ${Math.abs(
          highestDebt
        )}`
      );
      highestLenderAmt += highestDebt; //-100
      highestDebt = highestDebtAmountFn();
      highestDebtObj = getHighestDebtObjFn();
    } else {
      highestDebtObj.amountUserOwes += highestLenderObj.amountUserOwes; //
      highestLenderObj.amountUserOwes = 0;
      // print "highestDebtObj" owes "highestLenderObj" "highestLenderAmt" amount
      console.log(
        `${highestDebtObj.name} owes ${
          highestLenderObj.name
        } ${highestLenderAmt}`
      );
      highestDebt += highestLenderAmt; // -50
      highestLenderAmt = highestLenderAmtFn(); // 200
      highestLenderObj = gethighestLenderObjFn();
    }
  }
};
splitExpenses();
