import $ from "jquery";
import "./HomeComponent.css";
import { HomeServices } from "../../Services/HomeServices";

import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import myimg from "./../../assets/images/students_prev_ui.png";
import { Observable } from "rxjs";

const myNavItems = HomeServices.GetNavTabs();
const mycources = HomeServices.GetCourses();
const demos = HomeServices.GetDemos();

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
  } else if (activeNav == "crs") {
    content = (
      <>
        <Courses></Courses>
      </>
    );
  }
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
function Courses() {
  return (
    <div className="courses_div">
      <div className="text-center mb-5">
        <h1>Our Courses</h1>
      </div>
      <MyCourses></MyCourses>
      <div className="all-courses-btn">
        <MyButton name="See All Courses"></MyButton>
      </div>
    </div>
  );
}

function CourseDemo() {
  return (
    <div className="demos_div">
      <div className="text-center mb-5">
        <h1>Our Demo's</h1>
      </div>
      <Demos></Demos>
      <div className="container-fluid">
        <div className="row">
          <div className="demo-btn col-md-4 offset-4 d-flex justify-content-evenly text-center mt-5">
            <MyButton name="Go for Offline"></MyButton>
            <MyButton name="Go for Online"></MyButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function MyCourses() {
  const [data, setData] = useState("");
  const getData = async () => {
    const resp = await fetch("https://api.sampleapis.com/movies/animation");
    const json = await resp.json();
    setData(json);
  };

  useEffect(() => {
    getData();
  }, []);
  debugger;
  console.log(data);
  const listItems1 = HomeServices.GetCourses().map((pro) => (
    <div className="col-md-3 p-2" key={pro?.crsid}>
      <div className="my-cources-list">{pro?.crsname}</div>
    </div>
  ));
  return (
    <div className="container">
      <div className="row my-cources">{listItems1}</div>
    </div>
  );
}

function Demos() {
  const demolist = demos.map((d) => (
    <div className="col-md-3 p-2" key={d.demoid}>
      <div className="my-demo-list">{d.demoname}</div>
    </div>
  ));

  return (
    <div className="container">
      <div className="row">{demolist}</div>
    </div>
  );
}

function MyHeader() {
  return (
    <div className="main_title">
      <h1 className="my-title">Ramanujan Academy</h1>
    </div>
  );
}

function MyButton(props: {
  name:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | null
    | undefined;
}) {
  return <button onClick={SeeAllCoursesClick}>{props.name}</button>;
}

function SeeAllCoursesClick(this: any) {
  $(this).closest(".App .nav_div").find("li");
}

function BgImg() {
  return <img src={myimg} />;
}
