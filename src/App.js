import React from "react";
import "./styles.scss";
import Header from "./Components/Header.Component";
import AppDashboard from "./Components/AppDashboard.Component";

export default function App() {
  return (
    <div className="go-dutch-app">
      <Header />
      <AppDashboard />
    </div>
  );
}
