import { useContext, useState } from "react";
import { FireBaseAuthContext } from "../../Authentications/firebase/Context/firebase-auth-context";
import {
  SaveImageToUserGallery,
  UpdateGalleryImage,
} from "../../Services/Home/GalaryServices";
import { ImageDTO } from "../../DTOs/Home/ImageDTO";
import { useLocation } from "react-router-dom";

function ImageUpload() {
  const { state } = useLocation();
  const { appUserConfig } = useContext(FireBaseAuthContext);
  const [image, setImage] = useState<ImageDTO>(
    state ? state.image : ({} as ImageDTO)
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        debugger;
        setImage((prevImage) => ({
          ...prevImage,
          img_url: base64String,
          base64Str: base64String,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (state) {
      UpdateGalleryImage(appUserConfig.userId, image).then((result) => {
        alert(result.responseType);
        console.log(result);
      });
    } else {
      SaveImageToUserGallery(appUserConfig.userId, image).then((result) => {
        alert(result.responseType);
        console.log(result);
      });
    }
  };

  return (
    <div>
      <h1 className="text-center">Image Upload</h1>
      <img src={image.base64Str} alt={image.alt} />
      <br />
      <br />
      <label>Image Name</label>
      <input
        type="text"
        value={image.img_name}
        onChange={(e) => setImage({ ...image, img_name: e.target.value })}
      />
      <br />
      <br />
      <br />
      <label>Alternate text</label>
      <input
        type="text"
        value={image.alt}
        onChange={(e) => setImage({ ...image, alt: e.target.value })}
      />
      <br />
      <br />
      <br />
      <input type="file" name="image" onChange={handleImageChange} />
      <br />
      <br />
      <br />
      <button onClick={handleSubmit}>{!state ? "Submit" : "Update"}</button>
    </div>
  );
}

export default ImageUpload;
