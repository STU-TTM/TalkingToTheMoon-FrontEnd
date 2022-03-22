import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar";
import request from "../../utils/request";
import { LOGIN, GETPOSTLISTBYPAGE, GETPOSTDETAIL } from "../../utils/pathMap";
import { Link, useNavigate } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import MeetyouCard from "../../component/MeetyouCard";

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

  return (
    <Navbar choice="Love">
      <div className="w-full h-full flex justify-center items-center my-5 mx-5 flex-wrap">
        {list?.map((item) => {
          return <MeetyouCard item={item}></MeetyouCard>;
        })}
      </div>
    </Navbar>
  );
}
