import React from "react"
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { loadMagazineFB } from "./redux/modules/magazine";

import Header from "./component/Header";
import Main from "./page/Main";
import Add from "./page/Add";
import Edit from "./page/Edit";
import Detail from "./page/Detail";
import Join from "./page/Join";
import Login from "./page/Login";

function App() {
  const dispatch = useDispatch();

  React.useEffect (() => {
    dispatch(loadMagazineFB());
    return () => {
      console.log("Clean");
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Add" element={<Add />} />
        <Route path="/Edit/:index/:id" element={<Edit />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Detail/:index/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
