import React, { Component } from "react";
import Navbar from "../../component/Navbar";
import Indexppt from "../../component/Indexppt";
import HelpAndCopyright from "../../component/HelpAndCopyright";
import styled from "styled-components";
// const rdom = require("react-dom");

const ContentPage = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 4rem;
  padding-left: 9rem;
  padding-right: 9rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const GifPicture = styled.div`
  height: 80%;
  width: 30%;
  max-width: 20rem;
  border: 1px solid black;
`;

export default class Index extends Component {
  state = {
    screenPosition: "0",
  };

  render() {
    return (
      <div>
        {/* 导航栏 */}
        <Navbar fixed></Navbar>
        {/* 主要内容栏 */}
        <div className="w-screen h-screen overflow-x-hidden">
          <div className="" style={{ height: "500%" }}>
            {/* 第1页 */}
            <div className="h-1/5">
              {/* 荧光字幕效果 */}
              <Indexppt />
            </div>
            {/* 第2页 */}
            <div className="h-1/5 bg-gray-300">
              <ContentPage>
                {/* 图片展示 */}
                <GifPicture className="mr-6" />
                {/* 文字描述 */}
                <div className="text-6xl w-auto">
                  <div className="leading-relaxed">
                    EXPRESS YOUR
                    <br />
                    <span className="text-red-300">EMOTION</span> HERE
                  </div>
                </div>
              </ContentPage>
            </div>
            {/* 第3页 */}
            <div className="h-1/5 bg-black">
              {/* 内容展示 */}
              <ContentPage>
                <div className="text-6xl w-auto text-white">
                  <div>
                    HIDE YOUR
                    <br />
                    <span className="text-red-300">REAL NAME</span> HERE
                  </div>
                </div>
                {/* 图片描述 */}
                <GifPicture
                  className="ml-6"
                  style={{ border: "1px solid white" }}
                />
              </ContentPage>
            </div>
            {/* 第4页 */}
            <div className="h-1/5 bg-gray-300">
              <ContentPage>
                {/* 图片描述 */}
                <GifPicture className="mr-6" />
                {/* 内容展示 */}
                <div className="text-6xl w-auto">
                  <div>
                    MAKE A
                    <br />
                    <span className="text-red-300">PRIVATE LETTER</span>
                    <br /> TO TALK
                  </div>
                </div>
              </ContentPage>
            </div>
            {/* 第5页 */}
            <div className="h-1/5 bg-black">
              <ContentPage
                style={{
                  paddingLeft: "0",
                  paddingRight: "0",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* 可视内容部分 */}
                {/* 上部分注册引导介绍 */}
                <div className="h-3/5 w-full flex flex-col justify-center items-center">
                  {/* 装载引导文字以及注册INPUT的div,根据引导文字宽度自适应 */}
                  <div>
                    {/* 引导文字 */}
                    <div className="text-7xl mb-6 text-white">
                      An interest to join{" "}
                      <span className="text-red-300 mb-5">TTM</span>
                    </div>
                    {/* 输入以及按钮 */}
                    <div className="flex flex-row justify-between h-12">
                      {/* emailInput */}
                      <div className="w-3/4 h-full bg-red-300 rounded-3xl flex justify-start items-center px-6">
                        <input
                          className="text-2xl w-full text-black bg-transparent outline-none placeholder-gray-700 focus:placeholder-white"
                          style={{ userSelect: "auto" }}
                          placeholder="please input your email to regist"
                          type="text"
                          name="emailRegist"
                          id=""
                        />
                      </div>
                      {/* 注册按钮 */}
                      <div className="w-1/5 h-full bg-white rounded-3xl flex justify-center items-center">
                        <button className="h-12 w-auto px-1 text-black text-2xl outline-none hover:text-red-300 duration-300">
                          regist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* copyright 以及 帮助 */}
                <div className="h-2/5 w-full bg-gray-300">
                  <HelpAndCopyright
                    style={{ height: "100%" }}
                  ></HelpAndCopyright>
                </div>
              </ContentPage>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
