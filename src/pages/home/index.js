import { Link } from "react-router-dom";
import { useState } from "react";

function App() {
  const [userChoice, setUserChoice] = useState("Login");

  return (
    <div className="w-full h-screen relative overflow-hidden bg-gray-200 select-none">
      {/* navbar */}
      <div
        className="h-16 z-30 relative bg-gray-700 flex justify-between items-center px-10 rounded-b-lg "
        style={{ boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.25)" }}
      >
        {/* navbar-left */}
        <div className="h-full w-auto flex justify-center items-center">
          <div className="w-8 h-8 mx-5 rounded-full bg-white"></div>
          <div
            className="w-32 h-8 text-base font-bold text-white"
            style={{ lineHeight: "2rem" }}
          >
            STU-TTM
          </div>
        </div>
        {/* navbar-middle */}
        <div className="flex justify-around items-center h-full w-52 font-bold">
          <Link to="#" className="text-white ">
            首页
          </Link>
          <Link to="#" className="text-white ">
            社区
          </Link>
          <Link to="#" className="text-white ">
            表白墙
          </Link>
        </div>
        {/* navbar-right */}
        <div className="w-60 h-full flex items-center justify-around">
          <div className="rounded-full overflow-hidden bg-white mx-3  w-8 h-8"></div>
          <div className="rounded-full overflow-hidden bg-white mx-3 w-8 h-8"></div>
          <div className="rounded-full overflow-hidden bg-white mx-3 w-8 h-8"></div>
          <div className="rounded-full overflow-hidden bg-white mx-3 w-8 h-8"></div>
        </div>
      </div>

      <div
        className="absolute z-10 top-64 left-36 text-5xl text-center leading-snug"
        style={{
          width: "26.875rem",
          height: "15rem",
        }}
      >
        IF YOU HAVE AN ACCOUNT, PLEASE CLICK{" "}
        <span
          className="cursor-pointer underline text-pink-600 hover:text-blue-500 transition-all"
          onClick={() => {
            setUserChoice("Login");
          }}
        >
          HERE
        </span>{" "}
        TO LOGIN IN
      </div>
      <div
        className="absolute z-10 right-36 top-64 text-5xl text-center leading-snug"
        style={{
          width: "26.875rem",
          height: "15rem",
        }}
      >
        IF YOU HAVE NO ACCOUNT, PLEASE CLICK{" "}
        <span
          className="cursor-pointer underline text-pink-600 hover:text-blue-500 transition-all"
          onClick={() => {
            setUserChoice("Regist");
          }}
        >
          HERE
        </span>{" "}
        TO REGIST
      </div>

      {/* big circle */}
      <div
        className="relative bg-white rounded-full z-20 transition-all duration-700"
        style={{
          left: `${userChoice === "Login" ? "-48rem" : "43rem"}`,
          top: `${userChoice === "Login" ? "-34.3125rem" : "-19rem"}`,
          width: "100rem",
          height: "100rem",
          boxShadow: `${
            userChoice === "Login"
              ? "10px 10px 20px rgba(20, 1, 1, 0.25)"
              : "-10px -10px 20px rgba(20, 1, 1, 0.25)"
          }`,
        }}
      >
        {/* Login frame */}
        <div
          className="absolute border border-black rounded-md z-30 flex flex-col justify-around items-center"
          style={{
            width: "26rem",
            height: "33rem",
            left: "60rem",
            top: "39rem",
          }}
        >
          {/* 用于撑开flex布局 */}
          <div className=""></div>
          {/* 登录标题 */}
          <div className="text-2xl font-bold">LOGIN</div>
          {/* 登录的两个输入框 */}
          <div className="">
            <div className="w-80 h-10 rounded-3xl bg-gray-300 my-4"></div>
            <div className="w-80 h-10 rounded-3xl bg-gray-300 my-4"></div>
          </div>
          {/* 登录按钮 */}
          <div className="w-24 h-11 rounded-2xl bg-gray-300"> </div>
          {/* 用于撑开flex布局 */}
          <div className=""></div>
        </div>
        {/* Regist frame */}
        <div
          className="absolute border border-black rounded-md z-30 flex flex-col justify-around items-center"
          style={{
            width: "26rem",
            height: "33rem",
            left: "16rem",
            top: "25rem",
          }}
        >
          {/* 用于撑开flex布局 */}
          <div className=""></div>
          {/* 注册标题 */}
          <div className="text-2xl font-bold">Regist</div>
          {/* 注册的两个输入框 */}
          <div className="">
            <div className="w-80 h-10 rounded-3xl bg-gray-300 my-5"></div>
            <div className="w-80 h-10 rounded-3xl bg-gray-300 my-5"></div>
            <div className="w-80 h-10 rounded-3xl bg-gray-300 my-5"></div>
            <div className="w-80 h-10 rounded-3xl bg-gray-300 my-5"></div>
          </div>
          {/* 注册按钮 */}
          <div className="w-24 h-11 rounded-2xl bg-gray-300"> </div>
          {/* 用于撑开flex布局 */}
          <div className=""></div>
        </div>
      </div>
    </div>
  );
}

export default App;
