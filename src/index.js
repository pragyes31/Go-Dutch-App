import "./styles.css";

const createGoDutchApp = function() {
  const newEventBtn = document.querySelector("#new-event-button");
  const newEventModal = document.querySelector("#new-event-modal");
  newEventModal.style.display = "none";
  const closeModalBtn = document.querySelector("#close-modal");
  const addEventForm = document.querySelector("#event-details-form");
  const addUserBtn = document.querySelector("#add-users");
  const userDetails = document.querySelector("#user-details");
  const addEventBtn = document.querySelector("#add-event");
  const userNameInput = document.querySelectorAll(".user-name");

  let isModalOpen = false;

  const toggleModal = function() {
    userDetails.innerHTML = "";
    isModalOpen
      ? (newEventModal.style.display = "none")
      : (newEventModal.style.display = "block");
    newEventBtn.disabled = !isModalOpen;
    isModalOpen = !isModalOpen;
  };

  const addUser = function(e) {
    e.preventDefault();
    let labelElem = document.createElement("label");
    let userName = document.createElement("input");
    let breakLine = document.createElement("br");
    userName.className += "user-name";
    userName.placeholder = "Add user's name";
    userDetails.appendChild(breakLine);
    labelElem.innerHTML = "user's name: ";
    userDetails.appendChild(labelElem);
    userDetails.appendChild(userName);
  };

  const addEvent = () => {
    let usersNameArray = [];
    userNameInput.forEach(elem => usersNameArray.push(elem.value));
    console.log(usersNameArray);
    toggleModal();
  };

  addEventForm.addEventListener("submit", e => {
    e.preventDefault();
    addEvent();
  });
  newEventBtn.addEventListener("click", toggleModal);
  closeModalBtn.addEventListener("click", toggleModal);
  addUserBtn.addEventListener("click", addUser);
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
