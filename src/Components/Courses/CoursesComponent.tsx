import { useState, useEffect } from "react";
import { HomeServices } from "../../Services/HomeServices";
import "./../Home/HomeComponent.css";

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
    </div>
  ));

  return (
    <div className="container">
      <div className="row my-courses">{coursesCards}</div>
    </div>
  );
}

export default Courses;
