import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";

export default function Index(props) {
  const id = useParams();
  useEffect(() => {
    console.log(id);
  });
  return <Navbar choice="Love"> </Navbar>;
}
