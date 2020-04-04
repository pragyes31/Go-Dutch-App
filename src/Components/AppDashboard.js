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
      isFriendModalOpen: false
    };
  }
  render() {
    return (
      <div className="app-dashboard">
        <Header title="Go-Dutch App" />
        <AddNewBtns />
        <UsersData />
        <AddNewFriendModal />
        <AddNewExpenseModal />
      </div>
    );
  }
}
