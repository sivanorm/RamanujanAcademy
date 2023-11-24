import { useState, useEffect } from "react";
import { HomeServices } from "../../Services/HomeServices";
import AppButton from "../Buttons/ButtonComponent";

function Courses() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await HomeServices.GetCourses();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const coursesCards = data?.map((pro: any) => (
    <div className="col-md-3 p-2" key={pro?.id}>
      <div className="my-courses-list">{pro?.title}</div>
      {/* <img src={pro?.posterURL} /> */}
    </div>
  ));

  return (
    <div className="container">
      <div className="row my-courses">{coursesCards}</div>
    </div>
  );
}

function CoursesComponent() {
  return (
    <div className="courses_div">
      <div className="text-center mb-5">
        <h1>Our Courses</h1>
      </div>
      <Courses></Courses>
      <div className="all-courses-btn">
        <AppButton name="See All Courses"></AppButton>
      </div>
    </div>
  );
}
export default CoursesComponent;
