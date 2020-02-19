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
      { id: 0, name: "Will", userTotalExpenses: 0, amountUserOwes: 0 },
      { id: 1, name: "Mike", userTotalExpenses: 0, amountUserOwes: 0 },
      { id: 2, name: "Eleven", userTotalExpenses: 0, amountUserOwes: 0 },
      { id: 3, name: "Dustin", userTotalExpenses: 0, amountUserOwes: 0 },
      { id: 4, name: "Max", userTotalExpenses: 0, amountUserOwes: 0 }
    ],
    expenses: [
      {
        expneseName: "Flights",
        whoPaid: "Will",
        howMuch: 1000,
        id: 0
      },
      {
        expneseName: "Hotels",
        whoPaid: "Max",
        howMuch: 2000,
        id: 4
      },
      {
        expneseName: "Food",
        whoPaid: "Dustin",
        howMuch: 1000,
        id: 3
      },
      {
        expneseName: "Food",
        whoPaid: "Dustin",
        howMuch: 1000,
        id: 3
      }
    ]
  }
];

const populateExpenses = () => {
  demoState[0].expenses.forEach(
    exp => (demoState[0].users[exp.id].userTotalExpenses += exp.howMuch)
  );
};
populateExpenses();

let totalExpenses = demoState[0].expenses.reduce(
  (acc, cur) => acc + cur.howMuch,
  0
);
console.log(totalExpenses);
let perPersonExpense = totalExpenses / demoState[0].users.length;
console.log("perPersonExpense", perPersonExpense);

const perPersonDebt = () => {
  for (let i = 0; i < demoState[0].users.length; i++) {
    demoState[0].users[i].amountUserOwes =
      perPersonExpense - demoState[0].users[i].userTotalExpenses;
  }
};

perPersonDebt();
console.table(demoState[0].users);

const sortByhighestDebt = () => {
  demoState[0].users.sort((a, b) => a.amountUserOwes - b.amountUserOwes);
};

console.table(demoState[0].users);

sortByhighestDebt();

let isAmountUserOwesZero = () => {
  return demoState[0].users.every(user => user.amountUserOwes === 0);
};
let highestDebtAmountFn = () =>
  demoState[0].users.reduce(
    (a, b) => (a >= b.amountUserOwes ? a : b.amountUserOwes),
    0
  );

let highestLenderAmtFn = () =>
  demoState[0].users.reduce(
    (a, b) => (a <= b.amountUserOwes ? a : b.amountUserOwes),
    0
  );
let getHighestDebtObjFn = () => {
  return demoState[0].users.find(elem => elem.amountUserOwes === highestDebt);
};
let gethighestLenderObjFn = () => {
  return demoState[0].users.find(
    elem => elem.amountUserOwes === highestLenderAmt
  );
};

let highestDebt = highestDebtAmountFn(); // 600
let highestLenderAmt = highestLenderAmtFn(); // -1400
let highestDebtObj = getHighestDebtObjFn();
let highestLenderObj = gethighestLenderObjFn();
const splitExpenses = () => {
  console.log(demoState);
  while (!isAmountUserOwesZero()) {
    if (Math.abs(highestDebt) < Math.abs(highestLenderAmt)) {
      highestLenderObj.amountUserOwes += highestDebt; //
      highestDebtObj.amountUserOwes = 0;
      // print "highestDebtObj" owes "highestLenderObj" Math.abs(highestDebt)
      console.log(
        `${highestDebtObj.name} owes ${highestLenderObj.name} ${Math.abs(
          highestDebt
        )}`
      );
      highestLenderAmt += highestDebt;
      highestDebt = highestDebtAmountFn();
      highestDebtObj = getHighestDebtObjFn();
    } else if (Math.abs(highestDebt) > Math.abs(highestLenderAmt)) {
      highestDebtObj.amountUserOwes += highestLenderObj.amountUserOwes; //
      highestLenderObj.amountUserOwes = 0;
      // print "highestDebtObj" owes "highestLenderObj" "highestLenderAmt" amount
      console.log(
        `${highestDebtObj.name} owes ${highestLenderObj.name} ${Math.abs(
          highestLenderAmt
        )}`
      );
      highestDebt += highestLenderAmt; //
      highestLenderAmt = highestLenderAmtFn(); //
      highestLenderObj = gethighestLenderObjFn();
    } else if (Math.abs(highestDebt) === Math.abs(highestLenderAmt)) {
      highestLenderObj.amountUserOwes += highestDebt;
      highestDebtObj.amountUserOwes = 0;
      highestDebtObj.amountUserOwes += highestLenderObj.amountUserOwes;
      highestLenderObj.amountUserOwes = 0;
      console.log(
        `${highestDebtObj.name} owes ${highestLenderObj.name} ${Math.abs(
          highestDebt
        )}`
      );
      highestLenderAmt += highestDebt;
      highestDebt = highestDebtAmountFn();
      highestDebtObj = getHighestDebtObjFn();
      highestDebt += highestLenderAmt;
      highestLenderAmt = highestLenderAmtFn();
      highestLenderObj = gethighestLenderObjFn();
    }
  }
};
splitExpenses();
