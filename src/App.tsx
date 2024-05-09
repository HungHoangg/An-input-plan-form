import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { MainPage } from "./template";

function App() {
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: '#4e4e4e',
          color: 'white',
          padding: 10
        }}
      >
        Demo
      </div>
      <MainPage />
    </div>
  );
}

export default App;
