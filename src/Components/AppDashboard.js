import React from "react";
import AddData from "./AddData";
import UsersData from "./UsersData";
import AddNewFriendModal from "./AddNewFriendModal";

export default function AppDashboard() {
  return (
    <div className="app-dashboard">
      <AddData />
      <UsersData />
      <AddNewFriendModal />
    </div>
  );
}
