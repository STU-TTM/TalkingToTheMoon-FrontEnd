import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import styled from "styled-components";
import request from "../../utils/request";
import { GETPOSTDETAIL, ADDCOMMENT } from "../../utils/pathMap";
import fixBug from "../../utils/fixImgUrlBug";

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
  const navigate = useNavigate();
  const params = useParams();
  // 评论内容
  const [comment, setComment] = useState("");
  // 评论对象的名字
  const [commentToName, setCommentToName] = useState("");
  // 评论对象的uid
  const [target_id, setTarget_id] = useState(undefined);
  // 进入网页的fetchdata数据
  const [data, setData] = useState();
  // 选中的comment_id
  const [selected, setSelected] = useState(0);
  // 选中的commentlist数组的id
  const [entity_id, setEntity_id] = useState(undefined);
  // 当submit被按下的时候，这个state会被取反
  const [isSubmited, setIsSubmited] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const res = await request.post(GETPOSTDETAIL, {
        postid: params.id,
        current: 1,
        limit: 10,
      });
      // console.log(res?.data.data);
      if (res.data.code === 200) {
        setData(res.data.data);
        setEntity_id(data?.post.id);
        setTarget_id(data?.post.id);
      } else navigate("/loginAndRegist", { replace: true });
      // const userData = await request.post(GETPERSONALINFORMATION);
      // setUserData(userData.data.data);
    };
    fetchData();
  }, [navigate, params.id, commentToName, data?.post.id, isSubmited]);

  function handleAddComment() {
    // console.log("11");
    if (comment === "") {
      alert("请填写评论内容");
      return false;
    }
    const fetchData = async () => {
      var entity_type = 1;
      if (target_id !== data?.post.id) {
        entity_type = 2;
      }
      const res = await request.post(ADDCOMMENT, {
        // id: id,
        // uid: userData.uid,
        entity_type: entity_type,
        entity_id: entity_id,
        target_id: target_id,
        content: comment,
        // content: "string",
        // status: 0,
        // likes: 0,
        // create_time: Date.now(),
      });
      console.log(res);
      setCommentToName("");
      setTarget_id(data?.post.id);
      setComment("");
      setEntity_id(data?.post.id);
      setSelected(0);
      setIsSubmited((prevIsSubmited) => {
        return !prevIsSubmited;
      });
    };
    fetchData();
  }

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
                data?.author.head_portrait_thumbnail === null
                  ? "url(https://img0.baidu.com/it/u=597387104,4013674410&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500)"
                  : `url(${fixBug(data?.author.head_portrait_thumbnail)})`,
            }}
          ></div>
          {/* 昵称 */}
          <div className="">{data?.post.anonymity}</div>
        </div>
        {/* 表白墙该id内容部分 */}
        <div className="w-full h-full">
          <div
            className={`w-auto h-auto flex flex-col lg:flex-row justify-center items-center p-3 md:py-10 lg:py-16 rounded-2xl shadow-md hover:shadow-2xl duration-300 ${
              selected === 0 ? "bg-red-200" : "bg-white"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setCommentToName("");
              setTarget_id(data?.post.id);
              setComment("");
              setEntity_id(data?.post.id);
              setSelected(0);
            }}
          >
            {/* 帖子照片 */}
            <div className="sm:max-w-md md:max-w-xl lg:max-w-none lg:w-1/2 h-full py-3 md:py-5 lg:px-10 lg:py-0">
              <img src={`${fixBug(data?.post.picture)}`} alt="帖子照片" />
            </div>
            {/* 帖子文字内容 */}
            <div className="sm:max-w-md md:max-w-xl lg:max-w-none w-full lg:w-1/2 py-3 md:py-5 lg:px-10 lg:py-0">
              {/* 帖子内容 */}
              <div className="">{data?.post.content}</div>
              {/* 帖子日期 */}
              <div className="w-full text-right text-xs text-gray-500">
                {data?.post.create_time}
              </div>
            </div>
          </div>
        </div>
        {/* 评论部分 */}
        <div className="max-h-screen w-full flex flex-col mt-5">
          {/* 这里是发送评论处 */}
          <div className="w-full h-auto mb-5 flex flex-col rounded-md shadow-md p-1 bg-white">
            <div className="flex flex-row m-1">
              <div className="w-auto">
                <svg
                  t="1649082703845"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2293"
                  width="24"
                  height="24"
                >
                  <path
                    d="M819.788835 800.976554l0 158.697395-156.846521-96.562243c-21.750241 3.551896-44.07458 5.628184-67.000649 5.628184-107.742184 0-204.254146-41.231053-270.859782-106.344027 10.971315 0.62831 21.874066 1.421372 33.022421 1.421372 15.629596 0 31.041219-0.765433 46.288082-1.994424 52.58679 36.20355 119.082928 57.953923 191.548256 57.953923 24.974811 0 49.130944-2.841721 72.41109-7.705496l54.486124 36.341696c-0.055261 0.026606-0.108475 0.054235-0.163736 0.081864L763.827042 875.735212l0-43.089377 0-56.041364c84.16015-47.434336 139.903969-129.35102 139.903969-222.63459 0-58.992579-22.515705-113.311719-60.1698-157.413146 2.486736-17.214057 4.208007-34.632775 4.208007-52.435233 0-8.142447-0.873939-16.080234-1.421431-24.099884 69.678751 57.981553 113.343992 139.665946 113.343992 230.449579C959.692804 652.307559 904.823947 742.722802 819.788835 800.976554zM428.057311 700.862415c-22.925045 0-45.263711-2.076288-67.000649-5.629207l-156.845497 96.562243L204.211165 633.126708C119.176053 574.845327 64.307196 484.430084 64.307196 382.593721c0-175.774329 162.857668-318.268694 363.750115-318.268694 200.894494 0 363.750115 142.494365 363.750115 318.268694C791.807427 558.36805 628.951806 700.862415 428.057311 700.862415zM428.057311 120.284527c-169.988357 0-307.789346 119.023814-307.789346 265.806855 0 93.270267 55.743819 175.173648 139.903969 222.63459l0 56.041364 0 43.089377 41.150875-27.241434c-0.068564-0.026606-0.122802-0.055259-0.177039-0.081864l54.513755-36.340673c23.266843 4.863774 47.421952 7.704472 72.397787 7.704472 169.988357 0 307.789346-118.995161 307.789346-265.806855C735.846658 239.307318 598.045669 120.284527 428.057311 120.284527zM609.932881 428.061262c-23.171672 0-41.9716-18.784832-41.9716-41.96988 0-23.170722 18.799928-41.96988 41.9716-41.96988 23.172695 0 41.9716 18.799158 41.9716 41.96988C651.903457 409.275407 633.104552 428.061262 609.932881 428.061262zM442.047504 428.061262c-23.184975 0-41.9716-18.784832-41.9716-41.96988 0-23.170722 18.785602-41.96988 41.9716-41.96988s41.9716 18.799158 41.9716 41.96988C484.019104 409.275407 465.233502 428.061262 442.047504 428.061262zM274.16315 428.061262c-23.184975 0-41.970577-18.784832-41.970577-41.96988 0-23.170722 18.785602-41.96988 41.970577-41.96988s41.9716 18.799158 41.9716 41.96988C316.133727 409.275407 297.348125 428.061262 274.16315 428.061262z"
                    p-id="2294"
                    data-spm-anchor-id="a313x.7781069.0.i0"
                    class="selected"
                    fill="#d4237a"
                  ></path>
                </svg>
              </div>
              <div className="w-full">
                {commentToName === "" ? (
                  ""
                ) : (
                  <svg
                    className="inline -translate-y-0.5 transform mx-2"
                    t="1649086166645"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2182"
                    width="24"
                    height="24"
                    data-spm-anchor-id="a313x.7781069.0.i1"
                  >
                    <path
                      d="M885.113 489.373L628.338 232.599c-12.496-12.497-32.758-12.497-45.254 0-12.497 12.497-12.497 32.758 0 45.255l203.3 203.3H158.025c-17.036 0-30.846 13.811-30.846 30.846 0 17.036 13.811 30.846 30.846 30.846h628.36L583.084 746.147c-12.497 12.496-12.497 32.758 0 45.255 6.248 6.248 14.438 9.372 22.627 9.372s16.379-3.124 22.627-9.372l256.775-256.775a31.999 31.999 0 0 0 0-45.254z"
                      fill="#d4237a"
                      p-id="2183"
                      data-spm-anchor-id="a313x.7781069.0.i2"
                      class="selected"
                    ></path>
                  </svg>
                )}
                <span>{commentToName}</span>
              </div>
            </div>
            <div className="w-full">
              <textarea
                name=""
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                className="resize-none w-full h-32 bg-gray-100 p-2 shadow-inner outline-none focus:shadow-md"
              ></textarea>
            </div>
            <div className="p-1 flex flex-col items-end">
              <div
                className="w-12 px-1 h-auto flex justify-center items-center border border-black rounded-md shadow-inner cursor-pointer hover:shadow-md bg-white"
                onClick={() => {
                  handleAddComment();
                }}
              >
                提交
              </div>
            </div>
          </div>
          {/* 这里是展示评论处 */}
          <ScrollBarHidden className="h-full p-2 overflow-auto bg-white rounded-lg shadow-md">
            {data?.comments.length === 0 ? (
              <div className="flex justify-center items-center p-1">
                您或将成为该贴第一条评论
              </div>
            ) : (
              data?.comments.map((item) => (
                <div
                  className={`w-full h-auto mb-3 p-1 rounded-md shadow-md flex flex-row duration-300 ${
                    selected === item.comment.id ? "bg-red-200" : "bg-white"
                  }`}
                  key={item.comment.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCommentToName(item.author.username);
                    setTarget_id(item.author.uid);
                    setComment("");
                    setEntity_id(item.comment.id);
                    setSelected(item.comment.id);
                  }}
                >
                  {/* 评论头像 */}
                  <div className="mr-2">
                    <div
                      className="w-14 h-14 rounded-full bg-cover"
                      style={{
                        backgroundImage:
                          item?.author.head_portrait_thumbnail === null
                            ? "url(https://img0.baidu.com/it/u=597387104,4013674410&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500)"
                            : `url(${fixBug(
                                item?.author.head_portrait_thumbnail
                              )})`,
                      }}
                    ></div>
                  </div>
                  {/* 评论主要内容 */}
                  <div className="w-full flex flex-col">
                    {/* 评论来源及对象 */}
                    <div className="">{item.author.username}</div>
                    {/* 评论内容 */}
                    <div className="">{item.comment.content}</div>
                    {/* 评论时间 */}
                    <div className="w-full text-right text-xs text-gray-400 mt-1">
                      {item.comment.create_time}
                    </div>
                    {item?.replys.length === 0 ? (
                      ""
                    ) : (
                      <div className="w-full border-t border-black pt-3">
                        {item.replys.map((double) => (
                          <div
                            className={`w-full flex flex-row mb-2 shadow-sm rounded-sm duration-300 ${
                              selected === double.reply.id
                                ? "bg-red-200"
                                : "bg-white"
                            }`}
                            key={double.reply.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCommentToName(double.user.username);
                              setTarget_id(double.user.uid);
                              setComment("");
                              setEntity_id(item.comment.id);
                              setSelected(double.reply.id);
                            }}
                          >
                            {/* 头像 */}
                            <div className="mr-2 p-2">
                              <div
                                className="w-8 h-8 rounded-full bg-cover"
                                style={{
                                  backgroundImage:
                                    double?.user.head_portrait_thumbnail ===
                                    null
                                      ? "url(https://img0.baidu.com/it/u=597387104,4013674410&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500)"
                                      : `url(${fixBug(
                                          double?.user.head_portrait_thumbnail
                                        )})`,
                                }}
                              ></div>
                            </div>
                            {/* 主要内容 */}
                            <div className="w-full">
                              {/* 评论来源及对象 */}
                              <div className="">
                                {double?.user.username}
                                {double?.target === null ? (
                                  ""
                                ) : (
                                  <span>
                                    <span className="px-2">回复:</span>
                                    {double.target?.username}
                                  </span>
                                )}
                              </div>
                              {/* 评论内容 */}
                              <div className="">{double.reply.content}</div>
                              {/* 评论时间 */}
                              <div className="w-full text-right text-xs text-gray-400 mt-1">
                                {double.reply.create_time}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </ScrollBarHidden>
        </div>
      </div>
    </Navbar>
  );
}
