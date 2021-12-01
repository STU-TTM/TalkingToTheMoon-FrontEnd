import React from "react";
import { Link } from "react-router-dom";

export default function index(props) {
  return (
    <div
      className={`w-full ${
        props.fullscreen === true && "h-screen"
      } relative overflow-hidden bg-gray-200 select-none`}
    >
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
      {props.children}
    </div>
  );
}
