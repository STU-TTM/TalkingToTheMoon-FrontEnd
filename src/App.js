import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginAndRegist from "./pages/LoginAndRegist";
import CommunityListPage from "./pages/CommunityListPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginAndRegist />}></Route>
        <Route path="/loginAndRegist" element={<LoginAndRegist />}></Route>
        <Route path="/community" element={<CommunityListPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
