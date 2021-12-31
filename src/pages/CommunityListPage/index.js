import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar";
import request from "../../utils/request";
import { LOGIN, GETPOSTLISTBYPAGE, GETPOSTDETAIL } from "../../utils/pathMap";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

export default function Index() {
  const [list, setList] = useState(undefined);
  const [detailId, setDetailId] = useState(undefined);
  const [postDetail, setPostDetail] = useState(undefined);
  useEffect(() => {
    const fetchData = async () => {
      let res = await request.post(LOGIN, {
        email: "1",
        password: "1",
      });

      res = await request.post(GETPOSTLISTBYPAGE, {
        current: 1,
        limit: 10,
      });
      setList(res.data.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let res = await request.post(LOGIN, {
        email: "1",
        password: "1",
      });

      res = await request.post(GETPOSTDETAIL, {
        postid: detailId,
        current: 1,
        limit: 5,
      });
      console.log(res.data.data);
      setPostDetail(res.data.data);
    };
    fetchData();
  }, [detailId]);

  const [showDetail, setShowDetail] = useState(false);
  return (
    <Navbar choice="Community">
      <CSSTransition
        in={showDetail}
        timeout="300"
        classNames="Fade"
        unmountOnExit
      >
        <div
          onClick={() => {
            setShowDetail(false);
          }}
          className="h-screen w-screen bg-gray-700 bg-opacity-30 fixed pt-2 top-0 
        flex justify-center items-center "
        >
          <div
            className="w-5/6 h-5/6 bg-white rounded-2xl flex flex-col justify-between items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 头像和名字 */}
            <div className="border-b w-4/5 flex justify-center items-center m-7">
              <div className="rounded-full bg-gray-500 w-7 h-7 m-3  "></div>
              <div className="font-bold text-xl">
                {postDetail?.post?.anonymity}
              </div>
            </div>
            {/* 帖子图片 */}
            <div
              className="w-64 h-64 border"
              style={{
                backgroundImage: `url(${postDetail?.post?.picture})`,
              }}
            ></div>
            {/* 帖子内容 */}
            <div className="w-4/5">{postDetail?.post?.content}</div>
            {/* 撑开flex */}
            <div className=""></div>
          </div>
        </div>
      </CSSTransition>
      <div
        className="bg-gray-50"
        style={{
          columnCount: "4",
          columnGap: "1rem",
        }}
      >
        {list?.map((item) => {
          return (
            <Link
              to="#"
              key={item.id}
              onClick={() => {
                setShowDetail(true);
                setDetailId(item.id);
              }}
              className="w-80 mx-2 my-6 bg-white rounded-lg shadow-lg inline-block hover:shadow-2xl 
              transition-all cursor-pointer"
            >
              {/* 图片 */}
              <div
                className="w-72 m-1 bg-gray-300 mt-3 mx-auto"
                style={{ height: `${15 + Math.random() * 10}rem` }}
              ></div>
              {/* 头像和匿名称呼 */}
              <div className="flex justify-between items-center m-3">
                <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                <div className="mx-3 text-gray-700 text-2xl font-bold">
                  {item.anonymity}
                </div>
              </div>
              {/* 内容 */}
              <div className="px-4 py-3">{item.content}</div>
            </Link>
          );
        })}
      </div>
    </Navbar>
  );
}
