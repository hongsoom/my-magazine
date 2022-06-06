import React from "react"
import { Route, Routes } from "react-router-dom";
import Header from "../src/component/Header";
import Main from "./page/Main";
import Add from "./page/Add";
import Detail from "./page/Detail";
import Join from "./page/Join";
import Login from "./page/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Add" element={<Add />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Detail/:index" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
