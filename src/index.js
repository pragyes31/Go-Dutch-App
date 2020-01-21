import "./styles.css";

const expensesList = [
  {
    name: "Eleven",
    expenses: [20, 40, 100]
  },
  {
    name: "Max",
    expenses: [80]
  }
];

function addNumbers(arr) {
  return arr.reduce((acc, cur) => acc + cur);
}

/*
Eleven paid for flights: 500
Max paid for flights: 0
Total expenses: 500
expenses per person(EPP): 250
outstanding (Eleven) :  EPP - 500 = -250
outstanding (Max): EPP - 0 = +250
*/
