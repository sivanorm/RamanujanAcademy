import { Avatar, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeServices } from "../../Services/Home/HomeServices";
import AppButton from "../Buttons/ButtonComponent";
import CourseSkeliton from "../skeleton/CourseSkeleton";
import "./CoursesComponent.css";
export default function CoursesComponent() {
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

function Courses() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const skeletonArray = Array.from({ length: 100 }, (_, index) => index + 1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await HomeServices.GetCourses();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row my-courses">
        {loading
          ? skeletonArray?.map((sk) => (
              <div className="col-md-3" key={sk}>
                <CourseSkeliton />
              </div>
            ))
          : data?.map((props: any) => <CourseCard props={props}></CourseCard>)}
      </div>
    </div>
  );
}

function CourseCard(props: any) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/course");
  };
  return (
    <div className="col-md-3 p-2" key={props?.id} onClick={handleClick}>
      <div className="my-courses-list container-fluid">
        <div className="thumbnail_div">
          <img src={props?.posterURL} alt="" />
        </div>
        <div className="title_div">
          <div className="avatar_div">
            <Avatar sx={{ backgroundColor: "#ff4500" }}>K</Avatar>
          </div>
          <div className="rating_div">
            <p className="course_title">{props?.title}</p>
            <Rating name="hover-feedback" />
          </div>
        </div>
      </div>
    </div>
  );
}
