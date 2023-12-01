import { useEffect, useState } from "react";
import { HomeServices } from "../../Services/Home/HomeServices";
import AppButton from "../Buttons/ButtonComponent";
import './GalleryComponent.css'

function Gallery() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await HomeServices.GetGallery();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const demolist = data?.map((d: any) => (
    <div className="col-md-3 p-2" key={d?.id}>
      <div className="gallery">
        <div className="gallery_imgs">
          <img src={d?.posterURL} alt="title" />
        </div>
        <p className="gallery_title">{d?.title}</p>
      </div>
    </div>
  ));

  return (
    <div className="container">
      <div className="row">{demolist}</div>
    </div>
  );
}

function GalleryComponent() {
  return (
    <div className="demos_div">
      <div className="text-center mb-5">
        <h1>Ramanujan Academy</h1>
      </div>
      <Gallery></Gallery>
      <div className="container-fluid">
        <div className="row">
          <div className="demo-btn col-md-4 offset-4 d-flex justify-content-evenly text-center mt-5">
            <AppButton name="<< Previous"></AppButton>
            <AppButton name="Next >>"></AppButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GalleryComponent;
