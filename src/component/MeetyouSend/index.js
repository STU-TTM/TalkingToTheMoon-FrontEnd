import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import styled from "styled-components";
import request from "../../utils/request";
import { GETPERSONALINFORMATION } from "../../utils/pathMap";
const ScrollBarHidden = styled.textarea`
    ::-webkit-scrollbar {
        display: block;
        width: 0.5rem;
    }
    ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 0.5rem;
    }
`;
export default function Index() {
    const navigate = useNavigate();
    // 输入框内容
    const [content, setContent] = useState("");
    // 用户信息
    const [data, setData] = useState();
    const [file, setFile] = useState("");
    const [fileurl, setFileurl] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            const res = await request.post(GETPERSONALINFORMATION);
            console.log(res.data.data);
            if (res.data.code === 200) setData(res.data.data);
            else navigate("/loginAndRegist", { replace: true });
        };
        fetchData();
    }, [navigate]);

    function handleImageChange(e) {
        e.preventDefault();
        var reader = new FileReader();
        var file = e.target.files[0];
        if (e.target.files.length === 0) {
            console.log("无选择图片");
            return false;
        }
        // console.log(e);
        if (!/image\/\w+/.test(file.type)) {
            alert("请确保文件为图像类型");
            return false;
        }
        reader.onload = () => {
            setFile(file);
            setFileurl(reader.result);
        };
        reader.onabort = () => {
            console.log("上传取消");
        };
        reader.onerror = () => {
            console.log("上传出错");
        };
        reader.readAsDataURL(file);
    }

    return (
        <Navbar choice="Love">
            {/* 控制布局部分 */}
            <div className="w-full px-5 md:px-16 lg:px-24">
                {/* 主要内容部分 flex 布局 column */}
                <div className="bg-white w-full min-h-screen flex flex-col items-center py-2">
                    {/* 头像部分 */}
                    <div className="flex flex-col mt-10 mb-4">
                        {/* 头像 */}
                        <div
                            className="h-20 w-20 rounded-full border border-black bg-cover"
                            style={{
                                backgroundImage:
                                    data?.head_portrait_thumbnail === null
                                        ? "url(https://img0.baidu.com/it/u=597387104,4013674410&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500)"
                                        : data?.head_portrait_thumbnail,
                            }}
                        />
                        {/* 昵称 */}
                        <div className="font-mono text-center mt-1">
                            {data?.username}
                        </div>
                    </div>
                    {/* 填写内容部分 */}
                    <div className="flex w-full h-full flex-col md:flex-row items-center sm:items-center md:justify-center px-2 md:px-0">
                        {/* 图片选择 */}
                        <div
                            className={`w-full max-w-xs sm:max-w-md md:w-1/2 md:max-w-sm my-3 md:my-0 md:mx-5 rounded-md duration-300 ${
                                fileurl === ""
                                    ? "border border-black hover:shadow-lg"
                                    : ""
                            }`}
                        >
                            <div
                                className={`relative flex items-center justify-center ${
                                    fileurl === "" ? "h-60 md:h-96" : "h-full"
                                }`}
                            >
                                {/* input 选择文件 */}
                                <input
                                    type="file"
                                    className="absolute opacity-0 w-full h-full z-10"
                                    onChange={(e) => {
                                        handleImageChange(e);
                                    }}
                                />
                                {fileurl === "" ? (
                                    <div className="absolute select-none">
                                        暂未选择图片
                                    </div>
                                ) : (
                                    <img
                                        src={fileurl}
                                        alt=""
                                        className="w-full"
                                    />
                                )}
                            </div>
                        </div>
                        {/* 填写内容 */}
                        <div className="w-full max-h-full max-w-xs sm:max-w-md md:w-1/2 md:max-w-sm border border-black my-3 md:my-0 md:mx-5 rounded-md">
                            <ScrollBarHidden
                                className="w-full h-60 md:h-72 lg:h-96 overflow-y-auto resize-none outline-none p-1"
                                value={content}
                                onChange={(e) => {
                                    setContent(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    {/* 提交button */}
                    <div className="my-2 sm:my-3 md:my-5">
                        <div className="w-auto h-auto cursor-pointer px-2 rounded-md border border-black shadow-inner hover:shadow-md duration-300">
                            提交
                        </div>
                    </div>
                </div>
            </div>
        </Navbar>
    );
}
