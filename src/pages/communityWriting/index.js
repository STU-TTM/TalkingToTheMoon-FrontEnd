import React, { useState } from "react";
import Navbar from "../../component/Navbar";
import styled from "styled-components";
import request from "../../utils/request";
import { UPLOADPICTURE, INSERTPOST } from "../../utils/pathMap";
import fixbug from "../../utils/fixImgUrlBug";

const PhotoInput = styled.input`
  font-size: 1px;
  width: 8rem;
  height: 3rem;
  &::before {
    font-size: 18px;
    text-align: center;
    line-height: 3rem;
    display: block;
    width: 8rem;
    height: 3rem;
    content: "图片上传";
    border-style: dotted;
    border-color: black;
    border-width: 1px;
    position: absolute;
    background-color: rgb(229, 231, 235);
  }
`;

const TextareaWithoutScroll = styled.textarea`
  &::webkit-scrollbar {
    display: none;
  }
`;

export default function Writing() {
  const [picture, setPicture] = useState(undefined);
  const [anonymity, setAnonymity] = useState(undefined);
  const [title, setTitle] = useState(undefined);
  const [content, setContent] = useState(undefined);
  // 图片上传
  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file === undefined) return;
    const formData = new FormData();
    formData.append("file", file, file.name);
    request
      .post(UPLOADPICTURE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(
        (value) => {
          console.log(value);
          if (value.data.code !== 200) throw new Error("图片上传失败");
          else {
            setPicture(value.data.data.path);
            return value.data.data.path;
          }
        },
        (reason) => {
          console.log(reason);
        }
      );
  };

  const sentPost = (e) => {
    const res = request.post(INSERTPOST, {
      anonymity: anonymity,
      title: title,
      content: content,
      picture: picture,
    });
    console.log(res);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAnonymityChange = (event) => {
    setAnonymity(event.target.value);
  };

  return (
    <Navbar fullscreen>
      <div className="flex flex-col justify-around items-center w-full h-5/6 overflow-hidden">
        <div className="text-center text-2xl font-semibold m-4 text-gray-600 font-sans">
          您现在正在发向社区...
        </div>
        <div className="flex justify-between w-1/3">
          <div>
            帖子名
            <input
              type="text"
              className="outline-none mx-1"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div>
            匿名名称
            <input
              type="text"
              className="outline-none mx-1"
              value={anonymity}
              onChange={handleAnonymityChange}
            />
          </div>
        </div>

        {picture !== undefined && (
          <img
            alt="post"
            className="max-h-24 max-w24"
            src={`${fixbug(picture)}`}
          ></img>
        )}

        <TextareaWithoutScroll
          type="text"
          className="w-9/12 h-5/6 resize-none outline-none	rounded m-3 p-1"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex justify-around items-center w-80 h-24">
          <PhotoInput
            type="file"
            className="relative text-lg text-gray-600 bg-blue-300 bg-opacity-40 hover:bg-opacity-80 transition-all 
        rounded "
            onChange={handlePictureUpload}
          ></PhotoInput>
          <div
            className="text-lg text-gray-600 bg-blue-300 bg-opacity-40 hover:bg-opacity-80 transition-all 
        rounded py-2 px-6 outline-none cursor-pointer min-w-max"
            onClick={sentPost}
          >
            提交
          </div>
        </div>
      </div>
    </Navbar>
  );
}
