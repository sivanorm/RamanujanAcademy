import { useEffect, useState } from "react";
import { HomeServices } from "../../Services/Home/HomeServices";
import AppButton from "../Buttons/ButtonComponent";
import { Images } from "../../Services/FireServices/FireServices";
import ApiResponse from "../../Services/Common/Result";

function Gallery() {
  const [data, setData] = useState<ApiResponse<Images[]>>();
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
  const demolist = data?.responseData?.map((d: any) => (
    <div className="col-md-3 p-2" key={d?.id}>
      <div>{d?.img_name}</div>
      <img
        src={d?.img_url}
        alt="title"
        style={{ width: "100px", height: "100px" }}
      />
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
