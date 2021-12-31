import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar";
import request from "../../utils/request";
import { LOGIN, GETPOSTLISTBYPAGE, GETPOSTDETAIL } from "../../utils/pathMap";
import { Link, useNavigate } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import fixBug from "../../utils/fixImgUrlBug";

export default function Index() {
  const [list, setList] = useState(undefined);
  const [detailId, setDetailId] = useState(undefined);
  const [postDetail, setPostDetail] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const res = await request.post(GETPOSTLISTBYPAGE, {
        current: 1,
        limit: 10,
      });
      console.log(res.data.data);
      if (res.data.code === 1) setList(res.data.data);
      else navigate("/loginAndRegist", { replace: true });
    };
    fetchData();
  }, [navigate]);

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
      console.log("!!!!!!!!!!!");
      console.log(res.data.data);
      console.log("!!!!!!!!!!!");
      setPostDetail(res.data.data);
    };
    fetchData();
  }, [detailId]);

  const [hoverOrNot, setHoverOrNot] = useState("block");
  return (
    <Navbar choice="Love">
      <div className="w-full h-full flex justify-center items-center my-5 mx-5 flex-wrap">
        {list?.map((item) => {
          return (
            <div
              className="w-60 h-80 border-2 bg-white py-2 px-2 flex justify-center items-center relative mx-9 mb-6"
              style={{
                backgroundImage: `url(${fixBug(postDetail?.post?.picture)})`,
              }}
            >
              {/* 展示照片位置 */}
              <div
                className="w-full h-full bg-gray-300"
                onMouseOver={() => {
                  setHoverOrNot("block");
                }}
                // onMouseOut={() => {
                //   setHoverOrNot("none");
                // }}
              ></div>
              {/* hover显示位置 */}
              <div
                className="absolute bottom-0 w-full px-2 h-28 flex justify-around flex-col"
                style={{
                  backgroundColor: "rgba(0,0,0,.3)",
                  display: `${hoverOrNot}`,
                }}
                onMouseOver={() => {
                  setHoverOrNot("block");
                }}
                // onMouseOut={() => {
                //   setHoverOrNot("none");
                // }}
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
                  <div className="">昵称</div>
                </div>
                <div className="flex justify-center items-center h-12">
                  <div>text and description……………………</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Navbar>
  );
}
