import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginAndRegist from "./pages/LoginAndRegist";
import CommunityListPage from "./pages/CommunityListPage";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/loginAndRegist" element={<LoginAndRegist />}></Route>
        <Route path="/community" element={<CommunityListPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
