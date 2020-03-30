import React from "react";
import "./styles.scss";
import Header from "./Components/Header";
import AppDashboard from "./Components/AppDashboard";

export default function App() {
  return (
    <div className="go-dutch-app">
      <Header title="Go-Dutch App" />
      <AppDashboard />
    </div>
  );
}
