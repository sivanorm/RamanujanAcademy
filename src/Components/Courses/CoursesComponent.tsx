import Button from "../Buttons/ButtonComponent";
import "./CoursesComponent.css";

function Courses() {
  return (
    <div className="courses_div">
      <div className="text-center mb-5">
        <h1>Our Courses</h1>
      </div>
      <MyCourses></MyCourses>
      <div className="all-courses-btn">
        <Button name="See All Courses"></Button>
      </div>
    </div>
  );
}
function MyCourses() {
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
  const courseList = mycources.map((pro) => (
    <div className="col-md-3 p-2" key={pro.crsid}>
      <div className="my-cources-list">{pro.crsname}</div>
    </div>
  ));
  return courseList;
}
export default Courses;
