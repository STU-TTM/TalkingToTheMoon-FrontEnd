import React from "react";
import styled, { keyframes } from "styled-components";

const animate = keyframes`
    0% {
      background-position: -500%;
    }
    100% {
      background-position: 500%;
    }
`;

const TTMTitle = styled.p`
  font-family: sans-serif;
  font-size: 46px;
  font-weight: 800;
  letter-spacing: 4px;
  background: linear-gradient(90deg, #000, #fff, #000);
  background-repeat: no-repeat;
  background-size: 80%;
  animation: ${animate} 4s linear infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: rgba(255, 255, 255, 0);
  overflow: hidden;
  user-select: none;
`;

export default function Index(props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        minHeight: "500px",
        backgroundColor: "black",
        borderRadius: "0",
      }}
    >
      <TTMTitle>Talking To The Moon</TTMTitle>
    </div>
  );
}
