import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/pages/Login";
import Home from "./Components/pages/Home";
import Result from "./Components/pages/Result";
import Quizz from "./Components/pages/Quizz";
import Chemistry from "./Components/pages/Chemistry";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Result" element={<Result />} />
      <Route path="/Quizz/:subject" element={<Quizz />} />
    </Routes>
  );
};

export default AppRouter;
