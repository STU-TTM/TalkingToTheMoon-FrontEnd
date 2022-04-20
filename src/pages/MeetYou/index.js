import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar";
import request from "../../utils/request";
import { GETLOVEPAGEBYPAGE as GETPOSTLISTBYPAGE } from "../../utils/pathMap";
import { useNavigate } from "react-router-dom";
// import { CSSTransition, SwitchTransition } from "react-transition-group";
import MeetyouCard from "../../component/MeetyouCard";
// import MeetyouDetail from "../../component/MeetyouDetail";
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

  useEffect(() => {
    const fetchData = async () => {
      const res = await request.post(GETPOSTLISTBYPAGE, {
        current: currentPage,
        limit: 10,
      });

      if (list.length !== 0 && currentPage === 1) return;

      if (res.data.code === 1) {
        if (!(list.length !== 0 && currentPage === 1)) {
          setList((list) => [...list, ...res.data.data]);
          setMaxPage(res.data.maxpage);
        }
      } else if (res.data.code === 404)
        navigate("/loginAndRegist", { replace: true });
    };
    fetchData();
  }, [navigate, currentPage]);

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
  }, 2000);

  return (
    <Navbar choice="Love" fullscreen>
      <div className="w-full h-full flex flex-col items-center">
        <Container
          className="w-full h-full flex justify-center items-center my-5 mx-5 flex-wrap
          overflow-y-scroll"
          onScroll={throttleFetchData}
        >
          {list?.map((item) => {
            return <MeetyouCard item={item}></MeetyouCard>;
          })}
          {maxPage === currentPage && (
            <div className="h-10 w-full my-10 transform -translate-y-10 bg-red-200 text-center leading-10">
              已加载完全部内容
            </div>
          )}
          <div
            className="fixed w-10 h-10 bg-white cursor-pointer right-10 bottom-10 rounded-full hover:shadow-xl duration-500"
            onClick={() => {
              navigate("/mysend");
            }}
          >
            <svg
              t="1649060839079"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2226"
              data-spm-anchor-id="a313x.7781069.0.i0"
              width="40"
              height="40"
            >
              <path
                d="M511.256 0C228.9 0 0 228.9 0 511.256 0 623.8 36.805 727.509 98.429 811.957l38.415-39.993c-51.592-73.945-82.067-163.708-82.067-260.709 0-252.105 204.374-456.479 456.479-456.479 252.089 0 456.466 204.374 456.466 456.479 0 252.101-204.376 456.466-456.466 456.466-96.102 0-185.157-29.847-258.709-80.565l-34.387 42.609c83.032 58.26 183.962 92.734 293.096 92.734 282.351 0 511.245-228.894 511.245-511.244C1022.5 228.9 793.606 0 511.256 0z"
                p-id="2227"
                data-spm-anchor-id="a313x.7781069.0.i1"
                class=""
                fill="#d81e06"
              ></path>
              <path
                d="M492.979 255.62 492.979 492.986 255.613 492.986 255.613 547.762 492.979 547.762 492.979 785.128 547.756 785.128 547.756 547.762 785.121 547.762 785.121 492.986 547.756 492.986 547.756 255.62Z"
                p-id="2228"
                data-spm-anchor-id="a313x.7781069.0.i2"
                class="selected"
                fill="#f4ea2a"
              ></path>
            </svg>
          </div>
        </Container>
      </div>
    </Navbar>
  );
}
