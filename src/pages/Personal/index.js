import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../component/Navbar";
import request from "../../utils/request";
import {
  GETPERSONALINFORMATION,
  UPLOADHEADPICTURE,
  MODIFYPERSONALPICTURE,
} from "../../utils/pathMap";
import { useNavigate } from "react-router-dom";
import fixImgUrlBug from "../../utils/fixImgUrlBug";

const PersonalInformationContext = React.createContext(undefined);

function Item(props) {
  const personalInformation = useContext(PersonalInformationContext);

  return (
    <div className="hover:bg-gray-300 hover:bg-opacity-20 transition-all px-3 cursor-pointer">
      <div
        className="flex justify-between items-center border-b border-gray-300 h-12 text-gray-500 font-serif font-semibold"
        style={{ lineHeight: "3rem" }}
      >
        {/* 这个项的label */}
        <div className="text-gray-500 font-serif font-semibold">
          {props.label}
        </div>
        {/* 内容 */}
        <div className="font-normal text-base w-32 text-center p-1 bg-white rounded">
          {(function () {
            switch (props.label) {
              case "姓名":
                return personalInformation?.username;
              case "邮箱":
                return personalInformation?.email;
              case "生日":
                return "2022.1.1";
              case "性别":
                return "男";
              case "号码":
                return "133133133";
              default:
                break;
            }
          })()}
        </div>
        {/* 三角箭头 */}
        <div className="border-r border-t border-black w-3 h-3 transform rotate-45 scale-95 mx-5"></div>
      </div>
    </div>
  );
}

export default function Index(props) {
  const [personanInformation, setPersonanInformation] = useState(undefined);
  const [personalPictureURL, setPersonalPictureURL] = useState(undefined);
  const navigation = useNavigate();

  // 获取个人信息
  useEffect(() => {
    (async () => {
      const res = await request.post(GETPERSONALINFORMATION);
      if (res.data.code !== 200) {
        navigation("/loginAndRegist");
      } else {
        console.log(res.data.data);
        setPersonalPictureURL(res.data.data.head_portrait_thumbnail);
        setPersonanInformation(res.data.data);
      }
    })();
  }, [navigation]);

  // 头像上传
  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file === undefined) return;
    const formData = new FormData();
    formData.append("file", file, file.name);
    request
      .post(UPLOADHEADPICTURE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(
        (value) => {
          console.log(value);
          if (value.data.code !== 200) throw new Error("图片上传失败");
          else {
            setPersonalPictureURL(value.data.data.path);
            return value.data.data.path;
          }
        },
        (reason) => {
          console.log(reason);
        }
      )
      .then(
        (path) => {
          request.post(MODIFYPERSONALPICTURE, {
            head_portrait: path,
          });
        },
        (reason) => {
          console.log(reason);
        }
      );
  };

  return (
    <Navbar fullscreen>
      <PersonalInformationContext.Provider value={personanInformation}>
        <div className="flex flex-col justify-center items-center ">
          {/* 基本信息板块 */}
          <div
            className="border rounded w-8/12 my-5"
            style={{ borderColor: "#dadce0" }}
          >
            <div
              className="border-gray-300 h-24 text-gray-900 text-xl font-serif font-semibold px-3 "
              style={{ lineHeight: "4rem" }}
            >
              基本信息
              <div className="text-xs font-sans font-medium">
                我们的用户可能会看到部分信息
              </div>
            </div>
            <div
              className="relative flex justify-between  border-b border-gray-300
             cursor-pointer hover:bg-gray-300 hover:bg-opacity-20 transition-all mx-3"
            >
              <input
                className="absolute top-0 left-0 border-0 outline-none opacity-0 w-full h-full"
                type="file"
                onChange={handlePictureUpload}
              ></input>
              <div
                className=" h-20 text-gray-500 font-serif font-semibold"
                style={{ lineHeight: "5rem" }}
              >
                照片
              </div>
              <div
                className="w-20 h-20 rounded-full bg-center m-3"
                style={{
                  backgroundImage: `URL(${fixImgUrlBug(personalPictureURL)})`,
                }}
              ></div>
            </div>
            <Item label="姓名"></Item>
            <Item label="生日"></Item>
            <Item label="性别"></Item>
          </div>

          {/* 联系信息 */}
          <div
            className=" border rounded w-8/12 my-5"
            style={{ borderColor: "#dadce0" }}
          >
            <div
              className=" border-gray-300 h-16 text-gray-900 text-xl font-serif font-semibold px-3"
              style={{ lineHeight: "4rem" }}
            >
              联系信息
            </div>
            <Item label="邮箱"></Item>
            <Item label="号码"></Item>
          </div>
        </div>
      </PersonalInformationContext.Provider>
    </Navbar>
  );
}
