import React from "react";
import styled from "styled-components";

const ContentAlign = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

export default function index() {
  return (
    <div className="h-full flex flex-col justify-between">
      {/* 帮助 */}
      <div className="h-full flex justify-center items-center">
        {/* 第一列 */}
        <div className="h-4/5 w-32 mx-6">
          {/* title */}
          <ContentAlign
            className="text-lg h-1/5"
            style={{ borderBottom: ".0625rem solid black" }}
          >
            <div>帮助</div>
          </ContentAlign>
          {/* 内容分类 */}
          <ContentAlign className="text-xs h-1/5">
            <div>用户协作</div>
          </ContentAlign>
          <ContentAlign className="text-xs h-1/5">
            <div>用户协作</div>
          </ContentAlign>
          <ContentAlign className="text-xs h-1/5">
            <div>用户协作</div>
          </ContentAlign>
          <ContentAlign className="text-xs h-1/5">
            <div>用户协作</div>
          </ContentAlign>
        </div>
        {/* 第二列 */}
        <div className="h-4/5 w-32 mx-6">
          {/* title */}
          <ContentAlign
            className="text-lg h-1/5"
            style={{ borderBottom: ".0625rem solid black" }}
          >
            <div>帮助</div>
          </ContentAlign>
          {/* 内容分类 */}
          <ContentAlign className="text-xs h-1/5">
            <div>用户协作</div>
          </ContentAlign>
          <ContentAlign className="text-xs h-1/5">
            <div>用户协作</div>
          </ContentAlign>
          <ContentAlign className="text-xs h-1/5">
            <div>用户协作</div>
          </ContentAlign>
          <ContentAlign className="text-xs h-1/5">
            <div>用户协作</div>
          </ContentAlign>
        </div>
        {/* 第三列 */}
        <div className="h-4/5 w-32 mx-6">
          {/* title */}
          <ContentAlign
            className="text-lg h-1/5"
            style={{ borderBottom: ".0625rem solid black" }}
          >
            <div>帮助</div>
          </ContentAlign>
          {/* 内容分类 */}
          <ContentAlign className="text-xs h-1/5">
            <div>用户协作</div>
          </ContentAlign>
          <ContentAlign className="text-xs h-1/5">
            <div>用户协作</div>
          </ContentAlign>
          <ContentAlign className="text-xs h-1/5">
            <div>用户协作</div>
          </ContentAlign>
          <ContentAlign className="text-xs h-1/5">
            <div>用户协作</div>
          </ContentAlign>
        </div>
        {/* 第四列 */}
        <div className="h-4/5 w-32 mx-6">
          {/* title */}
          <ContentAlign
            className="text-lg h-1/5"
            style={{ borderBottom: ".0625rem solid black" }}
          >
            <div>帮助</div>
          </ContentAlign>
          {/* 内容分类 */}
          <ContentAlign className="text-xs h-1/5">
            <div>用户协作</div>
          </ContentAlign>
          <ContentAlign className="text-xs h-1/5">
            <div>用户协作</div>
          </ContentAlign>
          <ContentAlign className="text-xs h-1/5">
            <div>用户协作</div>
          </ContentAlign>
          <ContentAlign className="text-xs h-1/5">
            <div>用户协作</div>
          </ContentAlign>
        </div>
      </div>
      {/* copyright */}
      <div
        className="h-6 flex justify-center items-center"
        style={{ borderTop: ".0625rem solid black" }}
      >
        <div>@copyright @stu.edu.cn</div>
      </div>
    </div>
  );
}
