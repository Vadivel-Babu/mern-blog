import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Authpage from "./pages/Authpage";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={"hi"} />
        <Route path="/login" element={<Authpage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
