import React from "react";
import AddData from "./AddData.Component";
import UsersData from "./UsersData.Component";

export default function AppDashboard() {
  return (
    <div class="app-dashboard">
      <AddData />
      <UsersData />
    </div>
  );
}
