import { useEffect, useState } from "react";
import { HomeServices } from "../../Services/Home/HomeServices";
import AppButton from "../Buttons/ButtonComponent";

function Demos() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await HomeServices.GetDemos();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const demolist = data?.map((d: any) => (
    <div className="col-md-3 p-2" key={d?.id}>
      <div className="my-demo-list">{d?.title}</div>
    </div>
  ));

  return (
    <div className="container">
      <div className="row">{demolist}</div>
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
            <AppButton name="Go for Offline"></AppButton>
            <AppButton name="Go for Online"></AppButton>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CourseDemo;
