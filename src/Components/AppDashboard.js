import React from "react";
import AddData from "./AddData";
import UsersData from "./UsersData";

export default function AppDashboard() {
  return (
    <div className="app-dashboard">
      <AddData />
      <UsersData />
    </div>
  );
}
