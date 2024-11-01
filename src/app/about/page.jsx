"use client";
import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
//import Drawer from "../components/drawer";
//import { useSelector } from 'react-redux';

export default function About() {
  //const [open, setOpen] = React.useState(true);
  //   const toggle = useSelector((state) => state.toggle)
  const [loading, setLoading] = useState(true);
  //console.log("dd", open)
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <h1>Page Content Loaded</h1>
      )}
      <h1>About Page</h1>
      {/* <h1>User Name: {toggle}</h1> */}
      <p>
        This is the about page of the application. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
        facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus
        in hendrerit gravida rutrum quisque non tellus.
      </p>
    </div>
  );
}
