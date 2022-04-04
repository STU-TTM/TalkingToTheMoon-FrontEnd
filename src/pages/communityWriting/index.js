import React from "react";
import Navbar from "../../component/Navbar";
import styled from "styled-components";

const PhotoInput = styled.input`
  width: 4rem;
  height: 2rem;
  &::before {
    content: "";
    position: absolute;
    width: 4rem;
    height: 2rem;
    background-color: red;
  }
`;

const TextareaWithoutScroll = styled.textarea`
  &::webkit-scrollbar {
    display: none;
  }
`;

export default function Writing() {
  return (
    <Navbar fullscreen>
      <div className="flex flex-col justify-around items-center w-full h-5/6 overflow-hidden">
        <TextareaWithoutScroll
          type="text"
          className="w-9/12 h-5/6 resize outline-none	rounded m-3 p-1"
        />
        <div className="flex justify-around items-center w-80 h-24">
          <PhotoInput type="file" className="relative"></PhotoInput>
          <div
            className="text-lg text-gray-600 bg-blue-300 bg-opacity-40 hover:bg-opacity-80 transition-all 
        rounded py-2 px-6 outline-none cursor-pointer min-w-max"
          >
            提交
          </div>
        </div>
      </div>
    </Navbar>
  );
}
