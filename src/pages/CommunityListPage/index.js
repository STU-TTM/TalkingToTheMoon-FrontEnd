import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../component/Navbar";
import request from "../../utils/request";
import { LOGIN, GETPOSTLISTBYPAGE, GETPOSTDETAIL } from "../../utils/pathMap";
import { Link, useNavigate } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import fixBug from "../../utils/fixImgUrlBug";
import styled from "styled-components";

const Container = styled.div`
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
`;

export default function Index() {
  const [list, setList] = useState([]);
  const [detailId, setDetailId] = useState(undefined);
  const [postDetail, setPostDetail] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(10000);
  const navigate = useNavigate();
  const waterFlowRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const res = await request.post(GETPOSTLISTBYPAGE, {
        current: currentPage,
        limit: 10,
      });
      if (res.data.code === 1) {
        setList((list) => [...list, ...res.data.data]);
        setMaxPage(res.data.maxpage);
      } else if (res.data.code === 404)
        navigate("/loginAndRegist", { replace: true });
    };
    fetchData();
  }, [navigate, currentPage]);

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

  const navigateToWriting = () => {
    navigate("/communityWriting");
  };

  const updataWhenScrollToBottom = () => {
    if (
      Math.abs(
        parseInt(waterFlowRef.current.offsetHeight) +
          parseInt(waterFlowRef.current.scrollTop) -
          parseInt(waterFlowRef.current.scrollHeight)
      ) <= 50
    ) {
      throttleFetchData();
    }
  };

  const [showDetail, setShowDetail] = useState(false);
  const [canCallScrollEvent, setCanCallScrollEvent] = useState(true);

  const throttle = (fn, timeout) => {
    return function (...args) {
      if (canCallScrollEvent === true) {
        fn(...args);
        setCanCallScrollEvent(false);
        setTimeout(() => {
          setCanCallScrollEvent(true);
        }, timeout);
      }
    };
  };

  const throttleFetchData = throttle(() => {
    if (currentPage < maxPage)
      setCurrentPage((prevPage) => {
        return prevPage + 1;
      });
  }, 1500);

  return (
    <Navbar choice="Community" fullscreen>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={showDetail}
          timeout="300"
          classNames="Fade"
          addEndListener={(node, done) => {
            node.addEventListener("transitionend", done, false);
          }}
          // unmountOnExit
        >
          {showDetail === true ? (
            <div
              onClick={() => {
                setShowDetail(false);
              }}
              className="h-screen w-screen bg-gray-700 bg-opacity-30 fixed pt-2 top-0 
        flex justify-center items-center z-50"
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
                <img
                  className=" h-2/3"
                  src={fixBug(postDetail?.post?.picture)}
                  alt="帖子详细图片"
                />
                {/* <div
                  className=""
                  style={{
                    backgroundImage: `url(${fixBug(
                      postDetail?.post?.picture
                    )})`,
                  }}
                ></div> */}
                {/* 帖子内容 */}
                <div className="w-4/5">{postDetail?.post?.content}</div>
                {/* 撑开flex */}
                <div className=""></div>
              </div>
            </div>
          ) : (
            // 发帖按钮
            <div
              className="fixed  bottom-24 left-1/2 transform -translate-x-1/2 cursor-pointer
            rounded-full  shadow hover:shadow-lg transition-all bg-white z-50"
              onClick={navigateToWriting}
            >
              <svg
                t="1640952143705"
                className="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1787"
                width="52"
                height="52"
              >
                <path
                  d="M940.809299 333.581448c-23.391756-57.684794-57.752332-109.431342-102.126982-153.805992-44.37465-44.37465-96.124268-78.736249-153.808038-102.128005C629.167536 55.056943 570.307987 43.603077 509.933945 43.603077c-60.375066 0-119.232568 11.453866-174.939311 34.044374-57.68377 23.391756-109.431342 57.753355-153.805992 102.128005-44.37465 44.37465-78.734202 96.122221-102.125959 153.805992C56.473199 389.288191 45.019333 448.145693 45.019333 508.519736c0 60.375066 11.453866 119.231545 34.044374 174.939311 23.391756 57.68377 57.751309 109.431342 102.125959 153.805992 44.37465 44.37465 96.122221 78.734202 153.805992 102.126982 55.706743 22.589484 114.565269 34.044374 174.939311 34.044374 60.374042 0 119.232568-11.453866 174.939311-34.044374 57.684794-23.391756 109.433388-57.752332 153.810085-102.126982 44.373627-44.373627 78.733179-96.122221 102.125959-153.805992 22.589484-55.706743 34.044374-114.564245 34.044374-174.939311C974.85265 448.145693 963.398784 389.288191 940.809299 333.581448zM905.988236 669.338445c-21.491477 52.999075-53.075823 100.559277-93.874017 141.357472-40.800241 40.799218-88.361467 72.383564-141.360542 93.875041-51.201126 20.761859-105.308441 31.289634-160.819732 31.289634-55.512315 0-109.61963-10.527774-160.818709-31.289634-52.999075-21.491477-100.558254-53.075823-141.357472-93.874017-40.799218-40.799218-72.382541-88.35942-93.875041-141.358495-20.762883-51.200102-31.289634-105.307418-31.289634-160.818709 0-55.511291 10.527774-109.618607 31.289634-160.818709 21.491477-52.999075 53.075823-100.558254 93.875041-141.357472 40.799218-40.800241 88.358397-72.384587 141.357472-93.877087 51.200102-20.762883 105.307418-31.290657 160.818709-31.290657 55.511291 0 109.618607 10.527774 160.819732 31.290657 52.999075 21.491477 100.5603 53.076846 141.359518 93.877087 40.799218 40.799218 72.383564 88.358397 93.875041 141.357472 20.761859 51.200102 31.289634 105.307418 31.289634 160.818709C937.278893 564.031027 926.750095 618.138342 905.988236 669.338445z"
                  p-id="1788"
                  fill="#ac616173"
                ></path>
                <path
                  d="M810.369481 489.052359c-0.014326 0-0.029676 0-0.042979 0l-281.56577 0.635473 0.590448-282.148032c0.021489-10.376325-8.372691-18.804275-18.747993-18.826787-0.014326 0-0.025583 0-0.039909 0-10.356882 0-18.764366 8.385994-18.785855 18.747993l-0.591471 282.311761-281.725406 0.636496c-10.376325 0.023536-18.767436 8.453533-18.744923 18.829857 0.023536 10.361999 8.429996 18.744923 18.785855 18.744923 0.014326 0 0.029676 0 0.042979 0l281.561677-0.635473-0.590448 282.152125c-0.021489 10.375302 8.372691 18.804275 18.747993 18.825764 0.014326 0 0.025583 0 0.039909 0 10.355859 0 18.764366-8.385994 18.785855-18.747993l0.590448-282.314831 281.728476-0.636496c10.376325-0.023536 18.768459-8.453533 18.744923-18.829857C829.131801 497.435283 820.726364 489.052359 810.369481 489.052359z"
                  p-id="1789"
                  fill="#8a8a8a81"
                ></path>
              </svg>
            </div>
          )}
        </CSSTransition>
      </SwitchTransition>
      <Container
        className="max-h-full overflow-y-scroll"
        onScroll={updataWhenScrollToBottom}
        ref={waterFlowRef}
      >
        <div
          className="bg-gray-50 flex flex-shrink-0 flex-wrap"
          // style={{
          //   columnCount: "4",
          //   columnGap: "1rem",
          //   breakInside: "avoid",
          //   height: "auto",
          // }}
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
                className="w-80 mx-20 my-6 bg-white rounded-lg shadow-lg inline-block hover:shadow-2xl 
              transition-all duration-300 cursor-pointer h-auto "
              >
                {/* 图片 */}
                {item.picture !== null && (
                  <div className="overflow-hidden">
                    <img
                      src={fixBug(item?.picture)}
                      alt="post_picture"
                      className="transform hover:scale-125 transition-all duration-500"
                    />
                  </div>
                )}

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
      </Container>
    </Navbar>
  );
}
