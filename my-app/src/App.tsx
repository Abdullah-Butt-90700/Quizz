import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/pages/Login";
import Home from "./Components/pages/Home";
import Result from "./Components/pages/Result";
import Physics from "./Components/pages/Physics";
import Chemistry from "./Components/pages/Chemistry";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Result" element={<Result />} />
      <Route path="/PhysicsQuizz" element={<Physics />} />
      <Route path="/ChemistryQuizz" element={<Chemistry />} />
    </Routes>
  );
};

export default AppRouter;
