import { useEffect, useState } from "react";
import ApiResponse from "../../Services/Common/Result";
import { GetAllImages, Image } from "../../Services/Home/GalaryServices";
import AppButton from "../Buttons/ButtonComponent";
import GalarySkeleton from "../skeleton/GalarySkeleton";
import "./GalleryComponent.css";

interface ImageCardProps {
  image: Image;
}

export default function GalleryComponent() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ApiResponse<Image[]>>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!data) {
          const result = await GetAllImages();
          setData(result);
          setLoading(false);
          console.log(result);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="demos_div">
      <div className="text-center mb-5">
        <h1>Ramanujan Academy Gallery</h1>
      </div>
      <div className="container">
        <div className="row">
          {loading
            ? [1, 2, 3, 4, 5, 6, 7, 8].map((sk) => (
                <div className="col-md-3" key={sk}>
                  <GalarySkeleton />
                </div>
              ))
            : data?.responseData.map((card: Image) => (
                <ImageCard key={card.id} image={card} />
              ))}
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="demo-btn col-md-4 offset-4 d-flex justify-content-evenly text-center mt-5">
            <AppButton name="<< Previous" />
            <AppButton name="Next >>" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ImageCard({ image }: ImageCardProps) {
  return (
    <div className="col-md-3 p-2" key={image.docId}>
      <div className="gallery">
        <div className="gallery_imgs">
          <img src={image.img_url} alt={image.img_name} />
        </div>
        <p className="gallery_title">{image.img_name}</p>
      </div>
    </div>
  );
}
