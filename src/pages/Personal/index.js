import React from "react";
import Navbar from "../../component/Navbar";

function Item(props) {
  return (
    <div className="hover:bg-gray-300 hover:bg-opacity-20 transition-all px-3 cursor-pointer">
      <div
        className="border-b border-gray-300 h-12 text-gray-500 font-serif font-semibold"
        style={{ lineHeight: "3rem" }}
      >
        <div className="text-gray-500 font-serif font-semibold">
          {props.label}
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  return (
    <Navbar fullscreen>
      <div className="flex flex-col justify-center items-center ">
        {/* 基本信息板块 */}
        <div
          className="border rounded w-8/12 my-5"
          style={{ borderColor: "#dadce0" }}
        >
          <div
            className="border-gray-300 h-24 text-gray-900 text-xl font-serif font-semibold px-3 "
            style={{ lineHeight: "4rem" }}
          >
            基本信息
            <div className="text-xs font-sans font-medium">
              我们的用户可能会看到部分信息
            </div>
          </div>
          <div className="hover:bg-gray-300 hover:bg-opacity-20 transition-all px-3">
            <div
              className="border-b border-gray-300 h-20 text-gray-500 font-serif font-semibold"
              style={{ lineHeight: "5rem" }}
            >
              照片
            </div>
          </div>
          <Item label="姓名"></Item>
          <Item label="生日"></Item>
          <Item label="姓别"></Item>
        </div>

        {/* 联系信息 */}
        <div
          className=" border rounded w-8/12 my-5"
          style={{ borderColor: "#dadce0" }}
        >
          <div
            className=" border-gray-300 h-16 text-gray-900 text-xl font-serif font-semibold px-3"
            style={{ lineHeight: "4rem" }}
          >
            联系信息
          </div>
          <div className="hover:bg-gray-300 hover:bg-opacity-20 transition-all px-3">
            <div
              className="border-b border-gray-300 h-12 text-gray-500 font-serif font-semibold "
              style={{ lineHeight: "3rem" }}
            >
              <div className="text-gray-500 font-serif font-semibold">生日</div>
            </div>
          </div>
          <div className="hover:bg-gray-300 hover:bg-opacity-20 transition-all px-3">
            <div
              className="border-b h-12 text-gray-500 font-serif font-semibold "
              style={{ lineHeight: "3rem" }}
            >
              <div className="text-gray-500 font-serif font-semibold">性别</div>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
}
