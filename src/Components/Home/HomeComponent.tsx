import { useState } from "react";
import { HomeServices } from "../../Services/HomeServices";
import CourseDemo from "../Demos/DemosComponent";
import myimg from "./../../assets/images/students_prev_ui.png";
import CoursesComponent from "./../Courses/CoursesComponent";
import "./HomeComponent.css";

const myNavItems = HomeServices.GetNavTabs();

export default function HomeComponent() {
  return <Default></Default>;
}

function Default() {
  const [activeNav, setActiveNav] = useState("hm");
  const listItems = myNavItems.map((product) => (
    <li
      key={product.id}
      id={product.id}
      className={activeNav == product.id ? "menu_nav_active" : "menu_nav"}
      onClick={() => {
        setActiveNav(product.id);
      }}
    >
      {product.name}
    </li>
  ));
  var content = <></>;

  if (activeNav == "hm") {
    content = (
      <>
        <Home></Home>
        <CourseDemo></CourseDemo>
      </>
    );
  } else if (activeNav == "crs")
    content = <CoursesComponent></CoursesComponent>;
  return (
    <div className="App">
      <header className="App-header">
        <MyHeader></MyHeader>
        <div className="nav_div">
          <ul className="jb_nav">{listItems}</ul>
        </div>
      </header>
      {content}
    </div>
  );
}

function Home() {
  return (
    <>
      <div className="container-fluid">
        <div className="bg_img_div row">
          <div className="col-md-6 pt-5 pl-5">
            <h1>Coaching Classes for</h1>
            <h2>SSC, INTERMEDIATE</h2>
            <ul className="facilities_list">
              <li>Digital classes</li>
              <li>Online & Offline Training</li>
              <li>Regular exams</li>
              <li>Regular Practices</li>
              <li>Individual care for development</li>
              <li>
                CBSE, ICSE, state syllabus with iit, neet & emcet coaching
              </li>
            </ul>
          </div>
          <div className="col-md-6 bg_img">
            <BgImg />
          </div>
        </div>
      </div>
    </>
  );
}
function MyHeader() {
  return (
    <div className="main_title">
      <h1 className="my-title">Ramanujan Academy</h1>
    </div>
  );
}

function BgImg() {
  return <img src={myimg} />;
}
