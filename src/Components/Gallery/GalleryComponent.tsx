import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FireBaseAuthContext } from "../../Authentications/firebase/Context/firebase-auth-context";
import { ImageDTO } from "../../DTOs/Home/ImageDTO";
import {
  DeleteGalleryImage,
  GetAllImages,
} from "../../Services/Home/GalaryServices";
import AppButton from "../Buttons/ButtonComponent";
import GalarySkeleton from "../skeleton/GalarySkeleton";
import "./GalleryComponent.css";
export default function GalleryComponent() {
  const { appUserConfig } = useContext(FireBaseAuthContext);
  const [imageGalary, setImageGalary] = useState<ImageDTO[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetAllImages(appUserConfig.userId, new Date());
        debugger;
        setImageGalary(result.responseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const handleDelete = (imageId: string): void => {
    if (confirm("Are you sure you want to delete this image?")) {
      DeleteGalleryImage(appUserConfig.userId, imageId).then((res) => {
        if (res.responseType == "SUCCESS") {
          setImageGalary((prevImages) =>
            prevImages.filter((image) => image.docId !== imageId)
          );
        } else alert(res.responseDescription);
      });
    }
  };

  return (
    <div className="demos_div">
      <div className="text-center mb-5">
        <h1>Ramanujan Academy Gallery</h1>
      </div>
      <div className="container">
        <div className="row">
          {imageGalary.map((image: ImageDTO) => (
            <ImageCard
              key={image.docId}
              image={image}
              onDelete={handleDelete}
            />
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

function ImageCard({
  image,
  onDelete,
}: {
  image: ImageDTO;
  onDelete: (imgId: string) => void;
}) {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img1 = new Image();
    img1.src = image.img_url;
    img1.onload = () => {
      setLoaded(true);
    };
  }, [image.img_url]);
  return (
    <div className="col-md-3 p-2">
      {loaded ? (
        <div className="gallery">
          <div className="gallery_imgs">
            <span
              onClick={() => {
                onDelete(image.docId);
              }}
            >
              delete
            </span>
            <img
              src={loaded ? image.img_url : ""}
              alt={image.alt}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              loading="lazy"
            />
          </div>
          <p className="gallery_title">{image.img_name}</p>
          <h5
            onClick={() => {
              navigate("/imageupload", { state: { image } });
            }}
          >
            Edit
          </h5>
        </div>
      ) : (
        <GalarySkeleton />
      )}
    </div>
  );
}
