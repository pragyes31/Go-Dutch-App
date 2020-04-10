import React from "react";
import Header from "./Header";
import AddNewBtns from "./AddNewBtns";
import UsersData from "./UsersData";
import AddNewFriendModal from "./AddNewFriendModal";
import AddNewExpenseModal from "./AddNewExpenseModal";

export default class AppDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddFriendModalOpen: false,
      isAddExpenseModalOpen: false
    };
  }
  render() {
    const toggleModal = e => {
      const isFriendModalOpen = e.target.classList.contains("add-friend-btn");
      // const isExpenseModalOpen = e.target.classList.contains("add-expense-btn");
      if (isFriendModalOpen) {
        this.setState(prevState => {
          prevState.isAddFriendModalOpen = !prevState.isAddFriendModalOpen;
        });
      } else {
        this.setState(prevState => {
          prevState.isAddExpenseModalOpen = !prevState.isAddExpenseModalOpen;
        });
      }
    };
    const addFriendData = () => {
      console.log("added Friend details");
    };
    return (
      <div className="app-dashboard">
        <Header title="Go-Dutch App" />
        <AddNewBtns openModal={toggleModal} />
        <UsersData />
        <AddNewFriendModal
          isAddFriendModalOpen={this.state.isAddFriendModalOpen}
          addFriendData={addFriendData}
        />
        <AddNewExpenseModal />
      </div>
    );
  }
}
