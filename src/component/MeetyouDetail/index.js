import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import styled from "styled-components";
import request from "../../utils/request";
import { GETPOSTDETAIL } from "../../utils/pathMap";
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
    const [comment, setComment] = useState("");
    const [commentToName, setCommentToName] = useState("who");
    const [commentToId, setCommentToId] = useState();
    const [data, setData] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const res = await request.post(GETPOSTDETAIL, {
                postid: params.id,
                current: 1,
                limit: 10,
            });
            if (res.data.code === 200) setData(res.data.data);
            else navigate("/loginAndRegist", { replace: true });
        };
        fetchData();
    }, [navigate]);
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
                                    : data?.author.head_portrait_thumbnail,
                        }}
                    ></div>
                    {/* 昵称 */}
                    <div className="">{data?.post.anonymity}</div>
                </div>
                {/* 表白墙该id内容部分 */}
                <div className="w-full h-full">
                    <div className="w-auto h-auto flex flex-col lg:flex-row justify-center items-center p-3 md:py-10 lg:py-16 rounded-2xl bg-white shadow-md hover:shadow-2xl duration-500">
                        {/* 帖子照片 */}
                        <div className="sm:max-w-md md:max-w-xl lg:max-w-none lg:w-1/2 h-full py-3 md:py-5 lg:px-10 lg:py-0">
                            <img
                                src={`${fixBug(data?.post.picture)}`}
                                alt="帖子照片"
                            />
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
                    <div className="w-full h-auto mb-5 flex flex-col sm:flex-row rounded-md shadow-md p-1 bg-white">
                        <div className="flex flex-row sm:flex-col mr-1">
                            <div className="w-24">REPLY TO :</div>
                            <div className="w-24 sm:overflow-x-hidden">
                                {commentToName}
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
                        <div className="p-1 flex flex-col items-center sm:justify-end">
                            <div className="w-12 px-1 h-auto flex justify-center items-center border border-black rounded-md shadow-inner cursor-pointer hover:shadow-md bg-white">
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
                                    className="w-full h-auto mb-3 p-1 rounded-md shadow-md flex flex-row"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCommentToName(item.author.username);
                                        setCommentToId(item.author.uid);
                                        setComment("");
                                    }}
                                >
                                    {/* 评论头像 */}
                                    <div className="mr-2">
                                        <div
                                            className="w-14 h-14 rounded-full bg-cover"
                                            style={{
                                                backgroundImage:
                                                    item?.author
                                                        .head_portrait_thumbnail ===
                                                    null
                                                        ? "url(https://img0.baidu.com/it/u=597387104,4013674410&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500)"
                                                        : item?.author
                                                              .head_portrait_thumbnail,
                                            }}
                                        ></div>
                                    </div>
                                    {/* 评论主要内容 */}
                                    <div className="w-full flex flex-col">
                                        {/* 评论来源及对象 */}
                                        <div className="">
                                            {item.author.username}
                                        </div>
                                        {/* 评论内容 */}
                                        <div className="">
                                            {item.comment.content}
                                        </div>
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
                                                        className="w-full flex flex-row mb-2 shadow-sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setCommentToName(
                                                                double.user
                                                                    .username
                                                            );
                                                            setCommentToId(
                                                                double.user.uid
                                                            );
                                                            setComment("");
                                                        }}
                                                    >
                                                        {/* 头像 */}
                                                        <div className="mr-2">
                                                            <div
                                                                className="w-8 h-8 rounded-full bg-cover"
                                                                style={{
                                                                    backgroundImage:
                                                                        double
                                                                            ?.user
                                                                            .head_portrait_thumbnail ===
                                                                        null
                                                                            ? "url(https://img0.baidu.com/it/u=597387104,4013674410&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500)"
                                                                            : double
                                                                                  ?.user
                                                                                  .head_portrait_thumbnail,
                                                                }}
                                                            ></div>
                                                        </div>
                                                        {/* 主要内容 */}
                                                        <div className="w-full">
                                                            {/* 评论来源及对象 */}
                                                            <div className="">
                                                                {
                                                                    double?.user
                                                                        .username
                                                                }
                                                            </div>
                                                            {/* 评论内容 */}
                                                            <div className="">
                                                                {
                                                                    double.reply
                                                                        .content
                                                                }
                                                            </div>
                                                            {/* 评论时间 */}
                                                            <div className="w-full text-right text-xs text-gray-400 mt-1">
                                                                {
                                                                    double.reply
                                                                        .create_time
                                                                }
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
