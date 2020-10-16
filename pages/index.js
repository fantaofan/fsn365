import React from "react";
import Nav from "./nav/home";
import "./styles.less";
import Home from "./home/home";
import HomeList from "./home/home-list";
import HomelsitContenr from "./home/homelsit-contenr";
import Bottom from "./bottom";

const index = () => {
  return (
    <div>
      <div className="home-contiar">
        <Nav></Nav>
        <Home></Home>
        <HomeList></HomeList>
        <HomelsitContenr></HomelsitContenr>
      </div>
      <Bottom></Bottom>
    </div>
  );
};

export default index;
