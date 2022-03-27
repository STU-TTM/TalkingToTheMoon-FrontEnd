import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import styled from "styled-components";

const ScrollBarHidden = styled.div`
  ::-webkit-scrollbar {
    display: block;
    width: 0.5rem;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 0.5rem;
  }
`;

export default function Index(props) {
  const params = useParams();
  useEffect(() => {
    console.log(params);
  });
  return (
    <Navbar choice="Love">
      {/* 主要呈现内容部分 */}
      <div className="w-full min-h-screen flex flex-col items-center px-5 md:px-16 lg:px-24">
        {/* 头像部分 */}
        <div className="w-full h-auto my-5 flex flex-col items-center">
          {/* 头像照片 */}
          <div
            className="w-20 h-20 rounded-full border border-black bg-cover"
            style={{
              backgroundImage:
                "url(https://img0.baidu.com/it/u=597387104,4013674410&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500)",
            }}
          ></div>
          {/* 昵称 */}
          <div className="">this is my name</div>
        </div>
        {/* 表白墙该id内容部分 */}
        <div className="w-full h-full">
          <div className="w-auto h-auto flex flex-col lg:flex-row justify-center items-center p-3 md:py-10 lg:py-16 rounded-2xl bg-white shadow-md hover:shadow-2xl duration-500">
            {/* 帖子照片 */}
            <div className="sm:max-w-md md:max-w-xl lg:max-w-none lg:w-1/2 h-full py-3 md:py-5 lg:px-10 lg:py-0">
              <img
                src="https://img2.baidu.com/it/u=140623931,3596749511&fm=253&fmt=auto&app=138&f=JPEG?w=749&h=500"
                alt="帖子照片"
              />
            </div>
            {/* 帖子文字内容 */}
            <div className="sm:max-w-md md:max-w-xl lg:max-w-none w-full lg:w-1/2 py-3 md:py-5 lg:px-10 lg:py-0">
              {/* 帖子内容 */}
              <div className="">
                这里是关于表白墙帖子的主要呈现内容部分，左侧是帖子唯一仅存的一张照片，本处是关于照片的描述等等这里是关于表白墙帖子的主要呈现内容部分，左侧是帖子唯一仅存的一张照片，本处是关于照片的描述等等这里是关于表白墙帖子的主要呈现内容部分，左侧是帖子唯一仅存的一张照片，本处是关于照片的描述等等这里是关于表白墙帖子的主要呈现内容部分，左侧是帖子唯一仅存的一张照片，本处是关于照片的描述等等这里是关于表白墙帖子的主要呈现内容部分，左侧是帖子唯一仅存的一张照片，本处是关于照片的描述等等这里是关于表白墙帖子的主要呈现内容部分，左侧是帖子唯一仅存的一张照片，本处是关于照片的描述等等这里是关于表白墙帖子的主要呈现内容部分，左侧是帖子唯一仅存的一张照片，本处是关于照片的描述等等
              </div>
              {/* 帖子日期 */}
              <div className="w-full text-right text-xs text-gray-500">
                2022-03-26 12:40
              </div>
            </div>
          </div>
        </div>
        {/* 评论部分 */}
        <div className="max-h-screen w-full flex flex-col my-5">
          {/* 这里是发送评论处 */}
          <div className="w-full h-auto mb-5 flex flex-col sm:flex-row rounded-md shadow-md p-1 bg-white">
            <div className="flex flex-row sm:flex-col">
              <div className="">REPLY TO :</div>
              <div className="">who</div>
            </div>
            <div className="w-full">
              <textarea
                name=""
                className="resize-none w-full h-32 bg-gray-100 p-2 shadow-inner outline-none focus:shadow-md"
              ></textarea>
            </div>
            <div className="p-1 flex flex-col items-center sm:justify-end">
              <div className="w-12 px-1 h-auto flex justify-center items-center border border-black rounded-md shadow-inner cursor-pointer hover:shadow-md bg-white">
                提交
              </div>
            </div>
          </div>
          {/* 这里是展示评论处 */}
          <ScrollBarHidden className="h-full p-2 overflow-auto bg-white rounded-lg shadow-md">
            <div className="w-full h-auto mb-3 p-1 rounded-md shadow-md flex flex-col">
              {/* 评论来源及对象 */}
              <div className="">
                who <span className="text-sm text-gray-300">reply to</span> who
              </div>
              {/* 评论内容 */}
              <div className="pl-10">
                外边距合并指的是，当两个垂直外边距相遇时，它们将形成一个外边距。合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者。而左右外边距不合并。在CSS当中，相邻的两个盒子（可能是兄弟关系也可能是祖先关系）的外边距可以结合成一个单独的外边距。这种合并外边距的方式被称为折叠，并且因而所结合成的外边距称为折叠外边距。
              </div>
              {/* 评论时间 */}
              <div className="w-full text-right text-xs text-gray-400 mt-1">
                2022-03-27 19:48
              </div>
            </div>
            <div className="w-full h-auto mb-3 p-1 rounded-md shadow-md flex flex-col">
              {/* 评论来源及对象 */}
              <div className="">
                who <span className="text-sm text-gray-300">reply to</span> who
              </div>
              {/* 评论内容 */}
              <div className="pl-10">
                外边距合并指的是，当两个垂直外边距相遇时，它们将形成一个外边距。合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者。而左右外边距不合并。在CSS当中，相邻的两个盒子（可能是兄弟关系也可能是祖先关系）的外边距可以结合成一个单独的外边距。这种合并外边距的方式被称为折叠，并且因而所结合成的外边距称为折叠外边距。
              </div>
              {/* 评论时间 */}
              <div className="w-full text-right text-xs text-gray-400">
                2022-03-27 19:48
              </div>
            </div>
            <div className="w-full h-auto mb-3 p-1 rounded-md shadow-md flex flex-col">
              {/* 评论来源及对象 */}
              <div className="">
                who <span className="text-sm text-gray-300">reply to</span> who
              </div>
              {/* 评论内容 */}
              <div className="pl-10">
                外边距合并指的是，当两个垂直外边距相遇时，它们将形成一个外边距。合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者。而左右外边距不合并。
              </div>
              {/* 评论时间 */}
              <div className="w-full text-right text-xs text-gray-400">
                2022-03-27 19:48
              </div>
            </div>
            {/* <div className="w-full h-40">4</div> */}
            {/* <div className="w-full h-40">5</div> */}
          </ScrollBarHidden>
        </div>
      </div>
    </Navbar>
  );
}
