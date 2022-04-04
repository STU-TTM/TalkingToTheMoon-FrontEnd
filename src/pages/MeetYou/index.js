import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar";
import request from "../../utils/request";
import { LOGIN, GETPOSTLISTBYPAGE, GETPOSTDETAIL } from "../../utils/pathMap";
import { useNavigate } from "react-router-dom";
// import { CSSTransition, SwitchTransition } from "react-transition-group";
import MeetyouCard from "../../component/MeetyouCard";
// import MeetyouDetail from "../../component/MeetyouDetail";

export default function Index(props) {
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
            // console.log(res.data.data);
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
            // console.log("!!!!!!!!!!!");
            // console.log(res.data.data);
            // console.log("!!!!!!!!!!!");
            setPostDetail(res.data.data);
        };
        fetchData();
    }, [detailId]);

    return (
        <Navbar choice="Love">
            <div className="w-full h-full flex flex-col items-center">
                <div className="w-full h-full flex justify-center items-center my-5 mx-5 flex-wrap">
                    {list?.map((item) => {
                        return <MeetyouCard item={item}></MeetyouCard>;
                    })}
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
                </div>
                {/* <div className="flex w-full h-11 flex-row bg-gray-100 items-center justify-center mb-10">
                    <div className="w-5 h-5 border border-black mx-2 rounded-sm flex justify-center items-center cursor-pointer">
                        1
                    </div>
                    <div className="w-5 h-5 border border-black mx-2 rounded-sm flex justify-center items-center cursor-pointer">
                        2
                    </div>
                    <div className="w-5 h-5 border border-black mx-2 rounded-sm flex justify-center items-center cursor-pointer">
                        3
                    </div>
                    <div className="w-5 h-5 border border-black mx-2 rounded-sm flex justify-center items-center cursor-pointer">
                        4
                    </div>
                    <div className="w-5 h-5 border border-black mx-2 rounded-sm flex justify-center items-center cursor-pointer">
                        5
                    </div>
                </div> */}
            </div>
        </Navbar>
    );
}
