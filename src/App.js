import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginAndRegist from "./pages/LoginAndRegist";
import CommunityListPage from "./pages/CommunityListPage";
import Home from "./pages/Home";
import { CSSTransition } from "react-transition-group";
import MeetYou from "./pages/MeetYou";
import Personal from "./pages/Personal";
import MeetyouDetail from "./component/MeetyouDetail";
import CommunityWriting from "./pages/communityWriting";

export const ToastContext = React.createContext(undefined);

export default function App() {
  const [toastContext, setToastContext] = useState("");
  const [isShowToast, setIsShowToast] = useState(false);
  const showToast = (keepTime = 2000, context) => {
    setToastContext(context);
    setIsShowToast(true);
    setTimeout(() => {
      setIsShowToast(false);
    }, keepTime);
  };

  return (
    <BrowserRouter>
      <CSSTransition
        in={isShowToast}
        timeout={200}
        classNames="Fade"
        unmountOnExit
      >
        <div
          className="h-10 fixed top-20 left-1/2 transform -translate-x-1/2 shadow-lg
           bg-white px-5 rounded flex justify-center items-center font-semibold"
          style={{ zIndex: "999" }}
        >
          {toastContext}
        </div>
      </CSSTransition>
      <ToastContext.Provider value={showToast}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/loginAndRegist" element={<LoginAndRegist />}></Route>
          <Route path="/community" element={<CommunityListPage />}></Route>
          <Route path="/meetYou" element={<MeetYou />} />
          <Route path="/meetYou/:id" element={<MeetyouDetail />} />
          <Route path="/personal" element={<Personal />} />
          <Route
            path="/communityWriting"
            element={<CommunityWriting></CommunityWriting>}
          ></Route>
        </Routes>
      </ToastContext.Provider>
    </BrowserRouter>
  );
}
