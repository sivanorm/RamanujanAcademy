import CourseDemo from "../Demos/DemosComponent";
import myimg from "./../../assets/images/students_prev_ui.png";
import "./HomeComponent.css";
export default function HomeComponent() {
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
              <li>Individual care for development</li>
              <li>
                CBSE, ICSE, state syllabus with iit, neet & emcet coaching
              </li>
            </ul>
          </div>
          <div className="col-md-6 bg_img">
            <img src={myimg} />
          </div>
        </div>
      </div>
      <CourseDemo></CourseDemo>
    </>
  );
}
