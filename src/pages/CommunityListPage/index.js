import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar";
import request from "../../utils/request";
import { LOGIN, GETPOSTLISTBYPAGE } from "../../utils/pathMap";
import { Link } from "react-router-dom";

export default function Index() {
  const [list, setList] = useState(undefined);
  useEffect(() => {
    const fetchData = async () => {
      let res = await request.post(
        LOGIN,
        {},
        {
          params: {
            email: "1234@stu.edu.cn",
            password: "123456",
          },
        }
      );
      console.log(res);

      res = await request.post(GETPOSTLISTBYPAGE, {
        current: 1,
        limit: 10,
        rows: 0,
        path: "string",
        offset: 0,
        total: 0,
      });
      console.log(res.data.data);
      setList(res.data.data);
    };
    fetchData();
  }, []);

  return (
    <Navbar choice="Community">
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
