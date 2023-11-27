import { Avatar, Rating, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { HomeServices } from "../../Services/Home/HomeServices";
import AppButton from "../Buttons/ButtonComponent";
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
          ? [1, 2, 3, 4, 5, 6, 7, 8]?.map((sk) => (
              <div className="col-md-3" key={sk}>
                <CourseSkeliton></CourseSkeliton>
              </div>
            ))
          : data?.map((pro: any) => (
              <div className="col-md-3 p-2" key={pro?.id}>
                <div className="my-courses-list container-fluid">
                  <div className="thumbnail_div"></div>
                  <div className="title_div">
                    <div className="avatar_div">
                      <Avatar sx={{ backgroundColor: "#ff4500" }}>K</Avatar>
                    </div>
                    <div className="rating_div">
                      <p className="course_title">{pro?.title}</p>
                      <Rating name="hover-feedback" />
                    </div>
                  </div>
                </div>
                {/* <img src={pro?.posterURL} /> */}
              </div>
            ))}
      </div>
    </div>
  );
}

function CourseSkeliton() {
  return (
    <div className="p-2">
      <Skeleton
        variant="rectangular"
        height={118}
        className="custom_skeleton"
        animation="wave"
      />
      <div className="row my-2">
        <div className="col-md-4 mb-2 pr-0 d-flex align-items-center justify-content-center">
          <Skeleton
            variant="circular"
            width={60}
            height={40}
            className="custom_skeleton"
            animation="wave"
          />
        </div>
        <div className="col-md-8 pr-0">
          <Skeleton
            variant="rectangular"
            height={15}
            className="custom_skeleton"
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            width={"80%"}
            height={15}
            className="mt-2 custom_skeleton"
            animation="wave"
          />
        </div>
      </div>
    </div>
  );
}
