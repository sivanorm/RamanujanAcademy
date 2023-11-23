import "./../App.css";
import $ from "jquery";
import myimg from "./../assets/images/students_prev_ui.png";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

const myNavItems = [
  { name: "Home", id: "hm" },
  { name: "Gallery", id: "gl" },
  { name: "Courses", id: "crs" },
  { name: "About", id: "abt" },
  { name: "Contact", id: "cnt" },
];

const mycources = [
  { crsname: "Course 1", crsid: "hm" },
  { crsname: "Course 2", crsid: "gl" },
  { crsname: "Course 3", crsid: "crs" },
  { crsname: "Course 4", crsid: "abt" },
  { crsname: "Course 5", crsid: "cnt" },
  { crsname: "Course 6", crsid: "crs1" },
  { crsname: "Course 7", crsid: "abt1" },
  { crsname: "Course 8", crsid: "cnt1" },
];

const demos = [
  { demoname: "Demo 1", demoid: "hm" },
  { demoname: "Demo 2", demoid: "gl" },
  { demoname: "Demo 3", demoid: "crs2" },
  { demoname: "Demo 4", demoid: "abt2" },
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MyHeader></MyHeader>
        <MyNavigation />
      </header>
      <div className="container-fluid">
        <div className="bg_img_div row">
          <div className="col-md-6"></div>
          <div className="col-md-6 bg_img">
            <BgImg />
          </div>
        </div>
      </div>
      <div className="courses_div">
        <div className="text-center">
          <h1>Our Courses</h1>
        </div>
        <MyCourses></MyCourses>

        <div className="all-courses-btn">
          <MyButton name="See All Courses"></MyButton>
        </div>
      </div>

      <div className="demos_div">
        <div className="text-center">
          <h1>Our Demo's</h1>
        </div>
        <Demos></Demos>
      </div>
    </div>
  );
}

function MyNavigation() {
  const listItems = myNavItems.map((product) => (
    <li key={product.id} id={product.id}>
      {product.name}
    </li>
  ));

  return (
    <div className="nav_div">
      <ul className="jb_nav">{listItems}</ul>
    </div>
  );
}

function MyCourses() {
  const listItems1 = mycources.map((pro) => (
    <div className="col-md-3 p-2" key={pro.crsid}>
      <div className="my-cources-list">{pro.crsname}</div>
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

export default App;
