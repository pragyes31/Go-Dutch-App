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
      { id: 0, name: "Will", userTotalExpenses: 1000, amountUserOwes: 0 },
      { id: 1, name: "Mike", userTotalExpenses: 0, amountUserOwes: 0 },
      { id: 2, name: "Eleven", userTotalExpenses: 0, amountUserOwes: 0 },
      { id: 3, name: "Dustin", userTotalExpenses: 1000, amountUserOwes: 0 },
      { id: 4, name: "Max", userTotalExpenses: 2000, amountUserOwes: 0 }
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
        id: 0
      },
      {
        expneseName: "Food",
        whoPaid: "Dustin",
        howMuch: 1000,
        id: 0
      }
    ]
  }
];

const populateExpenses = () => {};

// use condition later on to check whether there are one or more expenses.
// Do not use reduce in below function if just one expense.
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
  while (isAmountUserOwesZero()) {
    if (Math.abs(highestDebt) <= Math.abs(highestLenderAmt)) {
      highestLenderObj.amountUserOwes += highestDebt; // -1400+600 = -800, -800+600=-200
      highestDebtObj.amountUserOwes = 0;
      // print "highestDebtObj" owes "highestLenderObj" Math.abs(highestDebt)
      console.log(
        `${highestDebtObj.name} owes ${highestLenderObj.name} ${Math.abs(
          highestDebt
        )}`
      );
      highestLenderAmt += highestDebt; // -1400+600 = -800 -800+600=-200
      highestDebt = highestDebtAmountFn();
      highestDebtObj = getHighestDebtObjFn();
    } else {
      highestDebtObj.amountUserOwes += highestLenderObj.amountUserOwes; // 600
      highestLenderObj.amountUserOwes = 0;
      // print "highestDebtObj" owes "highestLenderObj" "highestLenderAmt" amount
      console.log(
        `${highestDebtObj.name} owes ${highestLenderObj.name} ${Math.abs(
          highestLenderAmt
        )}`
      );
      highestDebt += highestLenderAmt; // -50
      highestLenderAmt = highestLenderAmtFn(); // 200
      highestLenderObj = gethighestLenderObjFn();
    }
  }
};
splitExpenses();

let trip = {
  users: ["06", "03", "14", "04", "02", "34", "21"],
  expenses: [
    {
      type: "car",
      paidBy: "02",
      amount: 114.13
    }
  ]
};

trip.balance = trip.users.map(
  id =>
    +(
      trip.expenses.reduce(
        (total, { paidBy, amount }) => (paidBy === id ? total + amount : total),
        0
      ) - trip.totalCostPerUser
    ).toFixed(2)
);

trip.paymentsGraph = [...Array(trip.users.length)].map(() =>
  Array(trip.users.length).fill(0)
);
// console.log(trip.paymentsGraph);

// console.log(trip.balance);
