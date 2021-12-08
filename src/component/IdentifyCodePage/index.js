import { render } from "@testing-library/react";
import React, { useState } from "react";
import styled from "styled-components";

const VerificationInputer = styled.input``;

export default class Index extends React.Component {
  state = {
    userPhone: 13412681835,
    whichInputOnFocus: 1,
    number: "",
  };

  constructor(props) {
    super();
    this.firstInput = React.createRef();
  }

  componentDidMount() {
    console.log("component did mount");
    this.firstInput.current.focus();
  }

  render() {
    const { userPhone, whichInputOnFocus, number } = this.state;
    return (
      <div
        className="absolute top-0 left-0 z-50 flex flex-col justify-center 
    items-center w-screen h-screen backdrop-filter backdrop-blur bg-gray-900 bg-opacity-70"
      >
        <div
          className="w-2/5 h-2/4 bg-white rounded flex flex-col justify-around items-center"
          onClick={() => this.firstInput.current.focus()}
        >
          {/* 关闭图标 */}
          <div className="w-full px-6">
            <svg
              t="1638965155808"
              className="float-right cursor-pointer"
              onClick={this.props.close}
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2321"
              width="32"
              height="32"
            >
              <path
                d="M512 456.310154L94.247385 38.557538a39.542154 39.542154 0 0 0-55.689847 0 39.266462 39.266462 0 0 0 0 55.689847L456.310154 512 38.557538 929.752615a39.542154 39.542154 0 0 0 0 55.689847 39.266462 39.266462 0 0 0 55.689847 0L512 567.689846l417.752615 417.752616c15.163077 15.163077 40.290462 15.36 55.689847 0a39.266462 39.266462 0 0 0 0-55.689847L567.689846 512 985.442462 94.247385a39.542154 39.542154 0 0 0 0-55.689847 39.266462 39.266462 0 0 0-55.689847 0L512 456.310154z"
                p-id="2322"
              ></path>
            </svg>
          </div>

          <div className="text-xl -mt-5">
            验证码已发往{" "}
            <code className="bg-gray-100 p-1 rounded">{userPhone}</code>
            ，请输入验证码：
          </div>
          <div className="flex justify-center items-center">
            <input
              type="text"
              className="outline-none text-transparent absolute -top-11"
              ref={this.firstInput}
              value={number}
              onChange={(e) => {
                if (isNaN(e.target.value) === false)
                  if (e.target.value.length <= 4) {
                    this.setState({ number: e.target.value });
                    this.setState({ whichInputOnFocus: e.target.value.length });
                  }
              }}
            />
            <div
              className={`w-10 h-16 border-b border-gray-300  mx-6 outline-none text-center transition-all  focus:border-gray-400 ${
                whichInputOnFocus === 1 && "border-gray-600"
              } `}
              style={{
                lineHeight: "4rem",
                fontSize: "3rem",
                caretColor: "transparent",
              }}
            >
              {number >= 1 && number.toString()[0]}
            </div>
            <div
              className={`w-10 h-16 border-b border-gray-300  mx-6 outline-none text-center transition-all  focus:border-gray-400 ${
                whichInputOnFocus === 2 && "border-gray-600"
              } `}
              style={{
                lineHeight: "4rem",
                fontSize: "3rem",
                caretColor: "transparent",
              }}
            >
              {number >= 10 && number.toString()[1]}
            </div>
            <div
              className={`w-10 h-16 border-b border-gray-300 mx-6 outline-none text-center transition-all  ${
                whichInputOnFocus === 3 && "border-gray-600"
              } `}
              style={{
                lineHeight: "4rem",
                fontSize: "3rem",
                caretColor: "transparent",
              }}
            >
              {number >= 100 && number.toString()[2]}
            </div>
            <div
              className={`w-10 h-16 border-b border-gray-300  mx-6 outline-none text-center transition-all  focus:border-gray-400 ${
                whichInputOnFocus === 4 && "border-gray-600"
              } `}
              style={{
                lineHeight: "4rem",
                fontSize: "3rem",
                caretColor: "transparent",
              }}
            >
              {number >= 1000 && number.toString()[3]}
            </div>
          </div>
          <div className=""></div>
        </div>
      </div>
    );
  }
}
