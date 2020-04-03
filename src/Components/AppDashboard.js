import React from "react";
import AddNewBtns from "./AddNewBtns";
import UsersData from "./UsersData";
import AddNewFriendModal from "./AddNewFriendModal";
import AddNewExpenseModal from "./AddNewExpenseModal";

export default function AppDashboard() {
  return (
    <div className="app-dashboard">
      <AddNewBtns />
      <UsersData />
      <AddNewFriendModal />
      <AddNewExpenseModal />
    </div>
  );
}
