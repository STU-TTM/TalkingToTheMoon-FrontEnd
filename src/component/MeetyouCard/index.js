import React, { useState } from "react";
import fixBug from "../../utils/fixImgUrlBug";

export default function Index(props) {
  const [hoverOrNot, setHoverOrNot] = useState("hidden");
  return (
    <div className="w-60 h-80 border-2 bg-white py-2 px-2 flex justify-center items-center relative mx-9 mb-6 overflow-hidden">
      {/* 展示照片位置 */}
      <div
        className={`w-full h-full cursor-pointer transition-all transform bg-cover duration-500 ${
          hoverOrNot === "hidden" ? "" : "scale-125"
        }`}
        style={{
          backgroundImage: `url(${fixBug(props.item?.picture)})`,
        }}
        onMouseOver={() => {
          setHoverOrNot("visible");
        }}
        onMouseOut={() => {
          setHoverOrNot("hidden");
        }}
      ></div>
      {/* hover显示位置 */}
      <div
        className="absolute bottom-0 w-full px-2 h-28 flex justify-around flex-col text-white"
        style={{
          backgroundColor: "rgba(0,0,0,.3)",
          visibility: `${hoverOrNot}`,
        }}
        onMouseOver={() => {
          setHoverOrNot("visible");
        }}
        onMouseOut={() => {
          setHoverOrNot("hidden");
        }}
      >
        {/* 点赞 */}
        <div className="flex justify-between items-center text-xs">
          <div></div>
          <div className="">101k ❤</div>
        </div>
        {/* 头像以及昵称 */}
        <div className="flex items-center">
          {/* 头像 */}
          <div className="w-9 h-9 rounded-full border-2 mr-2"></div>
          {/* 昵称 */}
          <div className="">{props.item.anonymity}</div>
        </div>
        <div className="flex justify-center items-start h-12 overflow-hidden">
          <div>{props.item.content}</div>
        </div>
      </div>
    </div>
  );
}
